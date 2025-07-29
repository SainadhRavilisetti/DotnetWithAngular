using System;
using System.Text.Json;
using DattingApp.Entites;
using DattingApp.DTO_Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace DattingApp.Data;

public class Seed
{
    public static async Task SeedUsers(ProfileDB profileDB)
    {
        if (await profileDB.profiles.AnyAsync()) return;
        var membersdata = await File.ReadAllTextAsync("Data/datafile.json");
        var members = JsonSerializer.Deserialize<List<SeedUser_DTO>>(membersdata);
        if (members == null)
        {
            Console.WriteLine("No data in the file!");
            return;
        }
        foreach (var item in members)
        {
            using var hmac = new HMACSHA512();
            var user = new Profile
            {
                Id = item.Id,
                Email = item.Email,
                Name = item.Name,
                ImgUrl = item.ImgUrl,
                Password = hmac.ComputeHash(Encoding.UTF8.GetBytes("Password@123")),
                Passwordsalt = hmac.Key,
                profie_Members = new Profie_members
                {
                    Id = item.Id,
                    Name = item.Name,
                    ImgUrl = item.ImgUrl,
                    Description = item.Description,
                    City = item.City,
                    Country = item.Country,
                    LastActive = item.LastActive,
                    Gender = item.Gender,
                    Created = item.Created,
                    DateOfBirth = item.DateOfBirth,
                }
            };
            user.profie_Members.Photos.Add(new Photo
            {
                Url = item.ImgUrl,
                MemberId = item.Id
            });
            profileDB.profiles.Add(user);
        }
        await profileDB.SaveChangesAsync();
    }

}
