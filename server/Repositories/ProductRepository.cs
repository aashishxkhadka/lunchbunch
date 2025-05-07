using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddProductAsync(Product product)
        {
            try
            {
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the product.", ex);
            }
        }

        public async Task DeleteProductAsync(Guid productId)
        {
            try
            {
                var product = await GetProductByIdAsync(productId);
                if (product == null)
                {
                    throw new Exception("Product not found.");
                }
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the product.", ex);
            }
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            try
            {
                return await _context.Products.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting all products.", ex);
            }
        }

        public async Task<Product> GetProductByIdAsync(Guid productId)
        {
            try
            {
                return await _context.Products.FindAsync(productId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the product.", ex);
            }
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(Guid categoryId)
        {
            try
            {
                return await _context.Products.Where(product => product.CategoryId == categoryId).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting products by category id.", ex);
            }
        }

        public async Task UpdateProductAsync(Product product)
        {
            try
            {
                _context.Products.Update(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the product.", ex);
            }
        }
    }
}