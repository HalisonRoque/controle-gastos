using System.Net;
using webApi.Exceptions;

namespace webApi.Features.Categories.Error
{
    public class CategoryNotFoundException : BaseException
    {
        public CategoryNotFoundException()
            : base("Categoria não encontrada", HttpStatusCode.NotFound) { }
    }
}
