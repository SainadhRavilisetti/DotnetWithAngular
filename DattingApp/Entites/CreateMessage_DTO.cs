using System;

namespace DattingApp.Entites;

public class CreateMessage_DTO
{
    public required string RecipientId { get; set; }
    public required string Content { get; set; }
    
}
