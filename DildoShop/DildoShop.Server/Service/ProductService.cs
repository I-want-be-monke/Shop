using DildoShop.Server.DataBase;
using DildoShop.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DildoShop.Server.Service
{
    public interface IProductService
    {
        Task<List<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> CreateProductAsync(Product product);
    }
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

           
            if (string.IsNullOrEmpty(product.Name) ||
                string.IsNullOrEmpty(product.Image) ||
                string.IsNullOrEmpty(product.Category) ||
                string.IsNullOrEmpty(product.Description))
            {
                throw new ArgumentException("All fields are required.");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
