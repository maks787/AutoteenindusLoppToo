using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Autoteenindus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseConnectionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DatabaseConnectionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/DatabaseConnection/check
        [HttpGet("check")]
        public async Task<IActionResult> CheckDatabaseConnection()
        {
            try
            {
                // Try to query any table, here we use Users for example
                var testConnection = await _context.Users.FirstOrDefaultAsync();

                if (testConnection == null)
                {
                    return Ok("Database connection is successful, but the Users table is empty.");
                }

                return Ok("Database connection is successful.");
            }
            catch (Exception ex)
            {
                // If there is an exception, return an error message
                return StatusCode(500, $"Database connection failed: {ex.Message}");
            }
        }
    }
}
