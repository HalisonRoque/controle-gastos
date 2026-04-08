namespace webApi.Features.Transactions.DTOs
{
    public class PersonBalanceResponseDto
    {
        public List<PersonBalanceDto> Data { get; set; } = new();

        public decimal TotalIncome { get; set; }

        public decimal TotalExpenses { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

        public int TotalItem { get; set; }

        public decimal Balance => TotalIncome - TotalExpenses;
    }
}
