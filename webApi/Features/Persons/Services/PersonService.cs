using webApi.Features.Persons.DTOs;
using webApi.Features.Persons.Entities;
using webApi.Features.Persons.Repositories;
using webApi.Features.Persons.Services;

namespace webApi.Features.Persons.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _repository;

        public PersonService(IPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ResponsePersonDto>> GetAllAsync()
        {
            var persons = await _repository.GetAllAsync();

            return persons
                .Select(p => new ResponsePersonDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Age = p.Age,
                })
                .ToList();
        }

        public async Task<ResponsePersonDto> GetByIdAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                throw new Exception("Person not found");

            return new ResponsePersonDto
            {
                Id = person.Id,
                Name = person.Name,
                Age = person.Age,
            };
        }

        public async Task<ResponsePersonDto> CreateAsync(CreatePersonDto dto)
        {
            // Regra simples de validação
            if (dto.Age <= 0)
                throw new Exception("Age must be greater than zero");

            var person = new Person { Name = dto.Name, Age = dto.Age };

            var created = await _repository.CreateAsync(person);

            return new ResponsePersonDto
            {
                Id = created.Id,
                Name = created.Name,
                Age = created.Age,
            };
        }

        public async Task UpdateAsync(int id, UpdatePersonDto dto)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                throw new Exception("Person not found");

            person.Name = dto.Name;
            person.Age = dto.Age;

            await _repository.UpdateAsync(person);
        }

        public async Task DeleteAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                throw new Exception("Person not found");

            await _repository.DeleteAsync(person);
        }
    }
}
