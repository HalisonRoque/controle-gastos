/*DTO destinado para retorno de pessoas*/
namespace webApi.Features.Persons.DTOs
{
    public class ResponsePersonDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }
    }
}
