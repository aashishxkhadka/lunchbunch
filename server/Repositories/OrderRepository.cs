using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.DTOs.Order;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Repositories
{

    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddOrderAsync(Order order)
        {
            try
            {
                await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the order.", ex);
            }
        }

        public async Task DeleteOrderAsync(Guid orderId)
        {
            try
            {
                var order = await GetOrderByIdAsync(orderId);
                if (order == null)
                {
                    throw new Exception("Order not found.");
                }
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the order.", ex);
            }
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            try
            {
                var orders = await _context.Orders.ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting all orders.", ex);
            }
        }

        public async Task<Order> GetOrderByIdAsync(Guid orderId)
        {
            try
            {
                var order = await _context.Orders.FindAsync(orderId);
                return order!;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the order.", ex);
            }
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId)
        {
            try
            {
                var orders = await _context.Orders.Where(o => o.UserId == userId).ToListAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the orders.", ex);
            }
        }

        public async Task UpdateOrderAsync(Order order)
        {
            try
            {
                _context.Orders.Update(order);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the order.", ex);
            }
        }
    }
}