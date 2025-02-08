namespace DildoShop.Server.Models
{
    public class UserRegistrationDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public float PreferredDildoSize { get; set; }
    }
}
