using System;

namespace DattingApp;

public class Profile
{
    public string Id { get; set; }=Guid.NewGuid().ToString();
    public string? Name { get; set; }
    public string? Email { get; set; }

    public required byte[] Password { get; set; }
    public required byte[] Passwordsalt { get; set; }
}
