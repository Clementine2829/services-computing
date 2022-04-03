using System.ComponentModel.DataAnnotations;

namespace ClementineInn.Dtos.User
{
    public class UserReadDto
    {
        public string UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

    }
}