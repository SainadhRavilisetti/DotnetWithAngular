using System;
using DattingApp.Interfaces;
using DattingApp.Data;
using SQLitePCL;
using DattingApp.DTO_Classes;

namespace DattingApp.Extensions;

public static class Profile_Extensions
{
    public static User_DTO ToDTO(this Profile profile,TokenInterface tokenInterface)
    {
        return new User_DTO
        {
            Id = profile.Id,
            Name = profile.Name,
            imgUrl=profile.ImgUrl,
            Email = profile.Email,
            token=tokenInterface.CreateToken(profile)
        };
    }
}
