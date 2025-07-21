using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DattingApp.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace DattingApp.Services;

public class TokenService(IConfiguration configuration):TokenInterface
{
    public string CreateToken(Profile profile)
    {
        var tokenkey = configuration["TokenKey"] ?? throw new Exception("Can't find the token");
        if (tokenkey.Length < 64)
        {
            throw new Exception("Your token key less than 64 characters");
        }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey));
        var claims = new List<Claim>
        {
            new(ClaimTypes.Email,profile.Email),
            new(ClaimTypes.NameIdentifier,profile.Id)
        };
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
} 
