namespace DildoShop.Server.Models
{
    public class UserRegistrationDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Mail { get; set; } 
        public int PreferredDildoSize { get; set; }

        public bool Is2FAEnabled { get; set; }
    }
}
