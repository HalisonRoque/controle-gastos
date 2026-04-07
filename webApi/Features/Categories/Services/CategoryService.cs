using webApi.Features.Categories.DTOs;
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

        public async Task<List<ResponseCategoryDto>> GetAllCategoryAsync(string? purpose)
        {
            var categories = await _repository.GetAllCategoryAsync();
            if (!string.IsNullOrWhiteSpace(purpose))
            {
                categories = categories
                    .Where(p => p.Purpose.Contains(purpose, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }
            return categories
                .Select(c => new ResponseCategoryDto
                {
                    Id = c.Id,
                    Description = c.Description,
                    Purpose = c.Purpose,
                })
                .ToList();
        }

        public async Task<ResponseCategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
        {
            var validPurposes = new[] { "Receita", "Despesa", "Ambas" };

            var input = dto.Purpose?.Trim();

            var match = validPurposes.FirstOrDefault(c =>
                c.Equals(input, StringComparison.OrdinalIgnoreCase)
            );

            if (match == null)
                throw new CategoryInvalidPurposeException();

            dto.Purpose = match;

            var category = new Category { Description = dto.Description, Purpose = dto.Purpose };

            var created = await _repository.CreateCategoryAsync(category);

            return new ResponseCategoryDto
            {
                Id = created.Id,
                Description = created.Description,
                Purpose = created.Purpose,
            };
        }
    }
}
