using webApi.Features.Categories.Error;
using webApi.Features.Categories.Repositories;
using webApi.Features.Persons.Error;
using webApi.Features.Persons.Repositories;
using webApi.Features.Transactions.DTOs;
using webApi.Features.Transactions.Error;
using webApi.Features.Transactions.Repositories;
using TransactionEntity = webApi.Features.Transactions.Entities.Transaction;

namespace webApi.Features.Transactions.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;
        private readonly IPersonRepository _personRepository;
        private readonly ICategoryRepository _categoryRepository;

        public TransactionService(
            ITransactionRepository repository,
            IPersonRepository personRepository,
            ICategoryRepository categoryRepository
        )
        {
            _repository = repository;
            _personRepository = personRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<List<ResponseTransactionDto>> GetAllAsync(string? person)
        {
            var transactions = await _repository.GetAllAsync();

            if (!string.IsNullOrWhiteSpace(person))
            {
                transactions = transactions
                    .Where(t => t.Person.Name.ToLower().Contains(person.ToLower()))
                    .ToList();
            }

            return transactions
                .Select(t => new ResponseTransactionDto
                {
                    Id = t.Id,
                    Description = t.Description,
                    Type = t.Type,
                    Value = t.Value,
                    Person = t.Person.Name,
                    PersonId = t.PersonId,
                    Category = t.Category,
                })
                .ToList();
        }

        public async Task<ResponseTransactionDto> CreateAsync(CreateTransactionDto dto)
        {
            var person = await _personRepository.GetByIdAsync(dto.PersonId);

            if (person == null)
                throw new PersonNotFoundException();

            if (person.Age < 18 && dto.Type.ToLower() == "receita")
                throw new UnderagePersonExpenseOnlyException();

            var category = await _categoryRepository.GetCategoryByIdAsync(dto.CategoryId);

            if (category == null)
                throw new CategoryNotFoundException();

            var validTypes = new[] { "Receita", "Despesa" };

            var match = validTypes.FirstOrDefault(t =>
                t.Equals(dto.Type, StringComparison.OrdinalIgnoreCase)
            );

            var transaction = new TransactionEntity
            {
                Description = dto.Description,
                Type = match!,
                Value = dto.Value,
                Category = category.Purpose,
                PersonId = dto.PersonId,
            };

            var created = await _repository.CreateAsync(transaction);

            return new ResponseTransactionDto
            {
                Id = created.Id,
                Description = created.Description,
                Type = created.Type,
                Value = created.Value,
                Category = created.Category,
                Person = person.Name,
                PersonId = created.PersonId,
            };
        }

        public async Task<PersonBalanceResponseDto> GetBalanceAsync(
            int? personId,
            int page,
            int pageSize
        )
        {
            page = page < 1 ? 1 : page;
            pageSize = pageSize < 1 ? 10 : pageSize;

            var persons = await _personRepository.GetAllAsync();
            var transactions = await _repository.GetAllAsync();

            if (personId.HasValue)
                persons = persons.Where(p => p.Id == personId.Value).ToList();

            var grouped = persons
                .Select(p => new PersonBalanceDto
                {
                    PersonId = p.Id,
                    PersonName = p.Name,

                    TotalIncome = transactions
                        .Where(t =>
                            t.PersonId == p.Id
                            && t.Type.Equals("Receita", StringComparison.OrdinalIgnoreCase)
                        )
                        .Sum(t => t.Value),

                    TotalExpenses = transactions
                        .Where(t =>
                            t.PersonId == p.Id
                            && t.Type.Equals("Despesa", StringComparison.OrdinalIgnoreCase)
                        )
                        .Sum(t => t.Value),
                })
                .ToList();

            var totalItem = grouped.Count;

            var paginated = grouped.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return new PersonBalanceResponseDto
            {
                Data = paginated,
                TotalIncome = grouped.Sum(x => x.TotalIncome),
                TotalExpenses = grouped.Sum(x => x.TotalExpenses),
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItem,
            };
        }

        public async Task<CategoryBalanceResponseDto> GetCategoryBalanceAsync()
        {
            var transactions = await _repository.GetAllAsync();

            var grouped = transactions
                .GroupBy(t => t.Category)
                .Select(g => new CategoryBalanceDto
                {
                    CategoryDescription = g.Key,

                    TotalReceitas = g.Where(t =>
                            t.Type.Equals("Receita", StringComparison.OrdinalIgnoreCase)
                        )
                        .Sum(t => t.Value),

                    TotalDespesas = g.Where(t =>
                            t.Type.Equals("Despesa", StringComparison.OrdinalIgnoreCase)
                        )
                        .Sum(t => t.Value),
                })
                .ToList();

            return new CategoryBalanceResponseDto
            {
                Data = grouped,
                TotalReceitas = grouped.Sum(x => x.TotalReceitas),
                TotalDespesas = grouped.Sum(x => x.TotalDespesas),
            };
        }
    }
}
