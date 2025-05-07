using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(Guid orderId);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId);
        Task AddOrderAsync(Order order); // This should include OrderItems as well.
        Task UpdateOrderAsync(Order order); // Ensure OrderItems can be updated as well.
        Task DeleteOrderAsync(Guid orderId);
    }
}