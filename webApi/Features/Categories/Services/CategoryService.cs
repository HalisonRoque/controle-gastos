using webApi.Features.Categories.DTOs;
using webApi.Features.Categories.Entities;
using webApi.Features.Categories.Error;
using webApi.Features.Categories.Repositories;

namespace webApi.Features.Categories.Services
{
    /*Service de categorias*/
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }

        /*Função para listagem de todas as categorias cadastradas.
        Podendo receber um filtro para finalidade
        */
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

        /*Função para criação de categoria recebendo dados em um payload de CreateCategoryDto
        onde faz a tipagem de dados atrávez do DTO ResponseCategoryDto
        */
        public async Task<ResponseCategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
        {
            var category = new Category
            {
                Description = dto.Description,
                Purpose = dto.Purpose?.Trim() ?? string.Empty,
            };

            var created = await _repository.CreateCategoryAsync(category);

            return new ResponseCategoryDto
            {
                Id = created.Id,
                Description = created.Description,
                Purpose = created.Purpose,
            };
        }

        /*Função para busca da categoria por seu id, onde retorna apenas o registro do id informado*/
        public async Task<ResponseCategoryDto> GetCategoryByIdAsync(int id)
        {
            var category = await _repository.GetCategoryByIdAsync(id);

            if (category == null)
                throw new CategoryNotFoundException();

            return new ResponseCategoryDto
            {
                Id = category.Id,
                Description = category.Description,
                Purpose = category.Purpose,
            };
        }
    }
}
