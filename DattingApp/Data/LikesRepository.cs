using System;
using DattingApp.Entites;
using DattingApp.Helpers;
using DattingApp.Interfaces;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace DattingApp.Data;

public class LikesRepository(ProfileDB context) : ILikesRepository
{
    public void AddLike(MemberLike like)
    {
        context.Likes.Add(like);
    }

    public void DeleteLike(MemberLike like)
    {
        context.Likes.Remove(like);
    }

    public async Task<IReadOnlyList<string>> GetCurrentMemberLinkIds(string memberId)
    {
        return await context.Likes
        .Where(x => x.SourceMemberId == memberId)
        .Select(x => x.TargetMemberId)
        .ToListAsync();

    }

    public async Task<MemberLike?> GetMemberLike(string SourceMemberId, string TargetMemberId)
    {
        return await context.Likes.FindAsync(SourceMemberId, TargetMemberId);
    }

    public async Task<PaginatedResult<Profie_members>> GetMemberLikes(LikesParams likesParams)
    {
        var query = context.Likes.AsQueryable();
        IQueryable<Profie_members> results;
        switch (likesParams.Predicate)
        {
            case "liked":
                results = query
                .Where(x => x.SourceMemberId == likesParams.MemberId)
                .Select(x => x.TargetMember);
                break;
            case "likedBy":
                results = query
                .Where(x => x.TargetMemberId == likesParams.MemberId)
                .Select(x => x.SourceMember);
                break;
            default://mutual
                var likeIds = await GetCurrentMemberLinkIds(likesParams.MemberId);
                results = query
                     .Where(x => x.TargetMemberId == likesParams.MemberId && likeIds.Contains(x.SourceMemberId))
                     .Select(x => x.SourceMember);
                break;

        }
        return await PaginatedHelper.CreateAsync(results, likesParams.PageNumber, likesParams.PageSize);
    }

    public async Task<bool> SaveAllChanges()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
