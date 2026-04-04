using webApi.Features.Persons.Entities;

namespace webApi.Features.Persons.Repositories
{
    public interface IPersonRepository
    {
        Task<List<Person>> GetAllAsync();
        Task<Person?> GetByIdAsync(int id);
        Task<Person> CreateAsync(Person person);
        Task UpdateAsync(Person person);
        Task DeleteAsync(Person person);
    }
}
