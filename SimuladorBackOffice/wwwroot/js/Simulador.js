//$("#cantidad").maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', affixesStay: false });
var sliderC = document.getElementById("cantidadRange");
var outputCantidad = document.getElementById("cantidadR");
outputCantidad.innerHTML = sliderC.value;

sliderC.oninput = function () {
    outputCantidad.innerHTML = this.value;
};

var slider2 = document.getElementById("plazoR");
var output = document.getElementById("plazoRang");
output.innerHTML = slider2.value;

slider2.oninput = function () {
    output.innerHTML = this.value;
};


var arrayTab = [];
var ta = [];
$(function ()
 {
    $('#cantidad,#plazo,#plazoR,#frecuencia').on("keyup", function () {
       
        var input = document.getElementById('cantidad');
     //   var input2 = document.getElementById('cantidadR');
        //var input = document.getElementById('cantidad');
        if (input.inputmask)
            console.log(input.inputmask.unmaskedvalue());
        cantidad2 = input.inputmask.unmaskedvalue();
        console.log($("#cantidad").val());
        console.log($("#plazo").val());
        console.log($("#plazoR").val());
        console.log($("#frecuencia").val());
        $('#total').remove();//eliminar y limpiar input
        $('#seguro').remove();//eliminar y limpiar input
        $('#comision').remove();//eliminar y limpiar input
        $('#FecInicio').remove();//eliminar y limpiar input
        $('#FecVence').remove();//eliminar y limpiar input
        
       // var slider2 = document.getElementById("cantidadRange");//range
        var output = document.getElementById("cantidadR");//salida
        var inputplazo = cantidad2;// document.getElementById("cantidad");//input
        //  output.innerHTML = slider2.value;
        $("#cantidadRange").val(cantidad2);//)$("#cantidad").val());
        $("#cantidadR").val(cantidad2);//)$("#cantidad").val());

      //  output.innerHTML = $(cantidad2);//"#cantidad").val();
        inputplazo.innerHTML = $(cantidad2);//"#cantidad").val();

        //aumento
        var slider3 = document.getElementById("plazoR");//range
        var output3 = document.getElementById("plazoRang");//salida
        var inputplazo3 = document.getElementById("plazo");//input
        //  output.innerHTML = slider2.value;
        $("#plazoR").val($("#plazo").val());
        output3.innerHTML = $("#plazo").val();
        inputplazo3.innerHTML = $("#plazo").val();
        //final


        $.ajax({
            type: "post",
            url: "https://localhost:44329/Login/calculoSimuladorfecha/",
            data: {
                cantidad: cantidad2,//$("#cantidad").val(),
                plazo: $("#plazo").val(),
                frecuencia: $("#frecuencia").val(),
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                console.log(res[0].cantidad);
                console.log(res[0].plazo);
                console.log(res[0].frecuencia);
                console.log(res[0].day);
                console.log(res[0].horas);

                console.log("this alert");
                $('#res').html(res);
             //   document.getElementById("total1").innerHTML = "<label> " + res[0].total + "</label>";
                $("#total1").val(res[0].total);
               // $("<input>").attr("type", "hidden").appendTo("form"); 
                $("<input>").attr({
                    name: "total",
                    id: "total",
                    type: "hidden",
                    value: res[0].total
                }).appendTo("form");
                $("<input>").attr({
                    name: "seguro",
                    id: "seguro",
                    type: "hidden",
                    value: res[0].seguro
                }).appendTo("form");
                $("<input>").attr({
                    name: "comision",
                    id: "comision",
                    type: "hidden",
                    value: res[0].comision
                }).appendTo("form");
                $("<input>").attr({
                    name: "FecInicio",
                    id: "FecInicio",
                    type: "hidden",
                    value: res[0].fechainicio
                }).appendTo("form");
                $("<input>").attr({
                    name: "FecVence",
                    id: "FecVence",
                    type: "hidden",
                    value: res[0].fechafin
                }).appendTo("form");
                $('#idtabla').remove();//eliminar y limpiar input
                $('#concretar_oferta').remove();//eliminar y limpiar input

            },
            error: function (res) {
                console.log(res);
                console.log("error");
            }
        });
    });
}
);



