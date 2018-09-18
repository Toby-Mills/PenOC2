using System;
using System.Linq;
using System.Web.Http;
using WebAPI.Models;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using System.Web.Http.Cors;
using WebAPI.Filters;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class NewsItemController : ApiController
    {
        
        private static IQueryable<NewsItem> QueryNewsItem()
        {
            PenocEntities db = new PenocEntities();

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
        [Authorize]
        [JwtAuthentication]
        [Route("newsItems")]
        public IHttpActionResult InsertNewsItem(NewsItem newsItem)
        {
            PenocEntities db = new PenocEntities();

            tblNews newsItemRecord = new tblNews
            {
                dteDate = newsItem.date,
                strTitle = newsItem.title,
                strNews = newsItem.news
            };

            db.tblNews.Add(newsItemRecord);
            db.SaveChanges();

            newsItem.id = newsItemRecord.idNews;

            return Ok(newsItem);
        }

        //---------------------------------------------------------------------------------
        [HttpPut]
        [Authorize]
        [JwtAuthentication]
        [Route("newsItems")]
        public IHttpActionResult UpdateNewsItem(NewsItem newsItem)
        {
            PenocEntities db = new PenocEntities();

            tblNews newsItemRecord = db.tblNews.Single(n => n.idNews == newsItem.id);

            newsItemRecord.dteDate = newsItem.date;
            newsItemRecord.strTitle = newsItem.title;
            newsItemRecord.strNews = newsItem.news;

            db.SaveChanges();

            return Ok(newsItem);
        }

        //---------------------------------------------------------------------------------
        [FileUpload.MimeMultipart]
        [HttpPost]
        [Authorize]
        [JwtAuthentication]
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


