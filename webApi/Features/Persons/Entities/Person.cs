using System.ComponentModel.DataAnnotations;
using TransactionEntity = webApi.Features.Transactions.Entities.Transaction;

namespace webApi.Features.Persons.Entities
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Age { get; set; }

        public List<TransactionEntity> Transactions { get; set; } = new();
    }
}
