using webApi.Features.Categories.DTOs;

namespace webApi.Features.Categories.Services
{
    /*Declaração de inteface para as funções usadas no service, onde recebe os mesmo dados*/
    public interface ICategoryService
    {
        Task<List<ResponseCategoryDto>> GetAllCategoryAsync(string? purpose);
        Task<ResponseCategoryDto> CreateCategoryAsync(CreateCategoryDto dto);
        Task<ResponseCategoryDto> GetCategoryByIdAsync(int id);
    }
}
