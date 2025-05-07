using System.ComponentModel.DataAnnotations;

namespace OneBottle.DTOs.Product
{
    public class CreateProductDTO
    {
        [Required]
        public Guid ProductId { get; set; }
        [Required,  MinLength(3, ErrorMessage = "Name must be between 3 and 50 characters")]
        public required string Name { get; set; }
        [Required, Url, DataType(DataType.Url, ErrorMessage = "ImageUrl must be {1}")]
        public string ImageUrl { get; set; } = string.Empty;
        [Required , MinLength(10, ErrorMessage = "Description must be between 10 and 250 characters")]
        public string Description { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        [Required]
        public int Volume { get; set; }

        [Required]
        public decimal ABV { get; set; }
        public Guid? CategoryId { get; set; }
        [Required]
        public decimal Price { get; set; } = 10;
        [Required, Range(0, int.MaxValue, ErrorMessage = "StockQuantity must be greater than 0")]
        public int StockQuantity { get; set; } = 1;
    }

}
