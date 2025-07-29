using System;
using DattingApp.Entites;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.Data;

public class ProfileDB(DbContextOptions options) : DbContext(options)
{
    public DbSet<Profile> profiles { get; set; }
    public DbSet<Profie_members> profie_Members { get; set; }
    
    public DbSet<Photo> photos{ get; set; }
}
