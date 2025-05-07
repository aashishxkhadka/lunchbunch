using OneBottle.DTOs;
using OneBottle.DTOs.Category;
using OneBottle.Models;

namespace OneBottle.Mappers
{
    public static class CategoryMapper
    {
        public static CategoryDTO ToCategoryDto(this Category category)
        {
            return new CategoryDTO
            {
                CategoryId = category.CategoryId,
                Name = category.Name,
                Description = category.Description
            };
        }

        public static Category ToCategoryModel(CreateCategoryDTO categoryDto)
        {
            return new Category
            {
                CategoryId = Guid.NewGuid(),
                Name = categoryDto.Name,
                Description = categoryDto.Description
            };
        }

    }
}