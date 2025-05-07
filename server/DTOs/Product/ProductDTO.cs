using OneBottle.Models;

namespace OneBottle.DTOs.Product
{
    public class ProductDTO
    {

        public Guid ProductId { get; set; }
        public required string Name { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Brand { get; set; } = string.Empty;
        public int Volume { get; set; }
        public decimal ABV { get; set; }
        public Guid? CategoryId { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
    }
}
