/*DTO destinado para criação de pessoas*/
namespace webApi.Features.Persons.DTOs
{
    public class CreatePersonDto
    {
        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }
    }
}
