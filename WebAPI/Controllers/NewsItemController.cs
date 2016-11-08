using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.UI.WebControls;
using WebAPI.Models;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;


namespace WebAPI.Controllers
{
    public class NewsItemController : ApiController
    {

        private static IQueryable<NewsItem> QueryNewsItem()
        {
            PenOCDataContext db = new PenOCDataContext();

            return (from newsItem in db.tblNews
                    select new NewsItem
                    {
                        id = newsItem.idNews,
                        date = newsItem.dteDate,
                        title = newsItem.strTitle,
                        news = newsItem.strNews
                    }).OrderByDescending(newsItem => newsItem.date);
        }

        //---------------------------------------------------------------------------------
        [HttpGet]
        [Route("newsItems")]
        public IHttpActionResult GetNewsItems(int? id = null, DateTime? dateFrom = null, DateTime? dateTo = null)
        {
            IQueryable<NewsItem> queryNewsItem;

            queryNewsItem = QueryNewsItem();

            if (id > 0) { queryNewsItem = queryNewsItem.Where(@newsItem => @newsItem.id == id); }
            if (dateFrom != null) { queryNewsItem = queryNewsItem.Where(@newsItem => @newsItem.date >= dateFrom); }
            if (dateTo != null) { queryNewsItem = queryNewsItem.Where(@newsItem => @newsItem.date <= dateTo); }

            return Ok(queryNewsItem);
        }

        //---------------------------------------------------------------------------------
        [HttpPost]
        [Route("newsItems")]
        public IHttpActionResult InsertNewsItem(NewsItem newsItem)
        {
            PenOCDataContext db = new PenOCDataContext();

            tblNews newsItemRecord = new tblNews
            {
                dteDate = newsItem.date,
                strTitle = newsItem.title,
                strNews = newsItem.news
            };

            db.tblNews.InsertOnSubmit(newsItemRecord);
            db.SubmitChanges();

            newsItem.id = newsItemRecord.idNews;

            return Ok(newsItem);
        }

        //---------------------------------------------------------------------------------
        [HttpPut]
        [Route("newsItems")]
        public IHttpActionResult UpdateNewsItem(NewsItem newsItem)
        {
            PenOCDataContext db = new PenOCDataContext();

            tblNews newsItemRecord = db.tblNews.Single(n => n.idNews == newsItem.id);

            newsItemRecord.dteDate = newsItem.date;
            newsItemRecord.strTitle = newsItem.title;
            newsItemRecord.strNews = newsItem.news;

            db.SubmitChanges();

            return Ok(newsItem);
        }

        //---------------------------------------------------------------------------------
        [FileUpload.MimeMultipart]
        [HttpPost]
        [Route("newsItems/images")]
        public async Task<FileUpload.FileUploadResult> SaveFile()
        {
            try
            {
                var path = "~/../Images/news";
                var uploadPath = System.Web.HttpContext.Current.Server.MapPath(path);
                var multipartFormDataStreamProvider = new FileUpload.UploadMultipartFormProvider(uploadPath);

                // Read the MIME multipart asynchronously 
                await Request.Content.ReadAsMultipartAsync(multipartFormDataStreamProvider);

                string _localFileName = multipartFormDataStreamProvider
                    .FileData.Select(multiPartData => multiPartData.LocalFileName).FirstOrDefault();

                // Create response
                return new FileUpload.FileUploadResult
                {
                    LocalFilePath = _localFileName,
                    FileName = Path.GetFileName(_localFileName),
                    FileLength = new FileInfo(_localFileName).Length,
                    Url = "images/news/" + Path.GetFileName(_localFileName)
                };
            }
            catch (Exception ex)
            {
                throw new Exception("doh!", ex);
            }
        }
    }
}


