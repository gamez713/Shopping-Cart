using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using storeAPI.Data;
using storeAPI.Models;

namespace storeAPI.Controllers
{
    // This attribute sets the base route to: /api/products
    [Route("api/[controller]")]
    [ApiController] // Marks this class as a Web API controller
    public class ProductsController : ControllerBase
    {
        // Dependency injection of the database context
        private readonly AppDbContext _context;

        // Constructor that receives the AppDbContext instance
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // Handles HTTP GET requests to /api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            // Fetch all products from the database asynchronously
            // Converts them to a list and returns them as JSON
            return await _context.Products.ToListAsync();
        }
    }
}
