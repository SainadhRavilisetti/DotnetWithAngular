using System;

namespace DattingApp.Entites;

public class MemberLike
{
    public required string SourceMemberId { get; set; }
    public Profie_members SourceMember { get; set; } = null!;
    public required string TargetMemberId { get; set; }
    public Profie_members TargetMember { get; set; } = null!;
}
