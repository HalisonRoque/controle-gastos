using System.ComponentModel.DataAnnotations;
using webApi.Features.Transactions.Entities;

/*Entidade que representa a tabela no banco de dados*/
namespace webApi.Features.Categories.Entities
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(128)]
        public string Purpose { get; set; } = string.Empty;
    }
}
