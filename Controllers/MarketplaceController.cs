using Autoteenindus.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Autoteenindus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketplaceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MarketplaceController(AppDbContext context)
        {
            _context = context;
        }

        // Получить все объявления
        [HttpGet]
        public ActionResult<IEnumerable<MarketplaceCar>> GetCars()
        {
            var cars = _context.MarketplaceCars.ToList();
            return Ok(cars);
        }

        // Получить детали конкретного автомобиля по ID
        [HttpGet("{id}")]
        public async Task<ActionResult<MarketplaceCar>> GetCarDetails(int id)
        {
            var car = await _context.MarketplaceCars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }

        [HttpPost]
        public async Task<IActionResult> AddCar([FromForm] MarketplaceCar car, [FromForm] List<IFormFile> files)

        {
            if (files != null && files.Count > 0)
            {
                List<string> fileUrls = new List<string>();

                foreach (var file in files)
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", file.FileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    fileUrls.Add("/uploads/" + file.FileName);
                }

                car.PhotoUrl = string.Join(",", fileUrls);
            }

            // Сохраняем объявление в базе данных
            _context.MarketplaceCars.Add(car);
            await _context.SaveChangesAsync();
            return Ok();
        }






        // Удалить объявление
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.MarketplaceCars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            _context.MarketplaceCars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

