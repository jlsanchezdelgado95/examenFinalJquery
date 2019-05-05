window.onload = function(){
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/estados",
        success: function (estados) {
            $("#estados").html('');
            estados.map(elemento =>{
                $("#estados").append("<div id='estado' class='caja estado'>" + elemento.nombre + "</div>")
            });
        }
    });
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/tareas",
        success: function (tareas) {
            $("#tareas").html('');
            tareas.map(elemento =>{
                $("#tareas").append("<div class='caja'><p>" + elemento.id + "<p>" + elemento.nombre + "<p>" + elemento.estado + "</div>")
            });
        }
    });
    $("#estados").on("click","div", function () {//FUNCION PARA PINTAR tareas con un estado
        $("#tareas").html('');
        estado = $(this).text();
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/tareas?estado=" + estado + "",
            success: function (json) {
                json.map(elemento => {
                    console.log(elemento.id);
                    $("#tareas").append("<div class='caja' href='#'><p>" + elemento.id + "</p><p>" + elemento.nombre + "</p><p>" + elemento.estado +
                        "</p></div>");
                });
            }
        });
    })
    $("#btnNuevaTarea").on("click", function(){
        $("#modalTarea").modal("show");
    });
    $("#btnGrabar").on("click", function (){
        datos = $('#ficha').serialize();
        tarea = $("#id").val();
        console.log(tarea);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/tareas/",
            data: datos,
            success: function (response) {
                alert("FUNCIONA");
            }
        });
        $("#modalArticulo").modal("hide");
        location.reload();
    });
};