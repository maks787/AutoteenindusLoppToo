public class ForumMessage
{
    public int Id { get; set; }
    public string AuthorEmail { get; set; }
    public string Message { get; set; }
    public DateTime CreatedAt { get; set; }
    public int? CarId { get; set; }
}
