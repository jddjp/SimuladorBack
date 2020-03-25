using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SimuladorBackOffice.Models
{
    public class Login
    {
        [BindProperty]
        public InputModel Input { get; set; }
        [TempData]
        public string ErrorMessage { get; set; }
        public int cantidad { get; set; }
        public int plazo { get; set; }
        public int frecuencia { get; set; }

        public int amortizacion { get; set; }
        public double diasOperados { get; set; }
        public double total { get; set; }
        public double subtotal { get; set; }
        public string day { get; set; }
        public Double interes { get; set; }
        public Double interesTotal { get; set; }
        public Double interesDia { get; set; }
        public Double ivaInteres { get; set; }
        public double iva { get; set; }
        public Double capital { get; set; }
        public DateTime fechafin { get; set; }
        public DateTime fechainicio { get; set; }
        public Double comision { get; set; }
        public Double seguro { get; set; }
        public DateTime fechaPrimerpago { get; set; }
        public string fechadeOperacion { get; set; }
        public string prueba { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

        }
    }
}
