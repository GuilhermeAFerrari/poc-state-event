var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://127.0.0.1:5500")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors();

app.MapGet("/weatherforecast", () =>
{
    var forecast = new[]
    {
        new { value = "option1", Summary = "Summary for Option 1" },
        new { value = "option2", Summary = "Summary for Option 2" },
        new { value = "option3", Summary = "Summary for Option 3" }
    };
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();
