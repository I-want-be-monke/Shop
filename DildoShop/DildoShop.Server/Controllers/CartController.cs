using DildoShop.Server.Models;
using DildoShop.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace DildoShop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public ActionResult<Cart> GetCart()
        {
            var cart = _cartService.GetCart();
            return Ok(cart);
        }

        [HttpPost("add")]
        public ActionResult AddToCart([FromBody] CartItem cartItem)
        {
            _cartService.AddToCart(cartItem);
            return Ok(_cartService.GetCart());
        }

        [HttpDelete("remove/{productId}")]
        public ActionResult RemoveFromCart(int productId)
        {
            _cartService.RemoveFromCart(productId);
            return Ok(_cartService.GetCart());
        }
    }
}
