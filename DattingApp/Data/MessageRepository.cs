using System;
using DattingApp.DTO_Classes;
using DattingApp.Entites;
using DattingApp.Extensions;
using DattingApp.Helpers;
using DattingApp.Interfaces;

namespace DattingApp.Data;

public class MessageRepository(ProfileDB context) : IMessageRepository
{
    public void AddMessage(Message message)
    {
        context.Messages.Add(message);
    }

    public async void DeleteMessage(Message message)
    {
        context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessage(string messageId)
    {
        return await context.Messages.FindAsync(messageId);
    }

    public async Task<PaginatedResult<Messages_DTO>> GetMessageForMember(MessageParams messageParams)
    {
        var query = context.Messages
        .OrderByDescending(x => x.MessageSent)
        .AsQueryable();
        query = messageParams.Container switch
        {
            "Outbox" => query.Where(x => x.SenderId == messageParams.MemberId),
            _ => query.Where(x => x.RecipientId == messageParams.MemberId)
        };
        var messageQuery = query.Select(MessageExtensions.ToDtoProjection());
        return await PaginatedHelper.CreateAsync(messageQuery, messageParams.PageNumber, messageParams.PageSize);
    }

    public Task<IReadOnlyList<Messages_DTO>> GetMessageThread(string currentMemberId, string recipientId)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
