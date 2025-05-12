using Autoteenindus.models;

namespace Autoteenindus.models
{
    public class MarketplaceCar
    {
        public int Id { get; set; }
        public string CarType { get; set; }
        public string BodyType { get; set; }
        public int FirstRegistration { get; set; }
        public string Engine { get; set; }
        public string Fuel { get; set; }
        public int Mileage { get; set; }
        public string Drivetrain { get; set; }
        public string Gearbox { get; set; }
        public string Color { get; set; }
        public string RegNumber { get; set; }
        public int VinCode { get; set; }
        public decimal Price { get; set; }
        public bool IsVatIncluded { get; set; }
        public string UserEmail { get; set; }
        public string? PhotoUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Связь с таблицей Users
        
        
    }
}

