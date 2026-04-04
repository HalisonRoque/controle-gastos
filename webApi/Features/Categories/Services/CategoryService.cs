using webApi.Features.Categories.Entities;
using webApi.Features.Categories.Error;
using webApi.Features.Categories.Repositories;

namespace webApi.Features.Categories.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Category>> GetAllCategoryAsync()
        {
            return await _repository.GetAllCategoryAsync();
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            var validPurposes = new[] { "Receita", "Despesa", "Ambas" };

            var input = category.Purpose?.Trim();

            var match = validPurposes.FirstOrDefault(p =>
                p.Equals(input, StringComparison.OrdinalIgnoreCase)
            );

            if (match == null)
                throw new CategoryInvalidPurposeException();

            category.Purpose = match;

            return await _repository.CreateCategoryAsync(category);
        }
    }
}
