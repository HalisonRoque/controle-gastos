namespace webApi.Features.Transactions.DTOs
{
    public class PersonBalanceResponseDto
    {
        public List<PersonBalanceDto> Data { get; set; } = new();

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo => TotalReceitas - TotalDespesas;

        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
    }
}
