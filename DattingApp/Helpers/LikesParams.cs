using System;

namespace DattingApp.Helpers;

public class LikesParams : PaginationParams
{
    public string MemberId { get; set; } = "";
    public string Predicate { get; set; } = "liked";
}
