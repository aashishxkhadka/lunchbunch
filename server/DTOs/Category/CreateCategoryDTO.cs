using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Category
{
    public class CreateCategoryDTO
    {

        public Guid CategoryId { get; set; }
        [Required, MaxLength(50, ErrorMessage = "Name must be less than 50 characters")]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(1500, ErrorMessage = "Description must be less than 1500 characters")]
        public string Description { get; set; } = string.Empty;

    }
}