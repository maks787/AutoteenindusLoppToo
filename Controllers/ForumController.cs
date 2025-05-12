using Autoteenindus.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ForumController : ControllerBase
{
    private readonly AppDbContext _context;

    public ForumController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ForumMessage>>> GetMessages()
    {
        return await _context.ForumMessages.OrderByDescending(m => m.CreatedAt).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<ForumMessage>> PostMessage(ForumMessage message)
    {
        message.CreatedAt = DateTime.Now;
        _context.ForumMessages.Add(message);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMessages), new { id = message.Id }, message);
    }
}
