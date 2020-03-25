using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimuladorBackOffice.Models;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SimuladorBackOffice.Controllers
{
    public class SimuladorGeneralController : Controller
    {
        public ActionResult SimuladorGeneral()
        {
            SimuladorGeneral obj = new SimuladorGeneral();
            // obj.cantidad = 300;
            //obj.frecuencia = 15;
            //obj.plazo = 12;
            obj.cantidad = Convert.ToInt32(Request.Form["cantidad"]);
            obj.frecuencia = Convert.ToInt32(Request.Form["frecuencia"]);
            obj.plazo = Convert.ToInt32(Request.Form["plazo"]);
            
            
            return View(obj);
        }
        // GET: /<controller>/
        public ActionResult Index()// a vista que nace de aca es sin modelo apra que todas vayan al mismo modelo aun en diferentes vistas
        {

            return View();
        }
    }
}
