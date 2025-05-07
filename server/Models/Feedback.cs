namespace OneBottle.Models
{
    public class Feedback
    {
        public Guid FeedbackId { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}