using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DildoShop.Server.Models;
using DildoShop.Server.Service;

namespace DildoShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwoFactorAuthController : ControllerBase
    {
        private readonly ITwoFactorAuthService _twoFactorAuthService;

        public TwoFactorAuthController(ITwoFactorAuthService twoFactorAuthService)
        {
            _twoFactorAuthService = twoFactorAuthService;
        }

        [HttpPost("send-code")]
        public async Task<IActionResult> SendCode([FromBody] EmailRequest request)
        {
            try
            {
                var result = await _twoFactorAuthService.SendCodeAsync(request.Email);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("verify-code")]
        public async Task<IActionResult> VerifyCode([FromBody] VerificationRequest request)
        {
            var result = await _twoFactorAuthService.VerifyCodeAsync(request.Email, request.Code);
            if (result == "User not found.")
            {
                return NotFound(result);
            }
            if (result == "Invalid verification code.")
            {
                return BadRequest(result);
            }
            return Ok(result);
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
