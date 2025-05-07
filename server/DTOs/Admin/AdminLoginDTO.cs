using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Admin
{
    public class AdminLoginDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}