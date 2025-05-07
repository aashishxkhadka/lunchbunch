using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Admin
{
    public class UpdateAdminDTO
    {
        [Length(3, 10, ErrorMessage = "Username must be between 3 and 10 characters")]
        public string Username { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [DataType(DataType.Password, ErrorMessage = "Passwords must adehres to passwords standards.")]
        public string Password { get; set; } = string.Empty;
    }
}