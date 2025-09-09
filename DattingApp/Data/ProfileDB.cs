using System;
using DattingApp.Entites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DattingApp.Data;

public class ProfileDB(DbContextOptions options) : DbContext(options)
{
    public DbSet<Profile> profiles { get; set; }
    public DbSet<Profie_members> profie_Members { get; set; }

    public DbSet<Photo> photos { get; set; }
    public DbSet<MemberLike> Likes { get; set; }

    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Message>()
        .HasOne(x => x.Recipient)
        .WithMany(m => m.MessagesReceived)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Message>()
        .HasOne(x => x.Sender)
        .WithMany(m => m.MessagesSent)
        .OnDelete(DeleteBehavior.Cascade);


        modelBuilder.Entity<MemberLike>()
        .HasKey(x => new { x.SourceMemberId, x.TargetMemberId });

        modelBuilder.Entity<MemberLike>()
        .HasOne(s => s.SourceMember)
        .WithMany(t => t.LikedMembers)
        .HasForeignKey(s => s.SourceMemberId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MemberLike>()
       .HasOne(s => s.TargetMember)
       .WithMany(t => t.LikedByMembers)
       .HasForeignKey(s => s.TargetMemberId)
       .OnDelete(DeleteBehavior.NoAction);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>
        (
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );
        var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>
        (
            v => v.HasValue?v.Value.ToUniversalTime():null,
            v => v.HasValue?DateTime.SpecifyKind(v.Value,DateTimeKind.Utc):null
        );
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
                else if (property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(nullableDateTimeConverter);
                }
            }
        }
    }
}
