namespace webApi.Features.Transactions.DTOs
{
    public class PersonBalanceResponseDto
    {
        public List<PersonBalanceDto> Data { get; set; } = new();

        public decimal TotalIncome { get; set; }

        public decimal TotalExpenses { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

        public decimal TotalItem { get; set; }

        public decimal Balance { get; set; }
    }
}
