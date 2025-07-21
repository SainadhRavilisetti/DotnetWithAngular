using System;
using System.ComponentModel.DataAnnotations;
namespace DattingApp.DTO_Classes;

public class Login_DTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";
    [Required]
    [MinLength(4)]
    public string Password { get; set; } = "";
}