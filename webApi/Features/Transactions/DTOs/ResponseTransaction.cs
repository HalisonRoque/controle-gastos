/*DTO destinado para retorno de transações*/
namespace webApi.Features.Transactions.DTOs
{
    public class ResponseTransactionDto
    {
        public int Id { get; set; }

        public string Description { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public decimal Value { get; set; }

        public int PersonId { get; set; }

        public string Person { get; set; } = string.Empty;
    }
}
