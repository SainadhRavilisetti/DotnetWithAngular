using System;

namespace DattingApp.DTO_Classes;

public class User_DTO
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public required string Name { get; set; }
    public string? imgUrl{ get; set; }
    public required string token{ get; set; }
}
