using System;
using DattingApp.Entites;
using DattingApp.Helpers;
using DattingApp.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DattingApp.Data;

public class MembersRepository(ProfileDB profileDB) : ImemberRepository
{
    public async Task<Profie_members?> GetMemberForUpdate(string id)
    {
        return await profileDB.profie_Members
        .Include(x => x.User)
        .Include(x => x.Photos).
        SingleOrDefaultAsync(x => x.Id == id);
    }

    public Task GetMemberForUpdate(object value)
    {
        throw new NotImplementedException();
    }

    // public async Task<IReadOnlyList<Profie_members>> GetMembersAsync()
    // {
    //     return await profileDB.profie_Members.ToListAsync();
    // }

    public async Task<PaginatedResult<Profie_members>> GetMembersAsync(MemberParams memberParams)
    {
        var query = profileDB.profie_Members.AsQueryable();
        query = query.Where(x => x.Id != memberParams.CurrentMemberId);
        if (memberParams.Gender != null)
        {
            query = query.Where(x => x.Gender == memberParams.Gender);
        }
        var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-memberParams.MaxAge - 1));
        var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-memberParams.MinAge));
        query = query.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);
        return await PaginatedHelper.CreateAsync(query, memberParams.PageNumber, memberParams.PageSize);
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
