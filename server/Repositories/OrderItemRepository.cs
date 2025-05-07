using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Repositories
{

    public class OrderItemRepository : IOrderItemRepository
    {

        private readonly AppDbContext _context;

        public OrderItemRepository(AppDbContext context)
        {

            _context = context;

        }

        public async Task<OrderItem> GetOrderItemByIdAsync(Guid orderItemId)
        {

            var orderItem = await _context.OrderItems.FindAsync(orderItemId);
            return orderItem!;

        }

        public async Task<IEnumerable<OrderItem>> GetOrderItemsByOrderIdAsync(Guid orderId)
        {

            return await _context.OrderItems.Where(oi => oi.OrderId == orderId).ToListAsync();

        }

        public async Task AddOrderItemAsync(OrderItem orderItem)
        {

            try
            {

                await _context.OrderItems.AddAsync(orderItem);

                await SaveChanges();

            }
            catch (Exception ex)
            {

                // Log exception here 

                throw new Exception("An error occurred while adding the order item.", ex);

            }

        }

        public async Task UpdateOrderItemAsync(OrderItem orderItem)
        {

            try
            {

                _context.OrderItems.Update(orderItem);

                await SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the order item.", ex);

            }

        }


        public async Task DeleteOrderItemAsync(Guid orderItemId)
        {


            var orderItem = await GetOrderItemByIdAsync(orderItemId);


            if (orderItem != null)
            {


                try
                {


                    _context.OrderItems.Remove(orderItem);


                    await SaveChanges();


                }
                catch (Exception ex)
                {


                    // Log exception here 


                    throw new Exception("An error occurred while deleting the order item.", ex);


                }


            }


        }


        private async Task SaveChanges()
        {

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                // Log exception here

                throw new Exception("An error occurred while saving changes", ex);

            }

        }


    }


}