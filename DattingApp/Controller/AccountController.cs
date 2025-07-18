using System;
using System.Security.Cryptography;
using System.Text;
using DattingApp.Data;
using Microsoft.AspNetCore.Mvc;

namespace DattingApp.Controller;

public class AccountController(ProfileDB context) : MainController
{
    [HttpPost("register")]
    public async Task<ActionResult<Profile>> Regiter(string email, string name ,string password,int id=0)
    {
        using var hash = new HMACSHA512();
        var user = new Profile
        {
            Name = name,
            Email = email,
            Password = hash.ComputeHash(Encoding.UTF8.GetBytes(password)),
            Passwordsalt = hash.Key

        };
        context.profiles.Add(user);
        await context.SaveChangesAsync();
        return user;
    }

}
