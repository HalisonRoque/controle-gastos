using System.Net;

namespace webApi.Exceptions
{
    public abstract class BaseException : Exception
    {
        public int StatusCode { get; }

        protected BaseException(string message, HttpStatusCode statusCode)
            : base(message)
        {
            StatusCode = (int)statusCode;
        }
    }
}
