using DildoShop.Server.DataBase;
using DildoShop.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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

        var user = new User
        {
            Login = request.Login,
            PasswordHash = _passwordHasher.HashPassword(null, request.Password),
            Gender = request.Gender,
            PreferredDildoSize = request.PreferredDildoSize // Убедитесь, что это поле правильно передается
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
}
