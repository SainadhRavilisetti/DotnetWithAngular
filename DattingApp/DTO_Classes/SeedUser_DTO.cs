using System;

namespace DattingApp.DTO_Classes;

public class SeedUser_DTO
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public required string Name { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public Profile User { get; set; } = null!;
    public string? ImgUrl{ get; set; }
}
