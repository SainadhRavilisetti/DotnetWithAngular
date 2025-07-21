using System;
using System.ComponentModel.DataAnnotations;

namespace DattingApp.DTO_Classes;

public class Profile_DTO
{
    [Required]
    public string Name { get; set; } = "";
    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";
    [Required]
    [MinLength(4)]
    public string Password { get; set; } = "";
}
