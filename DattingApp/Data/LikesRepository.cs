using System;
using DattingApp.Entites;
using DattingApp.Interfaces;

namespace DattingApp.Data;

public class LikesRepository : ILikesRepository
{
    public void AddLike(MemberLike like)
    {
        throw new NotImplementedException();
    }

    public void DeleteLike(MemberLike like)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<string>> GetCurrentMemberLinkIds(string memberId)
    {
        throw new NotImplementedException();
    }

    public Task<MemberLike> GetMemberLike(string SourceMemberId, string TargetMemberId)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Profie_members>> GetMemberLikes(string predicate, string memberId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> SaveAllChanges()
    {
        throw new NotImplementedException();
    }
}
