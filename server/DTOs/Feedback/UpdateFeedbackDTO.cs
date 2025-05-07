using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Feedback
{
    public class UpdateFeedbackDTO
    {
        [Required]
        public Guid FeedbackId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid ProductId { get; set; }

        public int? Rating { get; set; }
        [MinLength(10, ErrorMessage = "Comment must be more than 10 characters")]
        public string? Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}