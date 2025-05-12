using Autoteenindus.models;
namespace Autoteenindus.models;

public class CarReview
{
    public int Id { get; set; }
    public string CarId { get; set; }
    public string UserEmail { get; set; }
    public int Year { get; set; }
    public string BodyType { get; set; }
    public string Transmission { get; set; }
    public string DriveType { get; set; }
    public string Generation { get; set; }
    public string Engine { get; set; }
    public double HighwayConsumption { get; set; }
    public double CityConsumption { get; set; }
    public int PurchaseYear { get; set; }
    public int Mileage { get; set; }
    public string? PhotoUrl { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}

