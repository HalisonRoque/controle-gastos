using webApi.Features.Categories.Entities;
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
            // 🔥 Validação de regra de negócio
            var validPurposes = new[] { "Expense", "Income", "Both" };

            if (!validPurposes.Contains(category.Purpose))
                throw new Exception("Invalid purpose. Use: Expense, Income or Both");

            if (string.IsNullOrWhiteSpace(category.Description))
                throw new Exception("Description is required");

            return await _repository.CreateCategoryAsync(category);
        }
    }
}
