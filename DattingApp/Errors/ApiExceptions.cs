using System;
using System.Runtime.CompilerServices;

namespace DattingApp.Errors;

public class ApiExceptions(int  statusCode,string  message ,string? details)
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
