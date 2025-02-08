using DildoShop.Server.DataBase;
using DildoShop.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 

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
            return BadRequest("Логин уже занят");
        }

        var user = new User
        {
            Login = request.Login,
            PasswordHash = _passwordHasher.HashPassword(null, request.Password) // null, так как у нас нет пользователя еще
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Пользователь успешно зарегистрирован");
    }
}
