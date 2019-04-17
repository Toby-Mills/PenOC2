
namespace WebAPI.FileUpload
{
    public class FileUploadResult
    {
        public string LocalFilePath { get; set; }
        public string FileName { get; set; }
        public long FileLength { get; set; }
        public string Url { get; set; }
    }
}