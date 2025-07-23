using System;
using System.Security.Cryptography;
using System.Text;
using DattingApp.Data;
using DattingApp.DTO_Classes;
using DattingApp.Interfaces;
using DattingApp.Extensions;
using DattingApp.Services;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DattingApp.Controller;

public class AccountController(ProfileDB context, TokenInterface tokenInterface) : MainController
{
    [HttpPost("register")]
    public async Task<ActionResult<User_DTO>> Regiter(Profile_DTO profile_)
    {
        if (await EmailExits(profile_.Email)) return BadRequest("Email Taken");
        using var hash = new HMACSHA512();
        var profile = new Profile
        {
            Name = profile_.Name,
            Email = profile_.Email,
            Password = hash.ComputeHash(Encoding.UTF8.GetBytes(profile_.Password)),
            Passwordsalt = hash.Key

        };
        context.profiles.Add(profile);
        await context.SaveChangesAsync();
        return profile.ToDTO(tokenInterface);
    }
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<User_DTO>> Login(Login_DTO login_)
    {
        var profile = await context.profiles.SingleOrDefaultAsync(x => x.Email == login_.Email);
        if (profile == null) return Unauthorized("Invalid Email address");
        using var hash = new HMACSHA512(profile.Passwordsalt);
        var computehash = hash.ComputeHash(Encoding.UTF8.GetBytes(login_.Password));
        for (int i = 0; i < computehash.Length; i++)
        {
            if (computehash[i] != profile.Password[i]) return Unauthorized("Invalid Password");
        }
        return profile.ToDTO(tokenInterface);
    }
    public async Task<bool> EmailExits(string Email)
    {
        return await context.profiles.AnyAsync(x => x.Email.ToLower() == Email.ToLower());
    }
}
