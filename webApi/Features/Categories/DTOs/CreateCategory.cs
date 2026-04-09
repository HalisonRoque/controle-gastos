/*DTO destinado para criação de categorias*/
namespace webApi.Features.Categories.DTOs
{
    public class CreateCategoryDto
    {
        public string Description { get; set; } = string.Empty;

        public string Purpose { get; set; } = string.Empty;
    }
}
