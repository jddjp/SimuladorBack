using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimuladorBackOffice.Models;

namespace SimuladorBackOffice.Controllers
{
    // [Route("[Controller]/[action]")]  //fuerza que tenga en la url el controlador y la action
    public class LoginController : Controller
    {
        //   public double Flat2insolutoivaendias(double dtasaflat,double iplazo,double dmontoprestamo,double divaactual,double dfechainicio,double dfechafin)
        // {


        //}
        [HttpPost]
        public JsonResult calculoSimuladorfecha(int cantidad, int plazo, int frecuencia)
        {
            // los tres valores que recibe la funcion cantidad es el monto a prestar, plazo a cuantos meses o quincenas a pagar frecuencia es si es quincenal, mensual o asi
            //declaracion de variables
            // Double mensual = 30;
            int quincena = 15;
            int diaActual;
            Double tasa = 30;
            Double anBancario = 360;
            string mes;
            string fechadeOperacion;
            string diafechadeOperacion;
            string mesfechadeOperacion;
            string anfechadeOperacion;
            string pruebatest="0";
            DateTime fechafindepago;
            DateTime fechaPrimerpago;
            DateTime fechafinquincena;
            DateTime fechamediaquincena;
            DateTime oUltimoDiaDelMesSiguiente;
            DateTime oUltimoDiaDePago;
            DateTime fechainicio;
            DateTime mitadDelMesSiguiente;
            Double diasOperados = 0.0;// dias operados
            Double interesTotal;
            Double interesDia;//cantidad rara
            Double iva = 0.16;
            Double ivaInteres;
            Double capital;
            Double interes;
            Double subtotal;
            //funcion para el calculo de fecha inicio
            DateTime thisDay = DateTime.Today;
            Double seguro;
            Double seguroPropuesto = 0.1635664;
            Double comision;
            Double total;
            Double cantPagoseguro=0.0;
            Double comisionFrecuencia;
            //  obj.day = thisDay.ToString("MM, dd, yyyy");//mes dia y año
            fechadeOperacion = thisDay.ToString("MM, dd, yyyy");//mes dia y año  que realiza la simulacion        
            diafechadeOperacion = thisDay.ToString("dd");
            mesfechadeOperacion = thisDay.ToString("mm");
            anfechadeOperacion = thisDay.ToString("YYYY");

            diaActual = Convert.ToInt32(diafechadeOperacion);
            //Primero obtenemos el día actual
            DateTime date = DateTime.Now;
            fechainicio = date;
            fechaPrimerpago = date;
            mitadDelMesSiguiente = date;
            //Asi obtenemos el primer dia del mes actual
            DateTime oPrimerDiaDelMes = new DateTime(date.Year, date.Month, 1);
           // DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);
            DateTime oUltimoDiaDelMes= oPrimerDiaDelMes.AddMonths(1).AddDays(-1);

            fechafindepago = date;
          //  fechaPrimerpago = fechainicio;
          //  mes = Convert.ToString(oUltimoDiaDelMes);
            //obj.day = mes;
            // mensual = Convert.ToInt32(mes.Remove(2));

            //fecha primer pago

            if (frecuencia == 1)
            {

                pruebatest = "10";
                if (diaActual != null)//>quincena
                {


                    oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(2).AddDays(-1);
                    fechaPrimerpago = oUltimoDiaDelMesSiguiente;
                    oUltimoDiaDePago= oPrimerDiaDelMes.AddMonths(plazo+1).AddDays(-1);
                    fechafindepago = oUltimoDiaDePago;
                    TimeSpan tsan1 = fechafindepago - fechainicio;
                    diasOperados = (tsan1.Days)+1;

                }
             }
            else//quincenal
            {

                
                if (diaActual < quincena)
                {
                    pruebatest = "20";
                    fechaPrimerpago = oUltimoDiaDelMes;
                }
                else  //quincena del mes siguiente primer pago
                {
                    pruebatest = "mary";
                    mitadDelMesSiguiente = oPrimerDiaDelMes.AddMonths(1).AddDays(14);
                    //  obj.day = Convert.ToString(mitadDelMesSiguiente);
                    fechaPrimerpago = mitadDelMesSiguiente;
                }
                int i = 1;
                int j = 0;
              //  int j = 2;
                fechafinquincena = fechaPrimerpago;
                
                while (i <= (plazo-(plazo/2)))//10  //1
                {
                    if (fechafinquincena.Day <= 15)
                    {//calcular fin de mes
                     //calcular ultimo dia de mes
                        fechafinquincena = oPrimerDiaDelMes.AddMonths(i+1).AddDays(-1);
                        pruebatest = Convert.ToString(plazo);
                      // pruebatest = Convert.ToString(fechafinquincena);


                    }
                    else
                    {
                        // calcular la quincena del mes siguiente
                        fechafinquincena = oPrimerDiaDelMes.AddMonths(j+1).AddDays(14);//
                     //   pruebatest = Convert.ToString(fechafinquincena);
                    }
                    j = j + 1;
                    i = i + 1;
                }
                fechafindepago = fechafinquincena;
                TimeSpan tsan = fechafindepago - fechainicio;
                diasOperados = (tsan.Days)+1;

               


            }



            //calcularfechafin prestamo

            interesDia = (tasa / anBancario) / 100;
            interesTotal = cantidad * interesDia * (diasOperados);
            ivaInteres = interesTotal * iva;
            capital = cantidad / plazo;
            interes = interesTotal / plazo;
            iva = ivaInteres / plazo;
            subtotal = capital + interes + iva;
            //Calculo de seguro

            if (cantidad <= 15000)
            {
                cantPagoseguro = 1500.00;
            }
            if (cantidad > 15000 & cantidad <= 30000)
            {
                cantPagoseguro = 30000;
            }
            if (cantidad > 30000 & cantidad <= 50000)
            {
                cantPagoseguro = 50000;
            }
            if (cantidad > 50000 & cantidad <= 100000)
            {
                cantPagoseguro = 100000;
            }
            if (cantidad > 100000 & cantidad <= 150000)
            {
                cantPagoseguro = 150000;
            }
            if (cantidad > 150000 & cantidad <= 200000)
            {
                cantPagoseguro = 200000;
            }
            if (cantidad > 200000 & cantidad <= 300000)
            {
                cantPagoseguro = 300000;
            }
            
            // calculo de seguro

            if (frecuencia == 1)
            {
                seguro = (seguroPropuesto * cantPagoseguro);
                comisionFrecuencia = 0.06750;
                ;
            }
            else
            {
                pruebatest = "seguro";
                seguro = (seguroPropuesto * cantPagoseguro) / 2;
                pruebatest = Convert.ToString(cantPagoseguro);
                comisionFrecuencia = 0.06750;

            }
            //calculo de comision
            comision = comisionFrecuencia * subtotal;
            //termino de calculo de seguro

            //amortizacion total de todo
            total = subtotal + comision + seguro;


           // fechafindepago = oPrimerDiaDelMes.AddMonths(1).AddDays(14);

            //valores que se enviaran en la lista 
            Login obj = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, total = total, diasOperados = diasOperados, frecuencia = frecuencia,fechaPrimerpago=fechaPrimerpago, fechafin = fechafindepago, fechainicio = fechainicio, interes = interes, capital = capital, interesTotal = interesTotal, interesDia = interesDia, ivaInteres = ivaInteres, iva = iva, comision = comision, seguro = seguro , fechadeOperacion = fechadeOperacion,prueba=pruebatest };
            Login obj2 = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, total = total, diasOperados = diasOperados, frecuencia = frecuencia, fechafin = fechafindepago, fechainicio = fechainicio, interes = interes };


