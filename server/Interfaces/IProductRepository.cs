using OneBottle.Models;
namespace OneBottle.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(Guid productId);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product); 
        Task DeleteProductAsync(Guid productId);

        Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(Guid categoryId);
    }
}