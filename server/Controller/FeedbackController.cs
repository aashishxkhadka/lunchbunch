using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.DTOs.Feedback;
using OneBottle.Interfaces;
using OneBottle.Mappers;
using OneBottle.Models;

namespace OneBottle.Controller
{
    [ApiController]
    public class FeedbackController : ControllerBase
    {

        private readonly IFeedbackRepository _feedbackRepository;
        private readonly AppDbContext _context;
        public FeedbackController(IFeedbackRepository feedbackRepository, AppDbContext context)
        {
            _feedbackRepository = feedbackRepository;
            _context = context;
        }

        [HttpGet("/api/feedback")]
        public async Task<IActionResult> GetFeedbacksAsync()
        {
            var feedbacks = await _feedbackRepository.GetFeedbackAsync();
            if (feedbacks == null)
            {
                return NotFound();
            }
            return Ok(feedbacks.Select(f => f.ToFeedbackDTO()));
        }

        [HttpGet("/api/feedback/{productId:guid}")]
        public async Task<IActionResult> GetFeedbacksByProductIdAsync(Guid productId)
        {
            var feedbacks = await _feedbackRepository.GetFeedbacksByProductIdAsync(productId);
            if (feedbacks == null)
            {
                return NotFound();
            }
            return Ok(feedbacks.Select(f => FeedbackMappers.ToFeedbackDTO(f)));
        }

        [HttpGet("/api/feedback/user/{userId:guid}")]
        public async Task<IActionResult> GetFeedbackByUserIdAsync(Guid userId)
        {
            var feedbacks = await _feedbackRepository.GetFeedbackAsync();
            if (feedbacks == null)
            {
                return NotFound();
            }
            return Ok(feedbacks.Where(f => f.UserId == userId).Select(f => FeedbackMappers.ToFeedbackDTO(f)));
        }


        [HttpPost("/api/feedback")]
        public async Task<IActionResult> AddFeedbackAsync([FromBody] CreateFeedbackDTO feedback)
        {
            var feedbackModel =
                new Feedback
                {
                    FeedbackId = new Guid(),
                    UserId = feedback.UserId,
                    User = await _context.Users.FirstOrDefaultAsync(u => u.UserId == feedback.UserId),
                    ProductId = feedback.ProductId,
                    Comment = feedback.Comment,
                    Date = DateTime.Now,
                };
            await _feedbackRepository.AddFeedbackAsync(feedbackModel);
            return Ok(feedback.ToFeedbackModel());
        }


        [HttpDelete("/api/feedback/{feedbackId}")]
        public async Task<IActionResult> DeleteFeedbackAsync(Guid feedbackId)
        {
            var feedback = await _feedbackRepository.GetFeedbackByIdAsync(feedbackId);
            if (feedback == null)
            {
                return NotFound();
            }
            await _feedbackRepository.DeleteFeedbackAsync(feedbackId);
            return Ok();
        }
    }
}
