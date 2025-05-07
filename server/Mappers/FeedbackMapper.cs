using OneBottle.DTOs;
using OneBottle.DTOs.Feedback;
using OneBottle.DTOs.Product;
using OneBottle.DTOs.User;
using OneBottle.Models;

namespace OneBottle.Mappers
{
    public static class FeedbackMappers
    {
        // public static CreateFeedbackDTO ToFeedbackDTO(this Feedback feedback)
        // {
        //     return new CreateFeedbackDTO
        //     {
        //         FeedbackId = feedback.FeedbackId,
        //         UserId = feedback.UserId,
        //         Username = feedback.User?.Username,
        //         ProductId = feedback.ProductId,
        //         Rating = feedback.Rating,
        //         Comment = feedback.Comment,
        //         Date = feedback.Date
        //     };
        // }
        public static FeedbackDTO ToFeedbackDTO(this Feedback feedback)
        {
            return new FeedbackDTO
            {
                FeedbackId = feedback.FeedbackId,
                UserId = feedback.UserId,
                User = new UserDTO 
                {
                    UserId = feedback.User.UserId,
                    Username = feedback.User.Username,
                    Email = feedback.User.Email,
                },
                ProductId = feedback.ProductId,
                Rating = feedback.Rating,
                Comment = feedback.Comment,
                Date = feedback.Date
            };
        }


        public static Feedback ToFeedbackModel(this CreateFeedbackDTO feedback)
        {
            return new Feedback
            {
                FeedbackId = new Guid(),
                UserId = feedback.UserId,
                ProductId = feedback.ProductId,
                Comment = feedback.Comment,
                Date = new DateTime()
            };
        }
    }
}