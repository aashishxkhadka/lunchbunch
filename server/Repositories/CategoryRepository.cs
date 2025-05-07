using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.Interfaces;
using OneBottle.Models;

namespace OneBottle.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
       private readonly AppDbContext _context;

       public CategoryRepository(AppDbContext context)
       {
           _context = context;
       }

       public async Task<Category> GetCategoryByIdAsync(Guid categoryId)
       {
           var response = await _context.Categories.FindAsync(categoryId);
           return response!;
       }

       public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
       {
           return await _context.Categories.ToListAsync();
       }

       public async Task AddCategoryAsync(Category category)
       {
           try
           {
               await _context.Categories.AddAsync(category);
               await _context.SaveChangesAsync();
           }
           catch (Exception ex)
           {
               // Log exception here
               throw new Exception("An error occurred while adding the category.", ex);
           }
       }

       public async Task UpdateCategoryAsync(Category category)
       {
           try
           {
               _context.Categories.Update(category);
               await _context.SaveChangesAsync();
           }
           catch (Exception ex)
           {
               // Log exception here
               throw new Exception("An error occurred while updating the category.", ex);
           }
       }

       public async Task DeleteCategoryAsync(Guid categoryId)
       {
           var category = await GetCategoryByIdAsync(categoryId);
           if (category != null)
           {
               try
               { 
                   _context.Categories.Remove(category); 
                   await _context.SaveChangesAsync(); 
               } 
               catch (Exception ex) 
               { 
                   // Log exception here 
                   throw new Exception("An error occurred while deleting the category.", ex); 
               } 
           } 
       } 
   } 
}