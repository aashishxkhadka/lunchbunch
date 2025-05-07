using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.User
{
    public class UpdateUserDTO
    {

        public string Username { get; set; } = string.Empty;
        [DataType(DataType.EmailAddress, ErrorMessage = "Email must be {1}")]
        public string Email { get; set; } = string.Empty;
        [DataType(DataType.Password, ErrorMessage = "Date of birth must be {1}")]
        public string Password { get; set; } = string.Empty;
    }
}
