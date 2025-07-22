using DattingApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.Controller
{
    public class ProfileController(ProfileDB context) : MainController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Profile>>> GetUsers()
        {
            var user = await context.profiles.ToListAsync();
            return user;
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Profile>> GetUserById(string id) {
            var user = await context.profiles.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }
    }
}
