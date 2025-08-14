using System;
using System.Security.Claims;

namespace DattingApp.Extensions;

public static class ClaimsExtention
{
    public static string GetMemberId(this ClaimsPrincipal user)
    {
        return user.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new Exception("Connot get methodId from token");
    }
}
