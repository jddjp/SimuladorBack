//import { serialize } from "v8";

$(function () {
    $('#cantidad,#plazo,#plazoR,#frecuencia').on("keyup", function () {
        console.log($("#cantidad").val());
        console.log($("#plazo").val());
        console.log($("#plazoR").val());
        console.log($("#frecuencia").val());
       // alert("holaaaaaaaaaaa");
        var slider2 = document.getElementById("cantidadRange");//range
        var output = document.getElementById("cantidadR");//salida
        var inputplazo = document.getElementById("cantidad");//input
        //  output.innerHTML = slider2.value;
        $("#cantidadRange").val($("#cantidad").val());
        output.innerHTML = $("#cantidad").val();
        inputplazo.innerHTML = $("#cantidad").val();

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
                cantidad: $("#cantidad").val(),
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
                //  vardump(res);
                // $('#cantidad').val(res.d);

                console.log("this alert");
                //  console.log(res[cantidad]);
                $('#res').html(res);
                document.getElementById("prueba").innerHTML = "<label> " + res[0].cantidad + "</label>";
                document.getElementById("prueba2").innerHTML = "<label> " + res[0].plazo + "</label>";
                document.getElementById("subtotal").innerHTML = "<label> " + res[0].subtotal + "</label>";
                document.getElementById("total").innerHTML = "<label> " + res[0].total + "</label>";

                document.getElementById("diasOperados").innerHTML = "<label> " + res[0].diasOperados + "</label>";
                document.getElementById("frecuencia1").innerHTML = "<label> " + res[0].frecuencia + "</label>";
                document.getElementById("fechafin").innerHTML = "<label> " + res[0].fechafin + "</label>";
                document.getElementById("interes").innerHTML = "<label> " + res[0].interes + "</label>";
                document.getElementById("capital").innerHTML = "<label> " + res[0].capital + "</label>";
                document.getElementById("interesTotal").innerHTML = "<label> " + res[0].interesTotal + "</label>";
                document.getElementById("interesDia").innerHTML = "<label> " + res[0].interesDia + "</label>";
                document.getElementById("ivaInteres").innerHTML = "<label> " + res[0].ivaInteres + "</label>";
                document.getElementById("iva").innerHTML = "<label> " + res[0].iva + "</label>";
                document.getElementById("comision").innerHTML = "<label> " + res[0].comision + "</label>";
                document.getElementById("seguro").innerHTML = "<label> " + res[0].seguro + "</label>";
                document.getElementById("fechaPrimerpago").innerHTML = "<label> " + res[0].fechaPrimerpago + "</label>";
                document.getElementById("fechadeOperacion").innerHTML = "<label> " + res[0].fechadeOperacion + "</label>";
                document.getElementById("fechainicio").innerHTML = "<label> " + res[0].fechainicio + "</label>";
                document.getElementById("pruebatest").innerHTML = "<label> " + res[0].prueba + "</label>";

                //  <label>mi cantidad es: @Model.cantidad<br /></label>fechadeOperacion
                //    <label>mi plazo es: @Model.plazo<br /></label>
            },
            error: function (res) {
                console.log(res);
                console.log("error");
            }
        });
    });
}
)



$(function () {
    $('#cantidad,#plazo,#plazoR,#frecuencia,#cantidadRange').on("change", function () {
        console.log($("#cantidad").val());
        console.log($("#plazo").val());
        console.log($("#plazoR").val());
        console.log($("#frecuencia").val());
      //  alert("onchage de range");
        // alert("holaaaaaaaaaaa");
        var slider2 = document.getElementById("cantidadRange");//range
        var output = document.getElementById("cantidadR");//salida
        var inputplazo = document.getElementById("cantidad");//input
        //  output.innerHTML = slider2.value;
     //   $("#cantidadRange").val($("#cantidad").val());
        output.innerHTML = $("#cantidadRange").val();
        inputplazo.innerHTML = $("#cantidadRange").val();
        $("#cantidadRange").val($("#cantidadRange").val());
        $("#cantidad").val($("#cantidadRange").val());
        //aumento
        var slider3 = document.getElementById("plazoR");//range
        var output3 = document.getElementById("plazoRang");//salida
        var inputplazo3 = document.getElementById("plazo");//input
        //  output.innerHTML = slider2.value;
      //  $("#plazoR").val($("#plazo").val());
        output3.innerHTML = $("#plazo").val();
        inputplazo3.innerHTML = $("#plazoR").val();
        $("#plazoR").val($("#plazoR").val());
        $("#plazo").val($("#plazoR").val());

        //final


        $.ajax({
            type: "post",
            url: "https://localhost:44329/Login/calculoSimuladorfecha/",
            data: {
                cantidad: $("#cantidad").val(),
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
                //  vardump(res);
                // $('#cantidad').val(res.d);

                console.log("this alert");
                //  console.log(res[cantidad]);
                $('#res').html(res);
                document.getElementById("prueba").innerHTML = "<label> " + res[0].cantidad + "</label>";
                document.getElementById("prueba2").innerHTML = "<label> " + res[0].plazo + "</label>";
                document.getElementById("subtotal").innerHTML = "<label> " + res[0].subtotal + "</label>";
                document.getElementById("total").innerHTML = "<label> " + res[0].total + "</label>";

                document.getElementById("diasOperados").innerHTML = "<label> " + res[0].diasOperados + "</label>";
                document.getElementById("frecuencia1").innerHTML = "<label> " + res[0].frecuencia + "</label>";
                document.getElementById("fechafin").innerHTML = "<label> " + res[0].fechafin + "</label>";
                document.getElementById("interes").innerHTML = "<label> " + res[0].interes + "</label>";
                document.getElementById("capital").innerHTML = "<label> " + res[0].capital + "</label>";
                document.getElementById("interesTotal").innerHTML = "<label> " + res[0].interesTotal + "</label>";
                document.getElementById("interesDia").innerHTML = "<label> " + res[0].interesDia + "</label>";
                document.getElementById("ivaInteres").innerHTML = "<label> " + res[0].ivaInteres + "</label>";
                document.getElementById("iva").innerHTML = "<label> " + res[0].iva + "</label>";
                document.getElementById("comision").innerHTML = "<label> " + res[0].comision + "</label>";
                document.getElementById("seguro").innerHTML = "<label> " + res[0].seguro + "</label>";
                document.getElementById("fechaPrimerpago").innerHTML = "<label> " + res[0].fechaPrimerpago + "</label>";
                document.getElementById("fechadeOperacion").innerHTML = "<label> " + res[0].fechadeOperacion + "</label>";
                document.getElementById("fechainicio").innerHTML = "<label> " + res[0].fechainicio + "</label>";
                document.getElementById("pruebatest").innerHTML = "<label> " + res[0].prueba + "</label>";

                //  <label>mi cantidad es: @Model.cantidad<br /></label>fechadeOperacion
                //    <label>mi plazo es: @Model.plazo<br /></label>
            },
            error: function (res) {
                console.log(res);
                console.log("error");
            }
        });
    });
}
)






