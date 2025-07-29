using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using DattingApp.Entites;

namespace DattingApp;

public class Profile
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string? ImgUrl { get; set; }
    public required byte[] Password { get; set; }
    public required byte[] Passwordsalt { get; set; }
    [JsonIgnore]
    public List<Photo> photos { get; set; } = [];
    [JsonIgnore]
    [ForeignKey(nameof(Id))]
    public Profie_members profie_Members { get; set; } = null!; 
}
