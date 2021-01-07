using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace WebCrap.Controllers
{
    public class HomeController : Controller
    {
        private const string _tempFolder = "/Temp";

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Upload(HttpPostedFileBase profileImage)
        {
            var serverPath = HttpContext.Server.MapPath(_tempFolder);
            if (Directory.Exists(serverPath) == false)
            {
                Directory.CreateDirectory(serverPath);
            }

            if (profileImage != null)
            {
                string path = Path.Combine(Server.MapPath(_tempFolder), Path.GetFileName(profileImage.FileName));
                profileImage.SaveAs(path);
            }

            return Json(new { success = true }); // success
        }
    }
}