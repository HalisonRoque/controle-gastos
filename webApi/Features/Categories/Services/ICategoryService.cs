using webApi.Features.Categories.DTOs;

namespace webApi.Features.Categories.Services
{
    public interface ICategoryService
    {
        Task<List<ResponseCategoryDto>> GetAllCategoryAsync(string? purpose);
        Task<ResponseCategoryDto> CreateCategoryAsync(CreateCategoryDto dto);
    }
}
