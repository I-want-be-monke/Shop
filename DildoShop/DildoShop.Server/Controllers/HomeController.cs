using DildoShop.Server.Models;
using DildoShop.Server.Service;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationDto request)
    {
        var message = await _authService.Register(request);
        if (message.Contains("already occupied"))
        {
            return BadRequest(new { message });
        }

        return Ok(new { message });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto request)
    {
        var (message, is2FAEnabled, email) = await _authService.Login(request);
        if (message.Contains("Invalid"))
        {
            return BadRequest(new { message });
        }

        return Ok(new
        {
            message,
            is2FAEnabled,
            email
        });
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("Test successful");
    }
}
