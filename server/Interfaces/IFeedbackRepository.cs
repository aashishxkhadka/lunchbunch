using OneBottle.DTOs.Feedback;
using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<Feedback> GetFeedbackByIdAsync(Guid feedbackId);
        Task<IEnumerable<Feedback>> GetFeedbacksByProductIdAsync(Guid productId);
        Task<IEnumerable<Feedback>> GetFeedbackAsync();

        Task<IEnumerable<Feedback>> GetFeedbackByUserIdAsync(Guid userId);
        Task AddFeedbackAsync(Feedback feedback);
        Task UpdateFeedbackAsync(Feedback feedback);
        Task DeleteFeedbackAsync(Guid feedbackId);
    }
}

