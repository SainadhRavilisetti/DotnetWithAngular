using System;
using DattingApp.Entites;

namespace DattingApp.Interfaces;

public interface ILikesRepository
{
    Task<MemberLike> GetMemberLike(string SourceMemberId, string TargetMemberId);
    Task<IReadOnlyList<Profie_members>> GetMemberLikes(string predicate, string memberId);

    Task<IReadOnlyList<string>> GetCurrentMemberLinkIds(string memberId);

    void DeleteLike(MemberLike like);
    void AddLike(MemberLike like);
    Task<bool> SaveAllChanges();

}
