using System;
using DattingApp.Entites;
using DattingApp.Helpers;

namespace DattingApp.Interfaces;

public interface ImemberRepository
{
    void Update(Profie_members profie_Members);
    Task<bool> SaveAllAsync();
    Task<PaginatedResult<Profie_members>> GetMembersAsync(PaginationParams paginationParams);
    Task<Profie_members?> GetMembersByIdAsync(string Id);
    Task<IReadOnlyList<Photo>> GetPhotosForMembersAsync(string MemberId);
    Task<Profie_members?> GetMemberForUpdate(string id);
    Task GetMemberForUpdate(object value);
}
