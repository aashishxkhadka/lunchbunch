using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByIdAsync(Guid cartId);
        Task<IEnumerable<Cart>> GetCartsByUserIdAsync(Guid userId);
        Task AddCartItemAsync(Cart cartItem);
        Task UpdateCartItemAsync(Cart cartItem);
        Task DeleteCartItemAsync(Guid cartId);
        Task<IEnumerable<Cart>> GetAllCartsAsync();
    }
}