$(function ()
{
    $('#cantidad,#plazo,#plazoR,#frecuencia,#cantidadRange').on("change", function () {

      //  var input = document.getElementById('cantidad');
      //  if (input.inputmask)
      //      console.log(input.inputmask.unmaskedvalue());
      //  cantidad2 = input.inputmask.unmaskedvalue();
        console.log($("#cantidadRange").val());
        console.log($("#cantidad").val());
        console.log($("#plazo").val());
        console.log($("#plazoR").val());
        console.log($("#frecuencia").val());
        $('#total').remove();//eliminar y limpiar input
        $('#seguro').remove();//eliminar y limpiar input
        $('#comision').remove();//eliminar y limpiar input
        $('#FecInicio').remove();//eliminar y limpiar input
        $('#FecVence').remove();//eliminar y limpiar input

        var slider2 = document.getElementById("cantidadRange");//range
        var output = document.getElementById("cantidadR");//salida
        var inputplazo = document.getElementById("cantidad");//document.getElementById("cantidad");//input

        output.innerHTML = $("#cantidadRange").val();
        inputplazo.innerHTML = $("#cantidadRange").val();

        $("#cantidadRange").val($("#cantidadRange").val());
        $("#cantidad").val($("#cantidadRange").val());
        //aumento
        var slider3 = document.getElementById("plazoR");//range
        var output3 = document.getElementById("plazoRang");//salida
        var inputplazo3 = document.getElementById("plazo");//input

        output3.innerHTML = $("#plazoR").val();
        inputplazo3.innerHTML = $("#plazoR").val();
        $("#plazo").val($("#plazoR").val());
        $("#plazoR").val($("#plazoR").val());


        //final

        var input = document.getElementById('cantidad');
        if (input.inputmask)
            console.log(input.inputmask.unmaskedvalue());
        cantidad2 = input.inputmask.unmaskedvalue();
        

        $.ajax({
            type: "post",
            url: "https://localhost:44329/Login/calculoSimuladorfecha/",
            data: {
                cantidad:cantidad2,// $("#cantidad").val(),
                plazo: $("#plazo").val(),
                frecuencia: $("#frecuencia").val(),
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                console.log(res[0].cantidad);
                console.log(res[0].plazo);
                console.log(res[0].frecuencia);
                console.log(res[0].day);
                console.log(res[0].horas);
                $('#res').html(res);
                $("#total1").val(res[0].total);
                $("<input>").attr({
                    name: "total",
                    id: "total",
                    type: "hidden",
                    value: res[0].total
                }).appendTo("form");
                $("<input>").attr({
                    name: "seguro",
                    id: "seguro",
                    type: "hidden",
                    value: res[0].seguro
                }).appendTo("form");
                $("<input>").attr({
                    name: "comision",
                    id: "comision",
                    type: "hidden",
                    value: res[0].comision
                }).appendTo("form");
                $("<input>").attr({
                    name: "FecInicio",
                    id: "FecInicio",
                    type: "hidden",
                    value: res[0].fechainicio
                }).appendTo("form");
                $("<input>").attr({
                    name: "FecVence",
                    id: "FecVence",
                    type: "hidden",
                    value: res[0].fechafin
                }).appendTo("form");
                $('#idtabla').remove();//eliminar y limpiar input
                $('#concretar_oferta').remove();//eliminar y limpiar input
               // alert("destruido2")
            },
            error: function (res) {
                console.log(res);
                console.log("error");
            }
        });
    });
}
);









$("#form-lead").submit(function (event) {
    //Double cantidad, Double seguro, Double comision, int plazo, int frecuencia, DateTime FecVence, DateTime FecInicio
    var input = document.getElementById('cantidad');
    if (input.inputmask)
        console.log(input.inputmask.unmaskedvalue());
    cantidad2 = input.inputmask.unmaskedvalue();

    plazo = $("#plazo").val();
    frecuencia = $("#frecuencia").val();
    seguro = $("#seguro").val();
    comision = $("#comision").val();
    FecVence = $("#FecVence").val();
    FecInicio = $("#FecInicio").val();
    // Prevent default posting of form - put here to work in case of errors
    console.log("llll letrero");
    event.preventDefault();
    var $form = $(this);
    console.log($form);
    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
    // Serialize the data in the form
    var serializedData = $form.serialize();
    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    // $inputs.prop("disabled", true);
    $.ajax({
        url: "https://localhost:44329/Login/crearTablaAmortizaciones",
        type: "post",
        data: {
            cantidad: cantidad2,
            plazo: $("#plazo").val(),
            frecuencia: $("#frecuencia").val(),
            seguro: $("#seguro").val(),
            comision: $("#comision").val(),
            FecVence: $("#FecVence").val(),
            FecInicio: $("#FecInicio").val(),
            
        },
        dataType: 'json',
            // serializedData,
        success: function (res) {
          //  alert('success');
            console.log(res.length);
            console.log(res)
            $('#res').html(res);
            $('#idtabla').remove();//actualizar tabla
            $('#download').remove();//actualizar boton concretar_oferta
            $('#concretar_oferta').remove();//actualizar boton concretar_oferta
            var jQueryTabla = $("<table class='table-bordered table-striped mb-0'></table>");
            jQueryTabla.attr({
                id: "idtabla"
            });
            $('#contenedor').append(jQueryTabla);
           // Int16Array i = 0;
            var fila = "<tr><th class='currency' scope='col'>N.Pago</th><th scope='col'>Pago total</th><th scope='col'>Fecha pago</th><tr>";//<th scope='col'>Capital<th><th scope='col'>subtotal<th><th scope='col'>Iva<th><th scope='col'>Seguro<th><th scope='col'>comision<th>
            $('#idtabla').append(fila);
            for (i = 0; i < res.length; i++)
            {
                arrayTab[i] = res[i];
                var filas = "<tr class='currency'><td>" + (i + 1) + "</td><td class='currency'>" + "<input readonly='readonly' class='currency' value=" + res[i].total + "></td><td>" + res[i].fechafin + "</td><tr>";//"<th><th>" + res[i].capital + "<th><th type='hidden'>" + res[i].subtotal + "<th><th>" + res[i].iva + "<th><th>" + res[i].seguro + "<th><th>" + res[i].comision + "<th><th>" 
                $('#idtabla').append(filas);
            }
            var jQueryBoton = $("<button onclick='myFuncion()'>Descargar</button>");
            jQueryBoton.attr({
                id: "concretar_oferta"
            });
            $('#zondescargas').append(jQueryBoton);
          //  var button = '<button id="concretar_oferta" onclick="myFuncion()">Descargar</button>';
     //   $('#contenedor').append(button);           
//Double seguro=1, Double comision=1, int plazo, int frecuencia, DateTime FecVence, DateTime FecInicio)
        },
        error: function () {
            alert('Algo saliÃ³ mal, intÃ©ntalo de nuevo.')
        }
    });
    // Fire off the request to /form.php   
  });










