using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using DattingApp.Data;
using DattingApp.DTO_Classes;
using DattingApp.Entites;
using DattingApp.Extensions;
using DattingApp.Helpers;
using DattingApp.Interfaces;
using DattingApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace DattingApp.Controller
{
  [Authorize]
  public class ProfileController(ImemberRepository imemberRepository, IphotoService iphotoService) : MainController
  {
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Profie_members>>> GetUsers([FromQuery] MemberParams memberParams)
    {
      memberParams.CurrentMemberId = User.GetMemberId();
      return Ok(await imemberRepository.GetMembersAsync(memberParams));
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
    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
      var member = await imemberRepository.GetMemberForUpdate(User.GetMemberId());
      if (member == null) { return BadRequest("Connot get member from token"); }
      var photo = member.Photos.SingleOrDefault(x => x.id == photoId);
      if (member.ImgUrl == photo?.Url || photo == null)
      {
        return BadRequest("Connot set this as main image");
      }
      member.ImgUrl = photo.Url;
      member.User.ImgUrl = photo.Url;
      if (await imemberRepository.SaveAllAsync())
      { return NoContent(); }
      return BadRequest("Problem setting up the image");
    }
    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
      var member = await imemberRepository.GetMemberForUpdate(User.GetMemberId());
      if (member == null) { return BadRequest("Connot get member from token"); }
      var photo = member.Photos.SingleOrDefault(x => x.id == photoId);
      if (photo == null || photo.Url == member.ImgUrl)
      {
        return BadRequest("This photo cannot be deleted");
      }
      if (photo.PublicId != null)
      {
        var result = await iphotoService.DeletePhotoAsync(photo.PublicId);
        if (result.Error != null)
        {
          return BadRequest(result.Error.Message);
        }
      }
      member.Photos.Remove(photo);
      if (await imemberRepository.SaveAllAsync())
      {
        return Ok();
      }
      return BadRequest("Problem deleting the photo");
    }
  }
}
