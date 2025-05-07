namespace OneBottle.Models
{
	public class Product
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
		public Category? Category { get; set; }
		public decimal Price { get; set; }
		public int StockQuantity { get; set; }
		public int AgeRestriction { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }

		public List<Feedback> Feedbacks { get; set; } = new List<Feedback>();
	}
}


