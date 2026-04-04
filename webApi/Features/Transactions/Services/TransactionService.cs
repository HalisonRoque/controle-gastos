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
    }
}
