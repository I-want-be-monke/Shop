using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Threading.Tasks;
using DildoShop.Server.Models;
using System;

namespace DildoShop.Server.Service
{
    public interface ITwoFactorAuthService
    {
        Task<string> SendCodeAsync(string email);
        Task<string> VerifyCodeAsync(string email, string code);
    }



public class TwoFactorAuthService : ITwoFactorAuthService
    {
        private static readonly ConcurrentDictionary<string, TwoFactorAuth> Users = new ConcurrentDictionary<string, TwoFactorAuth>();

        public async Task<string> SendCodeAsync(string email)
        {
            if (string.IsNullOrEmpty(email) || !email.Contains("@"))
            {
                throw new ArgumentException("Invalid email address.");
            }

            var verificationCode = GenerateVerificationCode();
            var twoFactorAuth = new TwoFactorAuth
            {
                Email = email,
                VerificationCode = verificationCode,
                Is2FAEnabled = false
            };

            Users[email] = twoFactorAuth;

            // Здесь вы можете добавить логику для отправки кода на email

            Console.WriteLine($"Code sent to {email}: {verificationCode}");

            return "Verification code sent.";
        }

        public async Task<string> VerifyCodeAsync(string email, string code)
        {
            if (Users.TryGetValue(email, out var user))
            {
                if (user.VerificationCode == code)
                {
                    user.Is2FAEnabled = true;
                    return "Two-Factor Authentication enabled.";
                }
                return "Invalid verification code.";
            }
            return "User not found.";
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

}
