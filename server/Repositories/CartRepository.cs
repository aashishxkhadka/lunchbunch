using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Mappers;
using OneBottle.Models;

namespace OneBottle.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> GetCartByIdAsync(Guid cartId)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            return cart!;
        }

        public async Task<IEnumerable<Cart>> GetCartsByUserIdAsync(Guid userId)
        {
            return await _context.Carts.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task AddCartItemAsync(Cart cartItem)
        {
            try
            {
                var productExist = await _context.Products.AnyAsync(p => p.ProductId == cartItem.ProductId);
                if (productExist == false)
                {
                    throw new Exception("Product does not exist.");
                }
                var userLoggedIn = await _context.Users.AnyAsync(u => u.UserId == cartItem.UserId);
                if (userLoggedIn == false)
                {
                    throw new Exception("User does not exist.");
                }
                await _context.Carts.AddAsync(cartItem);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while adding the cart item.", ex);
            }
        }

        public async Task UpdateCartItemAsync(Cart cartItem)
        {
            try
            {
                _context.Carts.Update(cartItem);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while updating the cart item.", ex);
            }
        }

        public async Task DeleteCartItemAsync(Guid cartId)
        {
            var cartItem = await GetCartByIdAsync(cartId);
            if (cartItem != null)
            {
                try
                {
                    _context.Carts.Remove(cartItem);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    // Log exception here
                    throw new Exception("An error occurred while deleting the cart item.", ex);
                }
            }
        }

        public async Task<IEnumerable<Cart>> GetAllCartsAsync()
        {
            var carts = await _context.Carts.Include(c => c.Product).ToListAsync();

            return carts;
        }
    }
}