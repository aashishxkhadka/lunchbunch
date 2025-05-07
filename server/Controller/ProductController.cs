using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OneBottle.Data;
using OneBottle.DTOs.Product;
using OneBottle.Interfaces;
using OneBottle.Mappers;


namespace OneBottle.Controller
{
    [Route("api/product")]
    [ApiController]

    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IProductRepository _productRepo;
        public ProductController(AppDbContext context, IProductRepository productRepo)
        {
            _context = context;
            _productRepo = productRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProductsAsync()
        {
            var products = await _productRepo.GetAllProductsAsync();
            var productsReturnedFromDb = products.Select(products => products.ToProductDTO());
            return Ok(products);
        }


        [HttpGet]
        [Route("category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategoryId(Guid categoryId)
        {
            var products = await _productRepo.GetProductsByCategoryIdAsync(categoryId);
            var productsReturnedFromDb = products.Select(products => products.ToProductDTO());
            return Ok(productsReturnedFromDb);
        }

        [HttpGet]
        [Route("{productId}")]
        public async Task<IActionResult> GetById(Guid productId)
        {
            var product = await _productRepo.GetProductByIdAsync(productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDTO productDTO)
        {
            var productModel = ProductMappers.ToProductModelFromCreateProductDTO(productDTO);
            await _productRepo.AddProductAsync(productModel);
            return CreatedAtAction(nameof(GetById), new { productId = productModel.ProductId }, productModel.ToProductDTO());
        }

        [HttpPut]
        [Route("{productId}")]
        public async Task<IActionResult> UpdateProduct(Guid productId, [FromBody] UpdateProductDTO productDto)
        {
            var productModel = await _context.Products.FirstOrDefaultAsync(product => product.ProductId == productId);
            if (productModel == null)
            {
                return NotFound();
            }

            var productToUpdate = ProductMappers.ToProductModelFromUpdateProductDTO(productModel, productDto);
            await _productRepo.UpdateProductAsync(productToUpdate);
            return Ok(productModel.ToProductDTO());
        }

        [HttpDelete]
        [Route("{productId:guid}")]
        public async Task<IActionResult> DeleteProduct(Guid productId)
        {
            var product = await _productRepo.GetProductByIdAsync(productId);
            if (product == null)
            {
                return NotFound();
            }
            await _productRepo.DeleteProductAsync(productId);
            return NoContent();
        }
    }
}
