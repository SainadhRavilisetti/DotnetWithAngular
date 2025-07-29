using System;
using DattingApp.Entites;
using DattingApp.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DattingApp.Data;

public class MembersRepository(ProfileDB profileDB) : ImemberRepository
{
    public async Task<IReadOnlyList<Profie_members>> GetMembersAsync()
    {
        return await profileDB.profie_Members.ToListAsync();
    }

    public async Task<Profie_members?> GetMembersByIdAsync(string Id)
    {
        return await profileDB.profie_Members.FindAsync(Id);
    }
    public async Task<IReadOnlyList<Photo>> GetPhotosForMembersAsync(string memberId)
    {
        return await profileDB.profie_Members
        .Where(x => x.Id == memberId)
        .SelectMany(x => x.Photos)
        .ToListAsync();
    } 
    public async Task<bool> SaveAllAsync()
    {
        return await profileDB.SaveChangesAsync() > 0; 
    }
    public void Update(Profie_members profie_Members)
    {
        profileDB.Entry(profie_Members).State = EntityState.Modified;
    }
}
