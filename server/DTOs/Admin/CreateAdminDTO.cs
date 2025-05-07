using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Admin
{
    public class CreateAdminDTO
    {
        public Guid AdminId { get; set; }
        [Required, MaxLength(10), MinLength(3, ErrorMessage = "Username must be between 3 and 10 characters")]
        public string Username { get; set; } = string.Empty;
        [Required, EmailAddress, DataType(DataType.EmailAddress, ErrorMessage = "Email must be {1}")]
        public string Email { get; set; } = string.Empty;
        [Required, DataType(DataType.Password, ErrorMessage = "Password must be {1}")]  
        public string Password { get; set; } = string.Empty;
    }
}