            return Json(new List<Login>() { obj, obj2 });

        }



        [HttpPost]
        public JsonResult calculoSimuladorGeneral(int cantidad, int plazo, int frecuencia)
        {
            // los tres valores que recibe la funcion cantidad es el monto a prestar, plazo a cuantos meses o quincenas a pagar frecuencia es si es quincenal, mensual o asi
            //declaracion de variables
            Double mensual = 30;
            int quincena = 15;
            int diaActual;
            Double tasa = 30;
            Double anBancario = 360;
            string mes;
            string fechadeOperacion;
            string diafechadeOperacion;
            string mesfechadeOperacion;
            string anfechadeOperacion;
            DateTime fechafindepago;
            DateTime fechaPrimerpago;
            DateTime oUltimoDiaDelMesSiguiente;
            DateTime oUltimoDiaDePago;
            DateTime fechainicio;
            DateTime mitadDelMesSiguiente;
            Double diasOperados = 0.0;// dias operados
            Double interesTotal;
            Double interesDia;//cantidad rara
            Double iva = 0.16;
            Double ivaInteres;
            Double capital;
            Double interes;
            Double subtotal;
            //funcion para el calculo de fecha inicio
            DateTime thisDay = DateTime.Today;
            Double seguro;
            Double seguroPropuesto = 0.01635664;
            Double comision;
            Double total;
            Double cantPagoseguro;
            Double comisionFrecuencia;
            //  obj.day = thisDay.ToString("MM, dd, yyyy");//mes dia y año
            fechadeOperacion = thisDay.ToString("MM, dd, yyyy");//mes dia y año  que realiza la simulacion        
            diafechadeOperacion = thisDay.ToString("dd");
            mesfechadeOperacion = thisDay.ToString("mm");
            anfechadeOperacion = thisDay.ToString("YYYY");

            diaActual = Convert.ToInt32(diafechadeOperacion);
            //Primero obtenemos el día actual
            DateTime date = DateTime.Now;
            fechainicio = date;
            //Asi obtenemos el primer dia del mes actual
            DateTime oPrimerDiaDelMes = new DateTime(date.Year, date.Month, 1);
            DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);
            fechafindepago = oUltimoDiaDelMes;
            mes = Convert.ToString(oUltimoDiaDelMes);
            //obj.day = mes;
            mensual = Convert.ToInt32(mes.Remove(2));

            //fecha primer pago
            switch (frecuencia)
            {
                case 1://mesual
                    Console.WriteLine("Case 1");
                    if (diaActual > quincena)
                    {
                        oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(2).AddDays(-1);
                        fechaPrimerpago = oUltimoDiaDelMesSiguiente;//ultimo dia del mes siguiente
                        //   fechaPrimerpago = Convert.ToString(oUltimoDiaDelMesSiguiente);//ultimo dia del mes siguiente
                        oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                        fechafindepago = oUltimoDiaDePago;
                        //   fechafindepago = Convert.ToString(oUltimoDiaDePago);
                        //  obj.day = fechafindepago;
                        TimeSpan tsan = fechafindepago - fechainicio;
                        diasOperados = tsan.Days;

                    }
                    break;
                case 2://quincenal
                    if (diaActual < quincena)
                    {

                        fechaPrimerpago = oUltimoDiaDelMes;
                        //   fechaPrimerpago = Convert.ToString(oUltimoDiaDelMes);
                        oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                        fechafindepago = oUltimoDiaDePago;
                        //   fechafindepago = Convert.ToString(oUltimoDiaDePago);
                        TimeSpan tsan = fechafindepago - fechainicio;
                        diasOperados = tsan.Days;
                    }
                    else  //quincena del mes siguiente primer pago
                    {

                        mitadDelMesSiguiente = oPrimerDiaDelMes.AddMonths(1).AddDays(14);
                        //  obj.day = Convert.ToString(mitadDelMesSiguiente);
                        fechaPrimerpago = mitadDelMesSiguiente;
                        //fechaPrimerpago = Convert.ToString(mitadDelMesSiguiente);
                        oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                        fechafindepago = oUltimoDiaDePago;
                        //  fechafindepago = Convert.ToString(oUltimoDiaDePago);
                        TimeSpan tsan = fechafindepago - fechainicio;
                        diasOperados = tsan.Days;

                    }
                    break;





                default:
                    //  Console.WriteLine($"An unexpected value ({caseSwitch})");
                    break;
            }

            //calcularfechafin prestamo

            interesDia = (tasa / anBancario) / 100;
            interesTotal = cantidad * interesDia * diasOperados;
            ivaInteres = interesTotal * iva;
            capital = cantidad / plazo;
            interes = interesTotal / plazo;
            iva = ivaInteres / plazo;
            subtotal = capital + interes + iva;
            //Calculo de seguro

            if (cantidad <= 15000)
            {
                cantPagoseguro = 1500.00;
            }
            if (cantidad > 15000 & cantidad <= 30000)
            {
                cantPagoseguro = 30000;
            }
            if (cantidad > 30000 & cantidad <= 50000)
            {
                cantPagoseguro = 50000;
            }
            if (cantidad > 50000 & cantidad <= 100000)
            {
                cantPagoseguro = 100000;
            }
            if (cantidad > 100000 & cantidad <= 150000)
            {
                cantPagoseguro = 150000;
            }
            if (cantidad > 150000 & cantidad <= 200000)
            {
                cantPagoseguro = 200000;
            }
            if (cantidad > 200000 & cantidad <= 300000)
            {
                cantPagoseguro = 300000;
            }
            else
            {
                cantPagoseguro = 0;
            }
            // calculo de seguro

            if (frecuencia == 1)
            {
                seguro = seguroPropuesto * cantPagoseguro;
                comisionFrecuencia = 0.06750;
                ;
            }
            else
            {

                seguro = seguroPropuesto * cantPagoseguro / 2;
                comisionFrecuencia = 0.06750;

            }
            //calculo de comision
            comision = comisionFrecuencia * mensual;
            //termino de calculo de seguro

            //amortizacion total de todo
            total = subtotal + comision + seguro;

            //valores que se enviaran en la lista 
            Login obj = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, total = total, diasOperados = diasOperados, frecuencia = frecuencia, fechafin = fechafindepago, fechainicio = fechainicio, interes = interes, capital = capital, interesTotal = interesTotal, interesDia = interesDia, ivaInteres = ivaInteres, iva = iva, comision = comision, seguro = seguro };
            Login obj2 = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, total = total, diasOperados = diasOperados, frecuencia = frecuencia, fechafin = fechafindepago, fechainicio = fechainicio, interes = interes };


            return Json(new List<Login>() { obj, obj2 });

        }




        [HttpPost]
        //[HttpPost]
        public JsonResult Calculo(int cantidad, int plazo)
        {
            Login obj = new Login() { cantidad = cantidad, plazo = plazo };
            Login obj2 = new Login() { cantidad = cantidad, plazo = plazo };
            //  string name = "gola";
            // obj.cantidad = cantidad;
            // obj.plazo = plazo;


            return Json(new List<Login>() { obj, obj2 });

        }

        public IActionResult IndexTotal()
        {
            String datos = "hola";
            var url = Url.Action("SimuladorGeneral", "Login", new { datos, hola = "gggg" });//nombre de metodo de action, nombre de controlador
            //return View("Index",datos);
            Console.WriteLine("prueba de consola");
            return Redirect(url);
        }


        public IActionResult Metodo(string plazo, string hola)//mismo nombre de las varibable de arriba 
        {

            string valo = resumen();
            var data = $"dato {plazo} hola {hola} val{valo}";
            return View("Index", data);

        }

        //   [HttpGet("{cantidad}")]
        [HttpPost]
        //[HttpPost]
        public JsonResult Test(string cantidad)
        {
            Login obj = new Login();
            string name = "gola";
            //  Console.WriteLine(Request.Query["cantidad"]);
            //     string valor= Convert.ToString(Request.Query["cantidad"]); 
            // int valor = Convert.ToInt32(Request.Form["cantidad"]);
            //    string v;
            //    string y = "ggg";
            //   v= Request.Query["cantidad"];
            //  v = Convert.ToString(Request.Query["cantidad"]);

            //  v = Convert.To(Request.Query["cantidad"]);
            // string v = Convert.ToString(valor);

            return Json(cantidad);

        }
        public string resumen()
        {
            Console.WriteLine("holaaa");
            string dato = "holr";
            return (dato);
        }

        [HttpPost]
        public ActionResult SimuladorGeneral(string datos, string hola)
        {

            var dat1 = new DateTime();
            DateTime fecharegistro = DateTime.Parse("04/05/2020 8:34:01"); //obtenemos este valor de una bbdd
            var totaldedias = (DateTime.Now - fecharegistro).TotalHours;//dias operados
            //int  dTotalInteresesTasaFLAT = iTotalDias * (dTasaFLAT * 12 / 360) * dMontoPrestamo
            int semana = 7;
            int quincena = 15;
            int mensual = 30;
            var fechainicio = dat1;

            // var fechafin ="31-12-2020";
            //int totaldias = fechainicio - fechafin;
            Login obj = new Login();
            //int plazo = Request.Form["plazo"];
            //int vari = Request.Form["cantidad"];
            //   obj.cantidad = Convert.ToInt32(Request.Form["cantidad"]);
            //
            //+    obj.plazo = Convert.ToInt32(Request.Form["plazo"]);

            //obj.cantidad = Convert.ToInt32(Request.Form["cantidad"]);//Convert.ToInt32(Request.Form["cantidad"]);
            obj.frecuencia = 15;// mes o quincenal
            //obj.plazo = Convert.ToInt32(Request.Form["plazo"]);
            //condion de verificar si fue quincenal o mensual
            System.Diagnostics.Debug.WriteLine(dat1);
            System.Diagnostics.Debug.WriteLine("SomeText");
            int bancoAn = 360;//año bancario
            int diasO = 380;//dias operados
            int tasa = 30;//tasa
                          // int tasadiaria = tasa / 360 / 100;
            int tasadiaria = tasa / bancoAn / 100;//porcentaje
            int iva = 16;
            int interestotal = 0;
            //+   int interestotal = Convert.ToInt32(Request.Form["cantidad"]) * tasadiaria * diasO;
            int plazo = 10;
            // obj.cantidad = 300;
            //obj.frecuencia = 15;
            //obj.plazo = 12;
            //  int iva=amortizaivaamortizacionotal / plazo;
            //interesiva = interestotal * .16;
            int capital = (Convert.ToInt32(Request.Form["cantidad"]) / plazo) + (interestotal / plazo) + iva / plazo;// calculo del capital 
            int subtotal = (capital + interestotal + iva) / plazo;
            //   obj.amortizacion = capital;

            //  ViewData["amortizacion"] = 3;
            //  var data = $"dato {datos} hola {hola}";

            //calcular fecha fin
            // int tipoPago = 1;
            //DateTime thisDay = DateTime.Today;
            // Display the date in the default (general) format.
            //sacar la fecha actual 
            DateTime thisDay = DateTime.Today;
            Console.WriteLine("Today is " + thisDay.ToString("MMMM dd, yyyy") + ".");
            //  obj.day = thisDay.ToString("MM, dd, yyyy");//mes dia y año
            string fechadeOperacion = thisDay.ToString("MM, dd, yyyy");//mes dia y año
            string fechafindepago;
            string diafechadeOperacion = thisDay.ToString("dd");
            string mesfechadeOperacion = thisDay.ToString("mm");
            string anfechadeOperacion = thisDay.ToString("YYYY");
            int tipoPago = 1;
            int diaActual = Convert.ToInt32(diafechadeOperacion);
            //Primero obtenemos el día actual
            DateTime date = DateTime.Now;

            //Asi obtenemos el primer dia del mes actual
            DateTime oPrimerDiaDelMes = new DateTime(date.Year, date.Month, 1);
            DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);
            string mes;
            mes = Convert.ToString(oUltimoDiaDelMes);
            //obj.day = mes;
            mensual = Convert.ToInt32(mes.Remove(2));
            string fechaPrimerpago;
            //fecha primer pago
            switch (tipoPago)
            {
                case 1://mesual
                    Console.WriteLine("Case 1");
                    if (diaActual > quincena)
                    {
                        DateTime oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(2).AddDays(-1);
                        fechaPrimerpago = Convert.ToString(oUltimoDiaDelMesSiguiente);//ultimo dia del mes siguiente
                        DateTime oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                        fechafindepago = Convert.ToString(oUltimoDiaDePago);
                        //   obj.day = fechafindepago;

                    }
                    break;
                case 2:
                    if (diaActual < quincena)
                    {

                        fechaPrimerpago = Convert.ToString(oUltimoDiaDelMes);
                    }
                    else  //quincena del mes siguiente primer pago
                    {

                        DateTime mitadDelMesSiguiente = oPrimerDiaDelMes.AddMonths(1).AddDays(14);
                        obj.day = Convert.ToString(mitadDelMesSiguiente);
                        fechaPrimerpago = Convert.ToString(mitadDelMesSiguiente);
                    }

                    break;



                case 3://preguntar todo las cuentas
                    if (diaActual < semana)//es menor que 7
                    {

                        fechaPrimerpago = Convert.ToString(oUltimoDiaDelMes);
                    }
                    else  //quincena del mes siguiente primer pago
                    {

                        DateTime mitadDelMesSiguiente = oPrimerDiaDelMes.AddMonths(1).AddDays(14);
                        obj.day = Convert.ToString(mitadDelMesSiguiente);
                        fechaPrimerpago = Convert.ToString(mitadDelMesSiguiente);
                    }

                    break;

                default:
                    //  Console.WriteLine($"An unexpected value ({caseSwitch})");
                    break;
            }

            //calcularfechafin prestamo


            return View("Index", obj);

        }

        public IActionResult Index()
        {
            return View();
        }




    }
}