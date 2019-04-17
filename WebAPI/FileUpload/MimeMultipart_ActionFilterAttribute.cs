using System.Web.Http;
using System.Net.Http;
using System.Net;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;

namespace WebAPI.FileUpload
{
    public class MimeMultipart : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(
                    new HttpResponseMessage(
                        HttpStatusCode.UnsupportedMediaType)
                );
            }
        }
    }
}
