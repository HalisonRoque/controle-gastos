using webApi.Features.Categories.Entities;

namespace webApi.Features.Categories.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<Category> CreateCategoryAsync(Category category);
    }
}
