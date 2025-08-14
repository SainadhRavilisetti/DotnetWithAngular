using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using DattingApp.Data;
using DattingApp.DTO_Classes;
using DattingApp.Entites;
using DattingApp.Extensions;
using DattingApp.Interfaces;
using DattingApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DattingApp.Controller
{
    [Authorize]
    public class ProfileController(ImemberRepository imemberRepository, IphotoService iphotoService) : MainController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Profie_members>>> GetUsers()
        {
            return Ok(await imemberRepository.GetMembersAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Profie_members>> GetUserById(string id)
        {
            var user = await imemberRepository.GetMembersByIdAsync(id);
            if (user == null) return NotFound();
            return user;
        }
        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhoto(string id)
        {
            var photos = await imemberRepository.GetPhotosForMembersAsync(id);
            return Ok(photos);
        }
        [HttpPut]
        public async Task<ActionResult> GetMemberForUpdate(UpdateProfile_DTO updateProfile_DTO)
        {
            var memberId = User.GetMemberId();
            //if (memberId == null) return BadRequest("The id your looking can't Found!");
            var member = await imemberRepository.GetMemberForUpdate(memberId);
            if (member == null) return BadRequest("Count not get member!");
            member.Name = updateProfile_DTO.Name ?? member.Name;
            member.Description = updateProfile_DTO.Description ?? member.Description;
            member.City = updateProfile_DTO.City ?? member.City;
            member.Country = updateProfile_DTO.Country ?? member.Country;
            member.User.Name = updateProfile_DTO.Name ?? member.User.Name;


            imemberRepository.Update(member);
            if (await imemberRepository.SaveAllAsync()) return Ok("Request successful!");
            return BadRequest("Failed to Update the profile!");

        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
        {
            var member = await imemberRepository.GetMemberForUpdate(User.GetMemberId());
            if (member == null) return BadRequest("Cannot update member");
            var result = await iphotoService.UploadPhotoAsync(file);
            if (result.Error != null) { return BadRequest(result.Error.Message); }
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                MemberId = User.GetMemberId()
            };
            if (member.ImgUrl == null)
            {
                member.ImgUrl = photo.Url;
                member.User.ImgUrl = photo.Url;
            }
            member.Photos.Add(photo);
            if (await imemberRepository.SaveAllAsync()) return photo;
            return BadRequest("Problem adding photo");
        }
    }
}
