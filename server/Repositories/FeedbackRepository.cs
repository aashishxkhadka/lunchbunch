using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.DTOs.Feedback;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly AppDbContext _context;

        public FeedbackRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Feedback> GetFeedbackByIdAsync(Guid feedbackId)
        {
            var feedbacks = await _context.Feedbacks.FindAsync(feedbackId);
            return feedbacks!;

        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByProductIdAsync(Guid productId)
        {
            return await _context.Feedbacks.Include(f => f.User).Where(f => f.ProductId == productId).Include(f => f.Product).ToListAsync();
        }

        public async Task AddFeedbackAsync(Feedback feedback)
        {
            try
            {
                await _context.Feedbacks.AddAsync(feedback);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here 
                throw new Exception("An error occurred while adding feedback.", ex);
            }
        }

        public async Task UpdateFeedbackAsync(Feedback feedback)
        {
            try
            {
                _context.Feedbacks.Update(feedback);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here  
                throw new Exception("An error occurred while updating feedback.", ex);
            }
        }

        public async Task DeleteFeedbackAsync(Guid feedbackId)
        {
            var feedback = await GetFeedbackByIdAsync(feedbackId);
            if (feedback != null)
            {
                try
                {
                    _context.Feedbacks.Remove(feedback);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    // Log exception here  
                    throw new Exception("An error occurred while deleting feedback.", ex);
                }
            }
        }
        public async Task<IEnumerable<Feedback>> GetFeedbackByUserIdAsync(Guid userId)
        {
            var feedback = await _context.Feedbacks.Include(f => f.Product).Where(f => f.UserId == userId).ToListAsync();
            return feedback;
        }

        public async Task<IEnumerable<Feedback>> GetFeedbackAsync()
        {
            try
            {
                var feedbacks = await _context.Feedbacks.Include(f => f.User).ToListAsync();
                return feedbacks;
            }
            catch (Exception ex)
            {
                // Log exception here  
                throw new Exception("An error occurred while getting feedback.", ex);
            }
        }
    }
}