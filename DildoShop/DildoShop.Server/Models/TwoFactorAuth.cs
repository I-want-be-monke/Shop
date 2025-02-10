namespace DildoShop.Server.Models
{
    public class TwoFactorAuth
    {
        public string Email { get; set; }
        public string VerificationCode { get; set; }
        public bool Is2FAEnabled { get; set; }
    }
}
