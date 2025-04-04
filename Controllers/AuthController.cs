using Autoteenindus.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    // Регистрация
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        try
        {
            // Проверяем, существует ли уже такой email
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
                return BadRequest(new { message = "Email уже зарегистрирован." });

            // Создаем нового пользователя
            var user = new User
            {
                Email = model.Email,
                Password = HashPassword(model.Password),
                Role = "client"
            };

            // Сохраняем пользователя в базе данных
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Возвращаем успех в формате JSON
            return Ok(new { message = "Регистрация успешна." });
        }
        catch (Exception ex)
        {
            // Логируем ошибку на сервере
            Console.WriteLine($"Ошибка при регистрации: {ex.Message}");
            return StatusCode(500, new { message = "Ошибка сервера. Попробуйте позже." });
        }
    }



    // Логин
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null || user.Password != HashPassword(model.Password))
            {
                return Unauthorized(new { message = "Неверный email или пароль." });
            }

            HttpContext.Session.SetString("UserEmail", user.Email);
            HttpContext.Session.SetString("UserRole", user.Role);

            return Ok(new { message = "Вход выполнен успешно." });  // Возвращаем JSON
        }
        catch (Exception ex)
        {
            // Логируем ошибку на сервере
            Console.WriteLine($"Ошибка при логине: {ex.Message}");
            return StatusCode(500, new { message = "Ошибка сервера. Попробуйте позже." });  // Возвращаем JSON
        }
    }


    // Проверка авторизации
    [HttpGet("check")]
    public IActionResult CheckAuth()
    {
        var email = HttpContext.Session.GetString("UserEmail");
        if (string.IsNullOrEmpty(email))
            return Unauthorized("Вы не авторизованы.");

        return Ok($"Вы вошли как {email}");
    }

    // Выход
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return Ok("Вы вышли из системы.");
    }

    // Метод хэширования пароля
    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
    }
}
