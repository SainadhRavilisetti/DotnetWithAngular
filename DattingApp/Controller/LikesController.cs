using System;
using DattingApp.Entites;
using DattingApp.Extensions;
using DattingApp.Helpers;
using DattingApp.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DattingApp.Controller;

public class LikesController(ILikesRepository likesRepository) : MainController
{
    [HttpPost("{targetMemberId}")]
    public async Task<ActionResult> ToggleLike(string targetMemberId)
    {
        var sourceMemberId = User.GetMemberId();
        if (sourceMemberId == targetMemberId)
        {
            return BadRequest("You cannot like yourself");
        }
        var existingLike = await likesRepository.GetMemberLike(sourceMemberId, targetMemberId);
        if (existingLike == null)
        {
            var like = new MemberLike
            {
                SourceMemberId = sourceMemberId,
                TargetMemberId = targetMemberId
            };
            likesRepository.AddLike(like);

        }
        else
        {
            likesRepository.DeleteLike(existingLike);
        }
        if (await likesRepository.SaveAllChanges()) { return Ok(); }
        return BadRequest("Failed to update like");
    }

    [HttpGet("list")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetCurrentMemberLikeIds()
    {
        return Ok(await likesRepository.GetCurrentMemberLinkIds(User.GetMemberId()));
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedResult<Profie_members>>> GetMemberLikes([FromQuery] LikesParams likesParams)
    {
        likesParams.MemberId = User.GetMemberId();
        var members = await likesRepository.GetMemberLikes(likesParams);
        return Ok(members);
    }
}
