using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DattingApp.Entites;

public class Profie_members
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateOnly DateOfBirth { get; set; }
    public required string Name { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public string? ImgUrl { get; set; }
    public Profile User { get; set; } = null!;
    [JsonIgnore]
    public List<Photo> Photos { get; set; } = [];

}
