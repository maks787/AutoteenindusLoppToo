using Autoteenindus.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
[Route("api/[controller]")]
[ApiController]
public class CarReviewsController : ControllerBase
{
    private readonly AppDbContext _context;

    public CarReviewsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> AddReview([FromForm] CarReview reviewDto, IFormFile photo)
    {
        string photoUrl = null;

        if (photo != null && photo.Length > 0)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(photo.FileName)}";
            var filePath = Path.Combine("wwwroot/uploads", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            photoUrl = $"/uploads/{fileName}";
        }

        var review = new CarReview
        {
            CarId = reviewDto.CarId,
            UserEmail = reviewDto.UserEmail,
            Year = reviewDto.Year,
            BodyType = reviewDto.BodyType,
            Transmission = reviewDto.Transmission,
            DriveType = reviewDto.DriveType,
            Generation = reviewDto.Generation,
            Engine = reviewDto.Engine,
            HighwayConsumption = reviewDto.HighwayConsumption,
            CityConsumption = reviewDto.CityConsumption,
            PurchaseYear = reviewDto.PurchaseYear,
            Mileage = reviewDto.Mileage,
            PhotoUrl = photoUrl,
            Comment = reviewDto.Comment
        };

        _context.CarReviews.Add(review);
        await _context.SaveChangesAsync();

        return Ok(review);
    }


    [HttpGet]
    public async Task<IActionResult> GetAllReviews()
    {
        var reviews = await _context.CarReviews.ToListAsync();
        return Ok(reviews);
    }
}
