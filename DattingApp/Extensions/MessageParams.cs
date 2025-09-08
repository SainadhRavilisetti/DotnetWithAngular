using System;
using DattingApp.Helpers;

namespace DattingApp.Extensions;

public class MessageParams : PaginationParams
{
    public string? MemberId { get; set; }
    public string Container { get; set; } = "Inbox";    
}
