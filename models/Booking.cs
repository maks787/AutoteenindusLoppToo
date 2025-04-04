using Autoteenindus.models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

public class Booking
{
    public int Id { get; set; }

    [Column("user_id")]  // Указываем имя поля в базе данных
    public int UserId { get; set; }  // Внешний ключ на User

    [Column("phone_number")]  // Указываем имя поля в базе данных
    public string PhoneNumber { get; set; }

    [Column("name")]  // Указываем имя поля в базе данных
    public string Name { get; set; }

    [Column("time")]  // Указываем имя поля в базе данных
    public DateTime Time { get; set; }

    [Column("service_id")]  // Указываем имя поля в базе данных
    public int ServiceId { get; set; }  // Внешний ключ на Service

    [Column("car_number")]  // Указываем имя поля в базе данных
    public string CarNumber { get; set; }

    public User User { get; set; }  // Навигационное свойство для User
    public Service Service { get; set; }  // Навигационное свойство для Service
}
