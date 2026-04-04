using System.ComponentModel.DataAnnotations;
using webApi.Features.Transactions.Entities;

namespace webApi.Features.Persons.Entities
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Age { get; set; }

        public List<Transaction> Transactions { get; set; } = new();
    }
}
