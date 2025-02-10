namespace DildoShop.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Gender { get; set; }
        public string Mail { get; set; } 
        public int PreferredDildoSize { get; set; }

        public bool Is2FAEnabled;
    }
}
