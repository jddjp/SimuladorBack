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
        public JsonResult calculoSimuladorfecha(Double cantidad, int plazo, int frecuencia)
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
            Double seguroPropuesto = 0.01635664;
            Double comision;
            Double total;
            Double cantPagoseguro=0.0;
            Double comisionFrecuencia;
             string pruebatest3 = "";
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
            DateTime inicio = new DateTime(date.Year, date.Month, 1);
            // DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);
            DateTime oUltimoDiaDelMes= oPrimerDiaDelMes.AddMonths(1).AddDays(-1);

            fechafindepago = date;
            //  fechaPrimerpago = fechainicio;
            //  mes = Convert.ToString(oUltimoDiaDelMes);
            //obj.day = mes;
            // mensual = Convert.ToInt32(mes.Remove(2));

            //fecha primer pago
            pruebatest = pruebatest + Convert.ToString(fechainicio);
            if (frecuencia == 1)
            {

               // pruebatest = "10";
                if (fechainicio.Day<oUltimoDiaDelMes.Day) {
                    
                    oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(2).AddDays(-1);
                    fechaPrimerpago = oUltimoDiaDelMesSiguiente;
                    oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                    fechafindepago = oUltimoDiaDePago;
                    TimeSpan tsan1 = fechafindepago - fechainicio;
                    diasOperados = (tsan1.Days) + 1;
                    pruebatest = "ggg" + pruebatest + Convert.ToString(oUltimoDiaDelMesSiguiente) + "d" + Convert.ToString(tsan1.Days); ;
                }
                else
                {

                    oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(3).AddDays(-1);
                    fechaPrimerpago = oUltimoDiaDelMesSiguiente;
                    oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 2).AddDays(-1);
                    fechafindepago = oUltimoDiaDePago;
                    TimeSpan tsan1 = fechafindepago - fechainicio;
                    diasOperados = (tsan1.Days) + 1;
                    pruebatest ="rr"+ pruebatest + Convert.ToString(oUltimoDiaDelMesSiguiente);
                }
                pruebatest =pruebatest+ Convert.ToString(diasOperados) + "diasoperados" + Convert.ToString(fechainicio) + "fecha" + Convert.ToString(fechafindepago);
             }
            else//quincenal
            {

                
                if (diaActual < quincena)
                {
                //    pruebatest = "20";
                    fechaPrimerpago = oUltimoDiaDelMes;
                }
                else  //quincena del mes siguiente primer pago
                {
                  //  pruebatest = "mary";
                    mitadDelMesSiguiente = oPrimerDiaDelMes.AddMonths(1).AddDays(14);
                    //  obj.day = Convert.ToString(mitadDelMesSiguiente);
                    fechaPrimerpago = mitadDelMesSiguiente;
                }
                int i = 1;
                int j = 1;
                //  int j = 2;
                //  fechafinquincena = fechaPrimerpago;
                fechafinquincena = date;
                while (j < plazo)///(plazo-(plazo/2)))//10  //1
                {
                    if (fechafinquincena.Day <= 15)
                    {//calcular fin de mes
                     //calcular ultimo dia de mes
                     // fechafinquincena = oPrimerDiaDelMes.AddMonths(i+1).AddDays(-1);    
                     //  i = i + 1;
                        if (i == 1 & fechafinquincena.Day==15)
                        {
                            fechafinquincena = inicio.AddMonths(i).AddDays(14);//
                            i = i + 1;
                        }
                        else
                        {
                            fechafinquincena = inicio.AddMonths(i).AddDays(-1);
                            //    inicio= inicio.AddMonths(1).AddDays(-1);
                            pruebatest = Convert.ToString(plazo);

                            // pruebatest = Convert.ToString(fechafinquincena);
                        }
                    }
                    else
                    {
                        pruebatest = "fech quincenal" + Convert.ToString(fechafinquincena);
                        if (i == 1) {
                            DateTime iniciopago = inicio.AddMonths(i).AddDays(-1);
                          if(fechafinquincena.Day < iniciopago.Day)
                            {
                                // calcular la quincena del mes siguiente
                                //  fechafinquincena = oPrimerDiaDelMes.AddMonths(j+1).AddDays(14);//      
                                //    j = j + 1;
                                fechafinquincena = inicio.AddMonths(i).AddDays(14);//
                                i = i + 1;
                                //  inicio = inicio.AddMonths(1).AddDays(14);//
                                pruebatest = pruebatest + Convert.ToString(fechafinquincena);
                            }
                          else
                            {
                                i = i + 1;
                                fechafinquincena = inicio.AddMonths(i).AddDays(-1);
                                //    inicio= inicio.AddMonths(1).AddDays(-1);
                              //  pruebatest = Convert.ToString(plazo);
                                pruebatest = pruebatest + Convert.ToString(fechafinquincena);


                            }
                        }
                        else {
                            // calcular la quincena del mes siguiente
                            //  fechafinquincena = oPrimerDiaDelMes.AddMonths(j+1).AddDays(14);//      
                            //    j = j + 1;
                            fechafinquincena = inicio.AddMonths(i).AddDays(14);//
                            pruebatest = pruebatest + Convert.ToString(fechafinquincena);

                            i = i + 1;
                            //  inicio = inicio.AddMonths(1).AddDays(14);//
                        }
                        pruebatest = pruebatest + Convert.ToString(fechafinquincena);
                        //   pruebatest = Convert.ToString(fechafinquincena);
                    }
                    j = j + 1;
                    pruebatest = pruebatest+"fechas" + Convert.ToString(fechafinquincena);
                  //  i = i+1;
                }
                fechafindepago = fechafinquincena;
                TimeSpan tsan = fechafindepago - fechainicio;
               double diashoras = (fechafindepago - fechainicio).TotalHours/24;
                pruebatest = pruebatest + "resta"+Convert.ToString(diashoras);
                pruebatest = pruebatest + Convert.ToString(diashoras);
                diasOperados = (tsan.Days);// esto se debe a que dias operados en horas es muy exacto entoncees sacaba un dia menos porque ya estaban varias horas corriendo del otro dia
                if (diashoras > diasOperados) 
                {
                    diasOperados = (tsan.Days)+1;

                }


                pruebatest = pruebatest + Convert.ToString(diasOperados);

            }



            //calcularfechafin prestamo

            interesDia = (tasa / anBancario) / 100;
            interesTotal = cantidad * interesDia * (diasOperados);
            ivaInteres = interesTotal * iva;
            capital = cantidad / plazo;
            pruebatest = pruebatest + "capital" + Convert.ToString(capital)+"cantidad" + Convert.ToString(cantidad)+"plazo" + Convert.ToString(plazo);
            interes = interesTotal / plazo;
            iva = ivaInteres / plazo;
            subtotal = capital + interes + iva;
            //Calculo de seguro

            if (cantidad <= 15000)
            {
                cantPagoseguro = 15000;
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
      //      SI(F8 = "MENSUAL", L7 * D12, SI(F8 = "QUINCENAL", (L7 * D12) / 2,))




            if (frecuencia == 1)
            {
                seguro = (seguroPropuesto * cantPagoseguro);
                comisionFrecuencia = 0.06750;
                ;
            }
            else
            {
             //   pruebatest = "seguro";
                seguro = (seguroPropuesto * cantPagoseguro) / 2;
               // pruebatest = Convert.ToString(cantPagoseguro);
                comisionFrecuencia = 0.06750;

            }
            //calculo de comision
            comision = comisionFrecuencia * subtotal;
            //termino de calculo de seguro

            //amortizacion total de todo
            total = subtotal + comision + seguro;


            // fechafindepago = oPrimerDiaDelMes.AddMonths(1).AddDays(14);

            pruebatest3 = pruebatest3 + "fecha inicioa" + Convert.ToString(fechainicio);
            pruebatest3 = pruebatest3 + "fecha vencea" + Convert.ToString(fechafindepago);
            //valores que se enviaran en la lista 
            Login obj = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, total = Math.Round(total,2), diasOperados = diasOperados, frecuencia = frecuencia,fechaPrimerpago=fechaPrimerpago, fechafin = fechafindepago, fechainicio = fechainicio, interes = interes, capital = capital, interesTotal = interesTotal, interesDia = interesDia, ivaInteres = ivaInteres, iva = iva, comision = comision, seguro = seguro , fechadeOperacion = fechadeOperacion,prueba=pruebatest3 };
          //  Login obj2 = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, total = total, diasOperados = diasOperados, frecuencia = frecuencia, fechafin = fechafindepago, fechainicio = fechainicio, interes = interes };


            return Json(new List<Login>() { obj});

        }



      //  [HttpPost]//la funcion de calculo del simulador general por funciones
     //   public JsonResult calculoSimuladorConsumoGeneral(Double cantidad, Double seguro, Double comision, int plazo, int frecuencia, Double tasaInsoluta, DateTime fechaInicio, DateTime fechafindepago, Double tasa, Double iva)
       // {
         //   amortizacion numAmortizacion = new amortizacion { };
          
            ///nuevos calculos para el simulador consumo
            //
           // Double TasaInteresInsoluta, valorTipoPagoPeriodico;
            //double tasaInsoluta;
            //TasaInteresInsoluta = InsolutoIvaIncluido(Math.Round(tasa, 1) / 100, plazo, cantidad, iva, fechaInicio, fechafindepago);
            //tasaInsoluta=Math.Round(TasaInteresInsoluta);
            // valorTipoPagoPeriodico = DLookup("[Valor]", "CatalogoPeriodicidad", "[PeriodicidadNombreCredi]='" & txtTipoPeriodo & "'")
         //   crearTablaAmortizaciones(cantidad,seguro,comision,plazo,frecuencia,tasaInsoluta,fechafindepago,fechaInicio);


         //   return Json(new List<Login>() { obj, obj2 });

       // }
        [HttpPost]
        public JsonResult crearTablaAmortizaciones(Double cantidad, Double seguro, Double comision, int plazo, int frecuencia, DateTime FecVence, DateTime FecInicio)
        {
           
            string pruebatest="";
            string pruebatest2 = "";
            string pruebatest3= "";

            Double tasa =2.5; //tasa mensual 30 sria tasa anual
            Double iva=0.16;
            List<Login> tablaNumAmortizacion = new List<Login>();           
            //nuevos calculos para el simulador consumo            
            Double TasaInteresInsoluta;
            double tasaInsoluta;
            Double PagoAmortizacionSinseguro = 0;
            Double SaldoInicial = 0, MontoSolicitado = cantidad;
            Double interes, ivaAmortizacion, capital, subtotal, pagoTotal, pagosinIVA, amortizacionConSeguro;
            Double amortizacionConSeguroAlMes = 0;
            Double valortipoP = 0;
            DateTime dtInicioAux = FecInicio;
            DateTime fechaOperacion = FecInicio;
            DateTime dtUltimodia = FecVence;
            int j = 1;
            pruebatest="calculaFecha" + Convert.ToString(FecVence);
            //verificar que tasa sea en porcentaje, plazo,iva seaa en porcentaje .16 las fechas correcta
            TasaInteresInsoluta = InsolutoIvaIncluido((tasa) / 100, plazo, cantidad, iva, FecInicio, FecVence,pruebatest);
            //prueba
            pruebatest = InsolutoIvaIncluido2((tasa) / 100, plazo, cantidad, iva, FecInicio, FecVence, pruebatest);

            ///   pruebatest = pruebatest + Convert.ToString(cantidad);
            tasaInsoluta = Math.Round(TasaInteresInsoluta,12);
            SaldoInicial = MontoSolicitado;
            pruebatest = pruebatest+ "TasaInteresInsoluta" + Convert.ToString(TasaInteresInsoluta) + "  Sig1  " + Convert.ToString(tasa) + "  Sig11  " + Convert.ToString(plazo) + "XX, " + Convert.ToString(iva);
            
            pruebatest = pruebatest+"inicio1_1";
            pruebatest =pruebatest+"tasainsoluta1_2 ,saldoincial1_2"+ Convert.ToString(TasaInteresInsoluta) + "  Sig1_2  "+Convert.ToString(SaldoInicial)+"  Sig1_2  ";
            PagoAmortizacionSinseguro = Math.Round(calcularMontoPagoInsoluto(tasaInsoluta, plazo, cantidad),12);
            pruebatest = pruebatest + "paho amortizacionsin seguro" + Convert.ToString(PagoAmortizacionSinseguro);
            pruebatest3 = "fecha por fla frecia?"+Convert.ToString(frecuencia);
            for (int i = 1; i <= plazo; i++)
            {
                pruebatest3 = pruebatest3 + "numero de plazo=" + Convert.ToString(plazo); ;
                if (i < (plazo+1))
                {
                    pruebatest3 = pruebatest3 + "numero de plazo=" + Convert.ToString(plazo); ;
                    interes = Math.Round(pagoDeInteresEntrePeriodosQuitandoIva(tasaInsoluta, plazo, cantidad, i, i, iva),12);
                    pruebatest = pruebatest + "interes "+Convert.ToString(interes)+"sig";
                    ivaAmortizacion = Math.Round(interes * iva,12);
                    pruebatest = pruebatest + "ivaamortizacion" + Convert.ToString(ivaAmortizacion)+"sig"+ "pagoamortizacion sin seguro" + Convert.ToString(PagoAmortizacionSinseguro) + "sig";
                    capital = PagoAmortizacionSinseguro - interes - ivaAmortizacion;
                    pruebatest = pruebatest + "capital" + Convert.ToString(capital);
                    subtotal = capital + interes + ivaAmortizacion;
                    pruebatest = pruebatest + "subtotal" + Convert.ToString(subtotal);

                    //                    seguro =;
                    //                   comision =;
                    comision = 0.06750 * subtotal;
                    pagoTotal = capital + interes + ivaAmortizacion + seguro + comision;
                    pruebatest = pruebatest + "pago total" + Convert.ToString(pagoTotal);
                    pagosinIVA = capital + interes + seguro + comision;
                    pruebatest = pruebatest + "pago sin iva"+Convert.ToString(pagosinIVA);

                    if (i == 1)
                    {
                        amortizacionConSeguro = pagoTotal;//agregar cantidad a arreglo
                        
                        valortipoP = valorTipoPagoPeriodico(frecuencia);
                        amortizacionConSeguroAlMes = pagoTotal * valortipoP;//DLookupvalortipopagoperiodo multiplicar dependiendo de la frecuencia
                        FecInicio = dtInicioAux;
                        FecVence = calculaFecha3(frecuencia, FecInicio,fechaOperacion,i);
                     //   pruebatest2 = "funcion de calcular fecha1 "+calculaFecha3(frecuencia, FecInicio, fechaOperacion, i,pruebatest2);
                        pruebatest2 = pruebatest2 + "fecha inicioa" +Convert.ToString(FecInicio);
                        pruebatest2 = pruebatest2 + "fecha vencea" +Convert.ToString(FecVence);

                        pruebatest3 = pruebatest3 + "fecha inicioa" + Convert.ToString(FecInicio);
                        pruebatest3 = pruebatest3 + "fecha vencea" + Convert.ToString(FecVence);
                    }
                    else
                    {
                        
                        FecInicio = FecVence;
                        pruebatest3 = pruebatest2 + "fecha inicioi" + Convert.ToString(FecInicio);
                        pruebatest3 = pruebatest2 + "fecha inicioi" + Convert.ToString(FecVence);

                        FecVence = calculaFecha3(frecuencia, FecInicio, fechaOperacion,i);
                        
                      //  pruebatest2 = "funcion de calcular fecha 2" + calculaFecha3(frecuencia, FecInicio, fechaOperacion, i, pruebatest2);
                        pruebatest3 = pruebatest3 + "fecha iniciot" + Convert.ToString(FecInicio);
                        pruebatest3 = pruebatest3 + "fecha vencet" + Convert.ToString(FecVence);
                    }


                }
                else
                {
                    capital = SaldoInicial;
                    interes = pagoDeInteresEntrePeriodosQuitandoIva(tasaInsoluta, plazo, cantidad, i, i, iva);
                    ivaAmortizacion = interes * iva;
                    subtotal = capital + interes + ivaAmortizacion;
                   // seguro = pagofijoseguro;
                    comision = 0.06750 * subtotal;
                    pruebatest2 = "comision" + Convert.ToString(comision);
                    pagoTotal = capital + interes + ivaAmortizacion + seguro + comision;
                    pagosinIVA = capital + interes + seguro + comision;
                    if (i == 1)
                    {
                        FecInicio = dtInicioAux;
                        FecVence = calculaFecha3(frecuencia, FecInicio,fechaOperacion,i);
                    //    pruebatest2 = "funcion de calcular fecha3 " + calculaFecha3(frecuencia, FecInicio, fechaOperacion, i, pruebatest2);
                        pruebatest3 = pruebatest3 + "fecha inicioww" + Convert.ToString(FecInicio);
                        pruebatest3 = pruebatest3 + "fecha venceww" + Convert.ToString(FecVence);
                    }
                    else
                    {
                        FecInicio = FecVence;
                        FecVence = calculaFecha3(frecuencia, FecInicio,fechaOperacion,i);
                    //    pruebatest2 = "funcion de calcular fecha4 " +  calculaFecha3(frecuencia, FecInicio, fechaOperacion, i, pruebatest2);
                        pruebatest3 = pruebatest3 + "fecha inicioq" + Convert.ToString(FecInicio);
                        pruebatest3 = pruebatest3 + "fecha venceq" + Convert.ToString(FecVence);
                    }
                }
                pruebatest = pruebatest+Convert.ToString(TasaInteresInsoluta);
                pruebatest = pruebatest+Convert.ToString(tasaInsoluta);
                pruebatest = pruebatest+subtotal+Convert.ToString(subtotal);
                //    pruebatest = pruebatest+Convert.ToString(FecInicio);
                //    pruebatest = pruebatest+Convert.ToString(FecVence);
                //agregar a la lista de objetos los atributos de la tabla
                //valores que se enviaran en la lista 

                //  Login ob = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, frecuencia = frecuencia, interes = interes, capital = capital, iva = iva, comision = comision, seguro = seguro };

                pruebatest3 = pruebatest3 + "fecha iniciofinal" + Convert.ToString(FecInicio);
                pruebatest3 = pruebatest3 + "fecha venceafinal" + Convert.ToString(FecVence);
                Login obj = new Login() { numamortizacion = i, saldoinicial =SaldoInicial,cantidad = Math.Round(cantidad,2), prueba = pruebatest3, plazo = plazo, total= Math.Round(pagoTotal,2), subtotal = Math.Round(subtotal,2), frecuencia = frecuencia, interes = Math.Round(interes,2), capital = Math.Round(capital,2), iva = iva, comision = Math.Round(comision,2), seguro = Math.Round(seguro ,2),fechainicio=FecInicio,fechafin=FecVence};
                tablaNumAmortizacion.Add(obj);

            }
            //   string i = "0";

            //   Login ob = new Login() { cantidad = cantidad, plazo = plazo, subtotal = subtotal, frecuencia = frecuencia, interes = interes, capital = capital, iva = iva, comision = comision, seguro = seguro };

            //Login[] numamortizacion; }//= {ob };
            // amortizacion numAmortizacion = new amortizacion { numamortizacion = numamortizacion };
            //List<Login> ejemplo = new List<Login>;
            //ejemplo.Add(ob);
            return Json(tablaNumAmortizacion);
        }

        public DateTime calculaFecha3(int frecuencia, DateTime FecInicio, DateTime FecOperacion, int i)//, string pruebatest2)
        {
            // los tres valores que recibe la funcion cantidad es el monto a prestar, plazo a cuantos meses o quincenas a pagar frecuencia es si es quincenal, mensual o asi
            //declaracion de variables
           // pruebatest2 = pruebatest2 +"variables" + Convert.ToString(frecuencia)+"fecha inico" + Convert.ToString(FecInicio) + "fecha operacion"+ Convert.ToString(FecOperacion);
            DateTime fechafindepago;
            DateTime oUltimoDiaDelMesSiguiente;
            DateTime fechainicio;
            DateTime fechafinquincena;
            // DateTime controlInicio=FecOperacion;
            Double diasOperados = 0.0;// dias operados
            //funcion para el calculo de fecha inicio
            //Primero obtenemos el día actual
            //DateTime date = DateTime.Now;
            fechainicio = FecInicio;
            fechafindepago = FecInicio;
            fechainicio = FecInicio;
            //Asi obtenemos el primer dia del mes actual
            DateTime oPrimerDiaDelMes = new DateTime(fechainicio.Year, fechainicio.Month, 1);
            DateTime inicio = new DateTime(FecOperacion.Year, FecOperacion.Month, 1);
            DateTime controlInicio = inicio.AddMonths(1).AddDays(-1);
            // DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);
            DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);

            fechafindepago = FecInicio;

            if (frecuencia == 1)
            {

                if (fechafindepago.Day == controlInicio.Day & fechafindepago.Month == controlInicio.Month & fechafindepago.Year == controlInicio.Year)//>quincena
                {


                    oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(3).AddDays(-1);
                    fechafindepago = oUltimoDiaDelMesSiguiente;
                    // oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                    // fechafindepago = oUltimoDiaDePago;
                 //   TimeSpan tsan1 = fechafindepago - fechainicio;
                 //   diasOperados = (tsan1.Days) + 1;

                }
                else
                {
                    oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(2).AddDays(-1);
                    fechafindepago = oUltimoDiaDelMesSiguiente;
                    // oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                    // fechafindepago = oUltimoDiaDePago;
                   // TimeSpan tsan1 = fechafindepago - fechainicio;
                   // diasOperados = (tsan1.Days) + 1;
                }
            }
            else//quincenal
            {

                fechafindepago = fechainicio;

                if (fechafindepago.Day <= 15)
                {//calcular fin de mes
                   // pruebatest2 = pruebatest2 + "condicion de i=1";
                    if (i == 1 & fechafindepago.Day == 15)
                    {
                        fechafindepago = inicio.AddMonths(1).AddDays(14);//
                      //  pruebatest2 =pruebatest2+ "condicion de i=1 fecha fin quincena" + fechafindepago;
                    }
                    else
                    {
                        fechafindepago = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);
                      //  pruebatest2 = pruebatest2 + "else  i=1 fecha fin quincena" + fechafindepago;
                    }
                }
                else
                {
                    if (i == 1 & fechafindepago.Day == controlInicio.Day)//se verifica que no sea el ultimo dia de ese mes porque sino entonces ya no aplica
                    {
                        fechafindepago = inicio.AddMonths(2).AddDays(-1);

                      //  pruebatest2 = pruebatest2 + "condicion de i=1 y es  fin de mes4" + fechafindepago;
                    }
                    else
                    {
                        fechafindepago = oPrimerDiaDelMes.AddMonths(1).AddDays(14);//
                     //   pruebatest2 = pruebatest2 + "else de i=1 fecha fin de mes" + fechafindepago;

                    }                                                  //   pruebatest = Convert.ToString(fechafinquincena);
                }

            }
            //  fechafindepago = fechafinquincena;
            TimeSpan tsan = fechafindepago - fechainicio;
            double diashoras = (fechafindepago - fechainicio).TotalHours / 24;

            //  pruebatest = Convert.ToString(diashoras);
            diasOperados = (tsan.Days);// esto se debe a que dias operados en horas es muy exacto entoncees sacaba un dia menos porque ya estaban varias horas corriendo del otro dia
            if (diashoras > diasOperados)
            {
                diasOperados = (tsan.Days) + 1;

            }





            return fechafindepago;
        }

        public DateTime calculaFecha2(int frecuencia, DateTime FecInicio, DateTime FecOperacion, int i)
        {
            // los tres valores que recibe la funcion cantidad es el monto a prestar, plazo a cuantos meses o quincenas a pagar frecuencia es si es quincenal, mensual o asi
            //declaracion de variables

            DateTime fechafindepago;
            DateTime oUltimoDiaDelMesSiguiente;
            DateTime fechainicio;
            DateTime fechafinquincena;
           // DateTime controlInicio=FecOperacion;
            Double diasOperados = 0.0;// dias operados
            //funcion para el calculo de fecha inicio
            //Primero obtenemos el día actual
            //DateTime date = DateTime.Now;
            fechainicio = FecInicio;
            fechafindepago = FecInicio;
            fechainicio = FecInicio;
            //Asi obtenemos el primer dia del mes actual
            DateTime oPrimerDiaDelMes = new DateTime(fechainicio.Year, fechainicio.Month, 1);
            DateTime inicio = new DateTime(FecOperacion.Year, FecOperacion.Month, 1);
            DateTime controlInicio = inicio.AddMonths(1).AddDays(-1);
            // DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);
            DateTime oUltimoDiaDelMes = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);

            fechafindepago = FecInicio;
           
            if (frecuencia == 1)
            {

               if (fechafindepago.Day == FecOperacion.Day & fechafindepago.Month == FecOperacion.Month & fechafindepago.Year == FecOperacion.Year )//>quincena
                {


                    oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(3).AddDays(-1);
                    fechafindepago = oUltimoDiaDelMesSiguiente;
                   // oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                   // fechafindepago = oUltimoDiaDePago;
                    TimeSpan tsan1 = fechafindepago - fechainicio;
                    diasOperados = (tsan1.Days) + 1;

                }
               else
                {
                    oUltimoDiaDelMesSiguiente = oPrimerDiaDelMes.AddMonths(2).AddDays(-1);
                    fechafindepago = oUltimoDiaDelMesSiguiente;
                    // oUltimoDiaDePago = oPrimerDiaDelMes.AddMonths(plazo + 1).AddDays(-1);
                    // fechafindepago = oUltimoDiaDePago;
                    TimeSpan tsan1 = fechafindepago - fechainicio;
                    diasOperados = (tsan1.Days) + 1;
                }
            }
            else//quincenal
            {

                fechafinquincena = fechainicio;

                if (fechafinquincena.Day <= 15)
                {//calcular fin de mes

                    if (i == 1 & fechafinquincena.Day == 15)
                    {
                        fechafinquincena = inicio.AddMonths(1).AddDays(14);//

                    }
                    else
                    {
                        fechafinquincena = oPrimerDiaDelMes.AddMonths(1).AddDays(-1);

                    }
                }
                else
                {
                    if (i == 1 & fechafinquincena.Day == controlInicio.Day)//se verifica que no sea el ultimo dia de ese mes porque sino entonces ya no aplica
                        {
                            fechafindepago = inicio.AddMonths(2).AddDays(-1);
                        }
                        else
                        {
                        fechafindepago = oPrimerDiaDelMes.AddMonths(1).AddDays(14);//
                   
                        }                                                  //   pruebatest = Convert.ToString(fechafinquincena);
                    }

                }
              //  fechafindepago = fechafinquincena;
                TimeSpan tsan = fechafindepago - fechainicio;
                double diashoras = (fechafindepago - fechainicio).TotalHours / 24;

              //  pruebatest = Convert.ToString(diashoras);
                diasOperados = (tsan.Days);// esto se debe a que dias operados en horas es muy exacto entoncees sacaba un dia menos porque ya estaban varias horas corriendo del otro dia
                if (diashoras > diasOperados)
                {
                    diasOperados = (tsan.Days) + 1;

                }




            
            return fechafindepago;
        }

        public int valorTipoPagoPeriodico(int frecuencia)
        {
            int valorTipoPagoPeriodo=0;
            //fecha primer pago
            switch (frecuencia)
            {
                case 1://mesual
                    valorTipoPagoPeriodo = 1;
                    break;
                case 2://quincenal
                    valorTipoPagoPeriodo = 2;

                    break;

                default:
                    //  Console.WriteLine($"An unexpected value ({caseSwitch})");
                    break;
            }

            return valorTipoPagoPeriodo;
        }
        public Double InsolutoIvaIncluido(Double dTasaFLAT,int iPlazo,Double dMontoPrestamo, Double IVAActual, DateTime dFechaInicio,DateTime dFechaFin,string pruebatest)
        {
            pruebatest = pruebatest + "variables" + Convert.ToString(dTasaFLAT) + "  , " + "monto" + Convert.ToString(dMontoPrestamo) + "iva" + Convert.ToString(IVAActual) + "fechainicio" + Convert.ToString(dFechaInicio) + "fechafin" + Convert.ToString(dFechaFin);
            //calcular tasa insolutaCI
            //1 debemos obtener el total de intereses que genera el prestamo a la tasa Flat
            Double dTotalInteresesTasaFLAT;
            double dTotalInteresestasaFlATIVA;
            Double totaldias;
            totaldias = (dFechaFin - dFechaInicio).TotalHours / 24; // sacar la resta para sacar dias operados
            TimeSpan tsan = dFechaFin - dFechaInicio;
            //  double diashoras = (fechafindepago - fechainicio).TotalHours / 24;
            //  pruebatest = Convert.ToString(diashoras);
            double diasOperados = (tsan.Days);// esto se debe a que dias operados en horas es muy exacto entoncees sacaba un dia menos porque ya estaban varias horas corriendo del otro dia
            if (totaldias > diasOperados)
            {
                totaldias = (tsan.Days) + 1;// esto se debe a que dias operados en horas es muy exacto entoncees sacaba un dia menos porque ya estaban varias horas corriendo del otro dia
            }
            pruebatest = pruebatest + "total de dias" + Convert.ToString(totaldias);
            //debemos obtener el total de intereses que genra el prestamo a la tasa flat
            dTotalInteresesTasaFLAT = totaldias * (dTasaFLAT * 12 / 360) * dMontoPrestamo;
            dTotalInteresesTasaFLAT = totaldias * (dTasaFLAT * 12 / 360) * dMontoPrestamo;
            pruebatest = pruebatest + "totaldeinterestasaflat" + Convert.ToString(dMontoPrestamo);

            pruebatest = pruebatest + "totaldeinterestasaflat" + Convert.ToString(dTotalInteresesTasaFLAT);

            //debemos encontrar la tasa con iva que quitandole el iva a cada pago de intereses
            Double iMaxIteraciones;
            Double iContador = 0;
            Double dMinimo;
            Double dMaximo;
            Double dTasaInsolutaIVAAleatoria;

            //hacemos una aprximacion del resultado los ejercicios 
            dTasaInsolutaIVAAleatoria = dTasaFLAT * 1.6;// esta cifra es de siempre 1.6  isa dijo
            pruebatest = pruebatest + "tasainsolutaivaaleatoria" + Convert.ToString(dTasaInsolutaIVAAleatoria);
            iMaxIteraciones = 50;
            dMinimo = 0;//dtasaflat
            dMaximo = dTasaInsolutaIVAAleatoria;
            Boolean bndEncontrado = false;
            pruebatest = pruebatest + "entrando al while";
            while (!bndEncontrado)
            {
                dTotalInteresestasaFlATIVA = pagoDeInteresEntrePeriodosQuitandoIva(dTasaInsolutaIVAAleatoria, iPlazo, dMontoPrestamo, 1, iPlazo, IVAActual);
                pruebatest = pruebatest + "dentro de whle dTotalInteresestasaFlATIVA" + Convert.ToString(dTotalInteresestasaFlATIVA);
                //  Double cont =dTotalInteresestasaFlATIVA;
                //  cont = Math.Round(cont,10);
                pruebatest = pruebatest + "cont preciision math roudn" + Convert.ToString(Math.Round(dTotalInteresesTasaFLAT, 5) + "otro" + Math.Round(dTotalInteresestasaFlATIVA, 5));
                if (Math.Round(dTotalInteresesTasaFLAT, 5) == Math.Round(dTotalInteresestasaFlATIVA, 5))
                {
                    bndEncontrado = true;
                }
                else
                {
                    if (dTotalInteresestasaFlATIVA > dTotalInteresesTasaFLAT)
                    {
                        dTasaInsolutaIVAAleatoria = dMinimo + (dMaximo - dMinimo) / 2;
                        dMaximo = dTasaInsolutaIVAAleatoria;

                    }
                    else
                    {
                        dTasaInsolutaIVAAleatoria = dMaximo + (dMaximo - dMinimo) / 2;
                        dMinimo = dMaximo;
                        dMaximo = dTasaInsolutaIVAAleatoria;

                    }
                }

                iContador = iContador + 1;
                if (iContador > iMaxIteraciones)
                {
                    bndEncontrado = true;
                }
            }
            pruebatest = pruebatest + "return de esta" + Convert.ToString(dTasaInsolutaIVAAleatoria);
            // InsolutoIvaIncluido = dTasaInsolutaIVAAleatoria;

            // InsolutoIvaIncluido = dTasaInsolutaIVAAleatoria;

            return dTasaInsolutaIVAAleatoria;
        }
        ///

        public String InsolutoIvaIncluido2(Double dTasaFLAT, int iPlazo, Double dMontoPrestamo, Double IVAActual, DateTime dFechaInicio, DateTime dFechaFin, string pruebatest)
        {
            pruebatest = pruebatest + "variablesXDDDDDDDDDDDDDDDD" + Convert.ToString(dTasaFLAT)+"  , "+ "monto" + Convert.ToString(dMontoPrestamo) + "iva" + Convert.ToString(IVAActual) + "fechainicio" + Convert.ToString(dFechaInicio)+ "fechafin" + Convert.ToString(dFechaFin);
            //calcular tasa insolutaCI
            //1 debemos obtener el total de intereses que genera el prestamo a la tasa Flat
            Double dTotalInteresesTasaFLAT;
            double dTotalInteresestasaFlATIVA;
            Double totaldias;
            totaldias = (dFechaFin - dFechaInicio).TotalHours / 24; // sacar la resta para sacar dias operados
            TimeSpan tsan = dFechaFin - dFechaInicio;
            //  double diashoras = (fechafindepago - fechainicio).TotalHours / 24;
            //  pruebatest = Convert.ToString(diashoras);
            double diasOperados = (tsan.Days);// esto se debe a que dias operados en horas es muy exacto entoncees sacaba un dia menos porque ya estaban varias horas corriendo del otro dia
            if (totaldias > diasOperados)
            {
                totaldias = (tsan.Days) + 1;// esto se debe a que dias operados en horas es muy exacto entoncees sacaba un dia menos porque ya estaban varias horas corriendo del otro dia
            }
            pruebatest = pruebatest + "total de dias" + Convert.ToString(totaldias);
            //debemos obtener el total de intereses que genra el prestamo a la tasa flat
            dTotalInteresesTasaFLAT = totaldias * (dTasaFLAT * 12 / 360) * dMontoPrestamo;
            dTotalInteresesTasaFLAT = totaldias * (dTasaFLAT * 12 / 360) * dMontoPrestamo;
            pruebatest = pruebatest + "totaldeinterestasaflat" + Convert.ToString(dMontoPrestamo);

            pruebatest = pruebatest + "totaldeinterestasaflat" + Convert.ToString(dTotalInteresesTasaFLAT);

            //debemos encontrar la tasa con iva que quitandole el iva a cada pago de intereses
            Double iMaxIteraciones;
            Double iContador = 0;
            Double dMinimo;
            Double dMaximo;
            Double dTasaInsolutaIVAAleatoria;

            //hacemos una aprximacion del resultado los ejercicios 
            dTasaInsolutaIVAAleatoria = dTasaFLAT * 1.6;// esta cifra es de siempre 1.6  isa dijo
            pruebatest = pruebatest + "tasainsolutaivaaleatoria" + Convert.ToString(dTasaInsolutaIVAAleatoria);
            iMaxIteraciones = 50;
            dMinimo = 0;//dtasaflat
            dMaximo = dTasaInsolutaIVAAleatoria;
            Boolean bndEncontrado = false;
            pruebatest = pruebatest + "entrando al while";
            while (!bndEncontrado)
            {
                dTotalInteresestasaFlATIVA = pagoDeInteresEntrePeriodosQuitandoIva(dTasaInsolutaIVAAleatoria, iPlazo, dMontoPrestamo, 1, iPlazo, IVAActual);
                pruebatest = pruebatest + "dentro de whle dTotalInteresestasaFlATIVA" + Convert.ToString(dTotalInteresestasaFlATIVA);
              //  Double cont =dTotalInteresestasaFlATIVA;
              //  cont = Math.Round(cont,10);
                pruebatest = pruebatest + "cont preciision math roudn" + Convert.ToString(Math.Round(dTotalInteresesTasaFLAT, 5)+"otro"+ Math.Round(dTotalInteresestasaFlATIVA, 5));
                if (Math.Round(dTotalInteresesTasaFLAT,5) == Math.Round(dTotalInteresestasaFlATIVA,5))
                {
                    bndEncontrado = true;
                }
                else
                {
                    if (dTotalInteresestasaFlATIVA > dTotalInteresesTasaFLAT)
                    {
                        dTasaInsolutaIVAAleatoria = dMinimo + (dMaximo - dMinimo) / 2;
                        dMaximo = dTasaInsolutaIVAAleatoria;

                    }
                    else
                    {
                        dTasaInsolutaIVAAleatoria = dMaximo + (dMaximo - dMinimo) / 2;
                        dMinimo = dMaximo;
                        dMaximo = dTasaInsolutaIVAAleatoria;

                    }
                }

                iContador = iContador + 1;
                if (iContador > iMaxIteraciones)
                {
                    bndEncontrado = true;
                }
            }
            pruebatest = pruebatest + "return de esta" + Convert.ToString(dTasaInsolutaIVAAleatoria); 
            // InsolutoIvaIncluido = dTasaInsolutaIVAAleatoria;

            return pruebatest;
        }

        //
        private Double pagoDeInteresEntrePeriodosQuitandoIva(double dTasaMensual, int iPlazo, double dMontoPrestamo, int iPeriodoInicio, int iPeriodoFin,double dIVA)
        {
            Double dPagoMensual,dInteres,dCapital,dSaldoInsoluto;
            Double dSumaInteres=0, dSumaCapital;
            dPagoMensual = calcularMontoPagoInsoluto(dTasaMensual,iPlazo,dMontoPrestamo);
            dSaldoInsoluto = dMontoPrestamo;
            for (int i = 1; i <= iPlazo; i++)
            {
                dInteres = (dSaldoInsoluto * dTasaMensual)/(1+dIVA);
                dCapital = dPagoMensual - (dInteres * (1 + dIVA));
                if (i>= iPeriodoInicio & i <=iPeriodoFin)
                {
                    dSumaInteres = dSumaInteres + dInteres;

                }
                if(i>iPeriodoFin)
                {
                    break;
                }
                dSaldoInsoluto = dSaldoInsoluto - dCapital;
                
            }

         //   Double pagoDeInteresEntrePeriodosQuitandoIva = dSumaInteres;
            return dSumaInteres;
        }

        private Double calcularMontoPagoInsoluto(double dTasaMensual,int iPlazo,double dMontoPrestamo)
        {
            Double dPagoMensual;
            dPagoMensual = dMontoPrestamo * (dTasaMensual /(1- Math.Pow( (dTasaMensual + 1) , - iPlazo)));
           //Double calcularMontoPagoInsoluto = dPagoMensual;
            return dPagoMensual;
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
        //[HttpPost]
        public JsonResult CalculoSimuladorGeneral(int cantidad, int plazo)
        {
            Login obj = new Login() { cantidad = cantidad, plazo = plazo };
            Login obj2 = new Login() { cantidad = cantidad, plazo = plazo };
            //  string name = "gola";
            // obj.cantidad = cantidad;
            // obj.plazo = plazo;


            return Json(new List<Login>() { obj, obj2 });

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