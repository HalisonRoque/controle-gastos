namespace webApi.Features.Categories.DTOs
{
    public class ResponseCategoryDto
    {
        public int Id { get; set; }

        public string Description { get; set; } = string.Empty;

        public string Purpose { get; set; } = string.Empty;
    }
}
