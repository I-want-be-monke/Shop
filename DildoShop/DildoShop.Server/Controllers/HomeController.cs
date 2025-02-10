using DildoShop.Server.DataBase;
using DildoShop.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;

    public AuthController(AppDbContext context)
    {
        _context = context;
        _passwordHasher = new PasswordHasher<User>();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Login == request.Login))
        {
            return BadRequest(new { message = "The username is already occupied" });
        }
        if (await _context.Users.AnyAsync(u => u.Mail == request.Mail))
        {
            return BadRequest(new { message = "The email is already occupied" });
        }

        var user = new User
        {
            Mail = request.Mail,
            Login = request.Login,
            PasswordHash = _passwordHasher.HashPassword(null, request.Password),
            Gender = request.Gender,
            PreferredDildoSize = request.PreferredDildoSize 
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "The user has been successfully registered" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto request)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Login == request.Username);
        if (user == null)
        {
            return BadRequest(new { message = "Invalid username or password" });
        }


        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            return BadRequest(new { message = "Invalid username or password" });
        }

        return Ok(new { message = $"Welcome back, {user.Login}!" });
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("Test successful");
    }

}
