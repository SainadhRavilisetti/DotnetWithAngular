using DattingApp.Entites;
using DattingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DattingApp.Controller
{
    [Authorize]
    public class ProfileController(ImemberRepository imemberRepository) : MainController
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
            return Ok(imemberRepository.GetPhotosForMembersAsync(id));
        }
    }
}
