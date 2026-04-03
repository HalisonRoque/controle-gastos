using webApi.Features.Categories.Entity;
using webApi.Features.Persons.Entity;

namespace webApi.Features.Transactions.Entity
{
    public class Transaction
    {
        public int id { get; set; }
        public string description { get; set; }
        public string type { get; set; }
        public string category { get; set; }

        // CHAVE ESTRANGEIRA
        // Relacionamento com Person (1:N)
        // Uma pessoa pode ter várias transações
        public int id_person { get; set; }
        public Person person { get; set; }
    }
}
