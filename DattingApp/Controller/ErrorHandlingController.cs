using System;
using Microsoft.AspNetCore.Mvc;

namespace DattingApp.Controller;

public class ErrorHandlingController : MainController
{
    [HttpGet("auth")]
    public IActionResult GetAuth()
    {
        return Unauthorized();
    }
    [HttpGet("not-found")]
    public IActionResult GetNotFund()
    {
        return NotFound();
    }
    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new Exception("Server is not responding");
    }
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("The Bad Request");
    }
}
