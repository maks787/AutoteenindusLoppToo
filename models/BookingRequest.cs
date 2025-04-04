using Autoteenindus.models;
namespace Autoteenindus.models
{
    public class BookingRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Time { get; set; }
        public string CarNumber { get; set; }
    }
}
