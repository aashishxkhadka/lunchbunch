using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Category
{
    public class CategoryDTO 
    {
        public Guid CategoryId { get; set; }
        [Required, MaxLength(50, ErrorMessage = "Name must be less than 50 characters")]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(150, ErrorMessage = "Description must be less than 150 characters")]
        public string Description { get; set; } = string.Empty;

    }
}