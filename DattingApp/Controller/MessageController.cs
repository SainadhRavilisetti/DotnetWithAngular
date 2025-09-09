using System;
using DattingApp.Data;
using DattingApp.DTO_Classes;
using DattingApp.Entites;
using DattingApp.Extensions;
using DattingApp.Helpers;
using DattingApp.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;

namespace DattingApp.Controller;

public class MessageController(IMessageRepository messageRepository, ImemberRepository memberRepository) : MainController
{
    [HttpPost]
    public async Task<ActionResult<Messages_DTO>> CreateMessage(CreateMessage_DTO createMessage_DTO)
    {
        var sender = await memberRepository.GetMembersByIdAsync(User.GetMemberId());
        var recipient = await memberRepository.GetMembersByIdAsync(createMessage_DTO.RecipientId);
        if (recipient == null || sender == null || sender.Id == createMessage_DTO.RecipientId)
        {
            return BadRequest("Cannot send this message");
        }
        var message = new Message
        {
            SenderId = sender.Id,
            RecipientId = recipient.Id,
            Content = createMessage_DTO.Content
        };
        messageRepository.AddMessage(message);
        if (await messageRepository.SaveAllAsync())
        {
            return message.ToDto();
        }
        return BadRequest("Failed to send the message.");
    }
    [HttpGet]
    public async Task<ActionResult<PaginatedResult<Messages_DTO>>> GetMessagesByContainer([FromQuery] MessageParams messageParams)
    {
        messageParams.MemberId = User.GetMemberId();
        return await messageRepository.GetMessageForMember(messageParams);
    }
    [HttpGet("thread/{recipientId}")]
    public async Task<ActionResult<IReadOnlyList<Messages_DTO>>> GetMessageTread(string recipientId)
    {
        return Ok(await messageRepository.GetMessageThread(User.GetMemberId(), recipientId));
    }

}
