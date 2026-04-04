using webApi.Features.Categories.Entities;

namespace webApi.Features.Categories.Services
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<Category> CreateCategoryAsync(Category category);
    }
}
