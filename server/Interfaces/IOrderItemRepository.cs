using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface IOrderItemRepository
    {
        Task<OrderItem> GetOrderItemByIdAsync(Guid orderItemId);
        Task<IEnumerable<OrderItem>> GetOrderItemsByOrderIdAsync(Guid orderId);
        Task AddOrderItemAsync(OrderItem orderItem);
        Task UpdateOrderItemAsync(OrderItem orderItem);
        Task DeleteOrderItemAsync(Guid orderItemId);
    }
}