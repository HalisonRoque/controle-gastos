using webApi.Features.Persons.DTOs;

namespace webApi.Features.Persons.Services
{
    /*Declaração de inteface para as funções usadas no service, onde recebe os mesmo dados*/
    public interface IPersonService
    {
        Task<List<ResponsePersonDto>> GetAllAsync(string? name);
        Task<ResponsePersonDto> GetByIdAsync(int id);
        Task<ResponsePersonDto> CreateAsync(CreatePersonDto dto);
        Task UpdateAsync(int id, UpdatePersonDto dto);
        Task DeleteAsync(int id);
    }
}
