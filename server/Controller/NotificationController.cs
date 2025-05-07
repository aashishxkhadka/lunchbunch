using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Models;

namespace OneBottle.Controller
{
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NotificationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/api/notifications/all")]
        public async Task<IActionResult> GetAllNotifications()
        {
            var notifications = await _context.Notifications.ToListAsync();
            if (notifications == null)
            {
                return NotFound();
            }
            return Ok(notifications);
        }

        [HttpGet("/api/notificatins/{userId:guid}")]
        public async Task<IActionResult> GetNotificationByUserId(Guid userId)
        {
            var notifications = await _context.Notifications.Where(notification => notification.UserId == userId).ToListAsync();
            if (notifications == null)
            {
                return NotFound();
            }
            return Ok(notifications);
        }


        [HttpGet("/api/notifications/promos")]
        public async Task<IActionResult> GetNotificationsByType()
        {
            var notifications = await _context.Notifications.Where(notification => notification.NotificationType == 0).ToListAsync();
            if (notifications == null)
            {
                return NotFound();
            }
            return Ok(notifications);
        }

        [HttpPost]
        [Route("/api/notifications")]
        public async Task<IActionResult> CreateNotification([FromBody] Notification notification)
        {
            var notificationToAdd = new Notification
            {
                NotificationId = Guid.NewGuid(),
                NotificationContext = notification.NotificationContext,
                NotificationType = notification.NotificationType,
                NotificationContent = notification.NotificationContent,
                NotificationTitle = notification.NotificationTitle,
                NotificationDate = DateTime.Now,
                UserId = notification.UserId
            };
            await _context.Notifications.AddAsync(notificationToAdd);
            await _context.SaveChangesAsync();
            return Ok(notificationToAdd);
        }
    }
}