using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using OneBottle.Data;
using OneBottle.DTOs.Cart;
using OneBottle.Interfaces;
using OneBottle.Mappers;

namespace CartController
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ICartRepository _cartRepository;
        public CartController(AppDbContext context, ICartRepository cartRepository)
        {
            _context = context;
            _cartRepository = cartRepository;

        }
        [HttpGet]
        public async Task<IActionResult> GetAllCarts()
        {
            var carts = await _cartRepository.GetAllCartsAsync();
            // return Ok(carts);
            return Ok(carts.Select(c => CartMapper.ToCartDTO(c)));
        }
        [HttpGet("{cartId:guid}")]
        public async Task<IActionResult> GetCartById(Guid cartId)
        {
            var cart = await _cartRepository.GetCartByIdAsync(cartId);
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(CartMapper.ToCartDTO(cart));
        }


        [HttpGet("user/{userId:guid}")]
        public async Task<IActionResult> GetCartsByUserId(Guid userId)
        {
            var carts = await _cartRepository.GetCartsByUserIdAsync(userId);
            if (carts == null)
            {
                return NotFound();
            }
            return Ok(carts.Select(c => CartMapper.ToCartDTO(c)));
        }


        [HttpPost]
        public async Task<IActionResult> AddCartItem([FromBody] CreateCartDto cartItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _cartRepository.AddCartItemAsync(CartMapper.ToCartModel(cartItem));

            return CreatedAtAction(nameof(GetCartById), new { cartId = cartItem.CartId }, cartItem);
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteCartItem(Guid cartId)
        {
            var cart = await _cartRepository.GetCartByIdAsync(cartId);
            if (cart == null)
            {
                return NotFound();
            }
            await _cartRepository.DeleteCartItemAsync(cartId);
            return NoContent();
        }
    }
}