//descarga pdf
//$('#download').click(function (event) {
console.log("holi");
console.log(arrayTab);
$("#concretar_oferta").on("click", myFuncion)
function myFuncion() {
    t = ta.length;
    var aux = [];
    if (ta != null & t !=0) {
    //    alert('distinto');
        var tab = document.getElementById("idtabla");
        console.log($("#idtabla").val());
        console.log(ta);
        console.log(tab);
        console.log(arrayTab);

        console.log(arrayTab[0]);
        console.log(arrayTab.length);
        for (i = 0; i < ta.length; i++) {
            console.log(ta);
        }
        console.log();
        console.log(arrayTab[0].capital);

        console.log(ta);
        console.log(tab);
        console.log(arrayTab[0].amortizacion);
        console.log(ta);

        //
        var options = {
        };
        var doc = new jsPDF('p', 'pt');
        var elementHTML = $('#forma').html();
        var specialElementHandlers = {
            '#contenedor': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 400,
            'elementHandlers': specialElementHandlers
        });
        //tabla


        var columns = ["n.pago", "capital", "interes", "iva", "seguro", "comision", "fecha pago", "pago total"];
        //   var data = [
        //       [1, "Hola", "hola@gmail.com", "Mexico"],
        //       [2, "Hello", "hello@gmail.com", "Estados Unidos"],
        //       [3, "Otro", "otro@gmail.com", "Otro"]
        //   ];
        //    letras
        //  var c= arrayTab[0].capital;
        doc.setFontSize(22);
        doc.text(40, 40, 'Datos del credito');
        //   doc.setFontSize(15);
        //   doc.text(20, 80, 'Monto solicitado');
        //   doc.text(150, 80,c );
        //tabla
        doc.autoTable(columns, arrayTab,
            { margin: { top: 100 } }//top 25
        );

       

        doc.save('sample-document.pdf');

        console.log(arrayTab);

    } else {
     //   alert('igual');
        var tab = document.getElementById("idtabla");
        console.log($("#idtabla").val());
        console.log(ta);
        console.log(tab);
        console.log(arrayTab);
        console.log(arrayTab.length);

        console.log();
        console.log(arrayTab[0].capital);

        for (i = 0; i < arrayTab.length; i++) {
            ta = [
                arrayTab[i] = [arrayTab[i].numamortizacion, arrayTab[i].capital, arrayTab[i].interes, arrayTab[i].iva, arrayTab[i].seguro, arrayTab[i].comision, arrayTab[i].fechafin, arrayTab[i].total]
            ];
        }
        console.log(ta);
        console.log(tab);
        console.log(arrayTab[0].amortizacion);
        console.log(ta);
  
        var options = {
        };
        var doc = new jsPDF('p', 'pt');
        var elementHTML = $('#forma').html();
        var specialElementHandlers = {
            '#contenedor': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 400,
            'elementHandlers': specialElementHandlers
        });
        //tabla
        var columns = ["n.pago", "capital", "interes", "iva", "seguro", "comision", "fecha pago", "pago total"];

        doc.setFontSize(22);
        doc.text(40, 40, 'Datos del credito');
        //   doc.setFontSize(15);
        //   doc.text(20, 80, 'Monto solicitado');
        //   doc.text(150, 80,c );
        //tabla
        doc.autoTable(columns, arrayTab,
            { margin: { top: 100 } }//top 25
        );
        //    doc.triangle(60, 100, 60, 120, 80, 110, 'FD');
        doc.save('sample-document.pdf');
        console.log(arrayTab);

    }
  
};




$('.currency').inputmask("numeric",
    {
        radixPoint: ".",
        groupSeparator: ",",
        digits: 2,
        autoGroup: true,
        prefix: '$',
        rightAling: false,
        oncleared: function (e) {
            $(e.target).val('');
        }

    }
);




