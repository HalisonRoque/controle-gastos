using System.ComponentModel.DataAnnotations;
using webApi.Features.Categories.Entities;
using webApi.Features.Persons.Entities;

namespace webApi.Features.Transactions.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal Value { get; set; }

        [Required]
        public string Type { get; set; } = string.Empty;

        // CHAVE ESTRANGEIRA
        // Relacionamento com Person (1:N)
        // Uma pessoa pode ter várias transações
        [Required]
        public int PersonId { get; set; }
        public Person Person { get; set; } = null!;

        //CHAVE ESTRANGEIRA
        // Relacionamento com Category (1:1)
        // Uma transação pode ter apenas uma categoria
        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}
