using System.ComponentModel.DataAnnotations;
using OneBottle.DTOs.User;

namespace OneBottle.DTOs.Feedback
{
    public class CreateFeedbackDTO
    {
        [Required]
        public Guid FeedbackId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        [Required]
        public Guid ProductId { get; set; }
        public int Rating { get; set; }
        [Required, MinLength(10, ErrorMessage = "Comment must be more than 10 characters")]
        public string Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}