using System;
using SQLitePCL;

namespace DattingApp.Entites;

public class Message
{
    public string  Id { get; set; } = Guid.NewGuid().ToString();
    public required string Content { get; set; }
    public DateTime? DateRead { get; set; }
    public DateTime MessageSent { get; set; } = DateTime.UtcNow;
    public bool SenderDeleted { get; set; }
    public bool RecipientDeleted { get; set; }
    public required string SenderId { get; set; }
    public Profie_members Sender { get; set; } = null!;
    public required string RecipientId { get; set; }
    public Profie_members Recipient { get; set; } = null!;
    
}
