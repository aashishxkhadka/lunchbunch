using System.ComponentModel.DataAnnotations;

namespace OneBottle.Models
{
    public class UserProfile
    {
        [Key]
        public Guid ProfileId { get; set; }
        public string? Username { get; set; } = string.Empty;
        public DateTime? DateOfBirth { get; set; } = new DateTime();
        public string? Address { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public string? IdentificationType { get; set; } = string.Empty;
        public int? IdentificationNumber { get; set; }
    }
}