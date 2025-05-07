using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.DTOs.Category;
using OneBottle.Interfaces;
using OneBottle.Mappers;

namespace OneBottle.Controller;

[Route("/api/category")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ICategoryRepository _categoryRepo;

    public CategoryController(AppDbContext context, ICategoryRepository categoryRepository)
    {
        _context = context;
        _categoryRepo = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var response = await _categoryRepo.GetAllCategoriesAsync();
        if (response == null)
        {
            return NotFound();
        }
        var categories = response.Select(category => category.ToCategoryDto());
        return Ok(categories);
    }


    [HttpGet]
    [Route("/api/category/{categoryId:guid}")]
    public async Task<IActionResult> GetCategoryById(Guid categoryId)
    {
        var category = await _categoryRepo.GetCategoryByIdAsync(categoryId);
        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }


    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDTO newCategory)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var categoryModel = new CreateCategoryDTO
        {
            CategoryId = Guid.NewGuid(),
            Name = newCategory.Name,
            Description = newCategory.Description,
        };
        await _categoryRepo.AddCategoryAsync(CategoryMapper.ToCategoryModel(categoryModel));

        return CreatedAtAction(nameof(GetCategoryById), new { categoryId = categoryModel.CategoryId }, categoryModel);

    }


    [HttpPut("/api/category/{categoryId:guid}")]
    public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryDTO categoryDto, Guid categoryId)
    {
        var category = await _categoryRepo.GetCategoryByIdAsync(categoryId);
        if (category == null)
        {
            return NotFound();
        }
        if (!string.IsNullOrWhiteSpace(categoryDto.Name))
        {
            category.Name = categoryDto.Name;
        }
        if (!string.IsNullOrWhiteSpace(categoryDto.Description))
        {
            category.Description = categoryDto.Description;
        }
        await _categoryRepo.UpdateCategoryAsync(category);

        return Ok(category);
    }


    [HttpDelete("/api/category/{categoryId:guid}")]
    public async Task<IActionResult> DeleteCategory(Guid categoryId)
    {
        var category = await _categoryRepo.GetCategoryByIdAsync(categoryId);
        if (category == null)
        {
            return NotFound();
        }
        await _categoryRepo.DeleteCategoryAsync(categoryId);
        return NoContent();
    }
}
