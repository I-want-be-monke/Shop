using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using DildoShop.Server.Models;

namespace DildoShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwoFactorAuthController : ControllerBase
    {
        private static readonly Dictionary<string, TwoFactorAuth> Users = new Dictionary<string, TwoFactorAuth>();

        [HttpPost("send-code")]
        public IActionResult SendCode([FromBody] string email)
        {
            if (string.IsNullOrEmpty(email) || !email.Contains("@"))
            {
                return BadRequest("Invalid email address.");
            }

            var verificationCode = new Random().Next(100000, 999999).ToString();
            var twoFactorAuth = new TwoFactorAuth
            {
                Email = email,
                VerificationCode = verificationCode,
                Is2FAEnabled = false
            };

            Users[email] = twoFactorAuth;

            
            Console.WriteLine($"Code sent to {email}: {verificationCode}");

            return Ok("Verification code sent.");
        }

        [HttpPost("verify-code")]
        public IActionResult VerifyCode([FromBody] VerificationRequest request)
        {
            if (Users.TryGetValue(request.Email, out var user))
            {
                if (user.VerificationCode == request.Code)
                {
                    user.Is2FAEnabled = true;
                    return Ok("Two-Factor Authentication enabled.");
                }
                return BadRequest("Invalid verification code.");
            }
            return NotFound("User not found.");
        }
    }

    public class VerificationRequest
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
