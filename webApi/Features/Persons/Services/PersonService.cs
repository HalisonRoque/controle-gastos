using webApi.Features.Persons.DTOs;
using webApi.Features.Persons.Entities;
using webApi.Features.Persons.Error;
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

        /*Função para listagem de todas as pessoas cadastradas.
        Podendo receber um filtro para finalidade
        */
        public async Task<List<ResponsePersonDto>> GetAllAsync(string? name)
        {
            var persons = await _repository.GetAllAsync();
            if (!string.IsNullOrWhiteSpace(name))
            {
                persons = persons.Where(p => p.Name.ToLower().Contains(name.ToLower())).ToList();
            }

            return persons
                .Select(p => new ResponsePersonDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Age = p.Age,
                })
                .ToList();
        }

        /*Função para busca de pessoas por seu id, onde retorna apenas o registro do id informado*/
        public async Task<ResponsePersonDto> GetByIdAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                throw new PersonNotFoundException();

            return new ResponsePersonDto
            {
                Id = person.Id,
                Name = person.Name,
                Age = person.Age,
            };
        }

        /*Função para criação de pessoas recebendo dados em um payload de CreatePersonDto
         onde faz a tipagem de saida de dados atrávez do DTO ResponsePersonDto
        */
        public async Task<ResponsePersonDto> CreateAsync(CreatePersonDto dto)
        {
            var person = new Person { Name = dto.Name, Age = dto.Age };

            var created = await _repository.CreateAsync(person);

            return new ResponsePersonDto
            {
                Id = created.Id,
                Name = created.Name,
                Age = created.Age,
            };
        }

        /*Função para atualização de pessoa por seu id, onde retorna apenas o registro do id informado*/
        public async Task UpdateAsync(int id, UpdatePersonDto dto)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                throw new PersonNotFoundException();

            person.Name = dto.Name;
            person.Age = dto.Age;

            await _repository.UpdateAsync(person);
        }

        /*Função para deletar pessoar por seu id onde deleta o seu registro na base de dados*/
        public async Task DeleteAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                throw new PersonNotFoundException();

            await _repository.DeleteAsync(person);
        }
    }
}
