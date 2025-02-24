using DildoShop.Server.DataBase;
using DildoShop.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DildoShop.Server.Service
{
    public interface IAuthService
    {
        Task<string> Register(UserRegistrationDto request);
        Task<(string message, bool is2FAEnabled, string email)> Login(UserLoginDto request);
    }

    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthService(AppDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<string> Register(UserRegistrationDto request)
        {
            if (await _context.Users.AnyAsync(u => u.Login == request.Login))
            {
                return "The username is already occupied";
            }
            if (await _context.Users.AnyAsync(u => u.Mail == request.Mail))
            {
                return "The email is already occupied";
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

            return "The user has been successfully registered";
        }

        public async Task<(string message, bool is2FAEnabled, string email)> Login(UserLoginDto request)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Login == request.Login);
            if (user == null)
            {
                return ("Invalid Email or password", false, null);
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return ("Invalid username or password", false, null);
            }

            return ($"Welcome back, {user.Login}!", user.Is2FAEnabled, user.Mail);
        }
    }

}
