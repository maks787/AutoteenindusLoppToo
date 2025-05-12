using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// ������
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// �������������� ����� ����
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/api/AuthController/login";
        options.LogoutPath = "/api/AuthController/logout";
        options.AccessDeniedPath = "/api/Auth/denied";
    });

// �����������
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ����������� ����
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// CORS ��������
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // ��������� URL ���������
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // ����� ��� ������ � ������
    });
});

// ������� ����������
var app = builder.Build();

// ���������� ������ �� ��������
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler(errorApp =>
    {
        errorApp.Run(async context =>
        {
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var error = new
            {
                StatusCode = context.Response.StatusCode,
                Message = "An unexpected error occurred."
            };

            await context.Response.WriteAsJsonAsync(error);
        });
    });
}

app.UseHttpsRedirection();

// ��������� CORS
app.UseCors("AllowFrontend");

app.UseRouting();

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
