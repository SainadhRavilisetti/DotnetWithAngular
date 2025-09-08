using System;
using DattingApp.DTO_Classes;
using DattingApp.Entites;
using DattingApp.Extensions;
using DattingApp.Helpers;

namespace DattingApp.Interfaces;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message?> GetMessage(string messageId);
    Task<PaginatedResult<Messages_DTO>> GetMessageForMember(MessageParams messageParams);
    Task<IReadOnlyList<Messages_DTO>> GetMessageThread(string currentMemberId, string recipientId);
    Task<bool> SaveAllAsync();
}
