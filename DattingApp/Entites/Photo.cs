using System;
using System.Text.Json.Serialization;

namespace DattingApp.Entites;

public class Photo
{
    public int id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }
    public string? ProfileId { get; set; }
    [JsonIgnore]
    public Profie_members Member { get; set; } = null!;
    public string MemberId { get; set; } = null!;
}
