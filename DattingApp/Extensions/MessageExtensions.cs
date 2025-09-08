using System;
using System.Linq.Expressions;
using DattingApp.DTO_Classes;
using DattingApp.Entites;

namespace DattingApp.Extensions;

public static class MessageExtensions
{
    public static Messages_DTO ToDto(this Message message)
    {
        return new Messages_DTO
        {
            Id = message.Id,
            SenderId = message.SenderId,
            SenderDisplayName = message.Sender.Name,
            SenderImgUrl = message.Sender.ImgUrl,
            RecipientId = message.RecipientId,
            RecipientDisplayName = message.Recipient.Name,
            RecipientImgUrl = message.Recipient.ImgUrl,
            Content = message.Content,
            DateRead = message.DateRead,
            MessageSent = message.MessageSent
        };
    }
    public static Expression<Func<Message, Messages_DTO>> ToDtoProjection()
    {
        return message => new Messages_DTO
        {
            Id = message.Id,
            SenderId = message.SenderId,
            SenderDisplayName = message.Sender.Name,
            SenderImgUrl = message.Sender.ImgUrl,
            RecipientId = message.RecipientId,
            RecipientDisplayName = message.Recipient.Name,
            RecipientImgUrl = message.Recipient.ImgUrl,
            Content = message.Content,
            DateRead = message.DateRead,
            MessageSent = message.MessageSent
        };
    }
}
