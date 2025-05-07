using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.User
{
    public class CreateUserDTO
    {
        [Required, MinLength(3), MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required, EmailAddress, DataType(DataType.EmailAddress, ErrorMessage = "Email must be {1}")]
        public string Email { get; set; } = string.Empty;

        [DataType(DataType.Date, ErrorMessage = "Date of birth must be {1}")]
        public DateTime DateOfBirth { get; set; }


        [Required, DataType(DataType.Password, ErrorMessage = "Password must be {1}")]
        public string Password { get; set; } = string.Empty;

    }
}
