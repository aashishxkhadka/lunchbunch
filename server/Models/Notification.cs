namespace OneBottle.Models
{
    public enum NotificationContext
    {
        OrderPlaced,
        OrderShipped,
        OrderDelivered,
        OrderCancelled,
    }

    public enum NotificationType
    {
        Promotional,
        Personal
    }
    public class Notification
    {
        public Guid NotificationId { get; set; }
        public NotificationType NotificationType { get; set; }
        public NotificationContext NotificationContext { get; set; }

        public string NotificationContent { get; set; } = string.Empty;
        public string NotificationTitle { get; set; } = string.Empty;
        public DateTime NotificationDate { get; set; } = DateTime.UtcNow;
        public Guid? UserId { get; set; }
    }
}