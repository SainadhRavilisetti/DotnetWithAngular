using System;
using DattingApp.Entites;
using DattingApp.Helpers;

namespace DattingApp.Interfaces;

public interface ILikesRepository
{
    Task<MemberLike?> GetMemberLike(string SourceMemberId, string TargetMemberId);
    Task<PaginatedResult<Profie_members>> GetMemberLikes(LikesParams likesParams);

    Task<IReadOnlyList<string>> GetCurrentMemberLinkIds(string memberId);

    void DeleteLike(MemberLike like);
    void AddLike(MemberLike like);
    Task<bool> SaveAllChanges();

}
