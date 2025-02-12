using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DildoShop.Server.Models;

namespace DildoShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwoFactorAuthController : ControllerBase
    {
        private static readonly ConcurrentDictionary<string, TwoFactorAuth> Users = new ConcurrentDictionary<string, TwoFactorAuth>();

        [HttpPost("send-code")]
        public IActionResult SendCode([FromBody] EmailRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || !request.Email.Contains("@"))
            {
                return BadRequest("Invalid email address.");
            }

            var verificationCode = GenerateVerificationCode();
            var twoFactorAuth = new TwoFactorAuth
            {
                Email = request.Email,
                VerificationCode = verificationCode,
                Is2FAEnabled = false
            };

            Users[request.Email] = twoFactorAuth;

          

            Console.WriteLine($"Code sent to {request.Email}: {verificationCode}");

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

        private string GenerateVerificationCode()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] randomNumber = new byte[4]; // 4 байта = 32 возможных значения
                rng.GetBytes(randomNumber);
                uint randomValue = BitConverter.ToUInt32(randomNumber, 0);

                // Генерация 6-значного кода
                return (randomValue % 900000 + 100000).ToString(); // Убедитесь, что код всегда 6-значный
            }
        }

    }

    public class EmailRequest
    {
        public string Email { get; set; }
    }

    public class VerificationRequest
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
