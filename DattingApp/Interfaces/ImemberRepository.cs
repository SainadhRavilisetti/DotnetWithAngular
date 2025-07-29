using System;
using DattingApp.Entites;

namespace DattingApp.Interfaces;

public interface ImemberRepository
{
    void Update(Profie_members profie_Members);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Profie_members>> GetMembersAsync();
    Task<Profie_members?> GetMembersByIdAsync(string Id);
    Task<IReadOnlyList<Photo>> GetPhotosForMembersAsync(string MemberId);

}
