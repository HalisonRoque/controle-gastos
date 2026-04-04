namespace webApi.Features.Transactions.DTOs
{
    public class CreateTransactionDto
    {
        public string Description { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public decimal Value { get; set; }

        public int PersonId { get; set; }

        public int CategoryId { get; set; }
    }
}
