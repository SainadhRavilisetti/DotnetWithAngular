using System;

namespace DattingApp.Helpers;

public class MemberParams : PaginationParams
{
    public string? Gender { get; set; }
    public string? CurrentMemberId { get; set; }
    public int MinAge { get; set; } = 18;
    public int MaxAge { get; set; } = 100;
    public string OrderBy { get; set; } = "lastActive";
}
