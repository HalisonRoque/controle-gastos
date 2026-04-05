using webApi.Features.Persons.Error;
using webApi.Features.Persons.Repositories;
using webApi.Features.Transactions.DTOs;
using webApi.Features.Transactions.Entities;
using webApi.Features.Transactions.Repositories;

namespace webApi.Features.Transactions.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;
        private readonly IPersonRepository _personRepository;

        public TransactionService(
            ITransactionRepository repository,
            IPersonRepository personRepository
        )
        {
            _repository = repository;
            _personRepository = personRepository;
        }

        public async Task<List<ResponseTransactionDto>> GetAllAsync()
        {
            var transactions = await _repository.GetAllAsync();

            return transactions
                .Select(t => new ResponseTransactionDto
                {
                    Id = t.Id,
                    Description = t.Description,
                    Type = t.Type,
                    Value = t.Value,
                    PersonId = t.PersonId,
                    CategoryId = t.CategoryId,
                })
                .ToList();
        }

        public async Task<ResponseTransactionDto> CreateAsync(CreateTransactionDto dto)
        {
            var person = await _personRepository.GetByIdAsync(dto.PersonId);

            if (person == null)
                throw new PersonNotFoundException();

            var transaction = new Transaction
            {
                Description = dto.Description,
                Type = dto.Type,
                Value = dto.Value,
                PersonId = dto.PersonId,
                CategoryId = dto.CategoryId,
            };

            var created = await _repository.CreateAsync(transaction);

            return new ResponseTransactionDto
            {
                Id = created.Id,
                Description = created.Description,
                Type = created.Type,
                Value = created.Value,
                PersonId = created.PersonId,
                CategoryId = created.CategoryId,
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

            var transactions = await _repository.GetAllAsync();

            if (personId.HasValue)
                transactions = transactions.Where(t => t.PersonId == personId.Value).ToList();

            var grouped = transactions
                .GroupBy(t => new { t.PersonId, t.Person.Name })
                .Select(g => new PersonBalanceDto
                {
                    PersonId = g.Key.PersonId,
                    PersonName = g.Key.Name,

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

            var totalItems = grouped.Count;

            var paginated = grouped.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            var totalReceitas = grouped.Sum(x => x.TotalReceitas);
            var totalDespesas = grouped.Sum(x => x.TotalDespesas);

            return new PersonBalanceResponseDto
            {
                Data = paginated,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
            };
        }

        public async Task<CategoryBalanceResponseDto> GetCategoryBalanceAsync()
        {
            var transactions = await _repository.GetAllAsync();

            var grouped = transactions
                .GroupBy(t => new { t.CategoryId, t.Category.Description })
                .Select(g => new CategoryBalanceDto
                {
                    CategoryId = g.Key.CategoryId,
                    CategoryDescription = g.Key.Description,

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

            var totalReceitas = grouped.Sum(x => x.TotalReceitas);
            var totalDespesas = grouped.Sum(x => x.TotalDespesas);

            return new CategoryBalanceResponseDto
            {
                Data = grouped,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
            };
        }
    }
}
