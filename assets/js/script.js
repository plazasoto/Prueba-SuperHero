$(function(){
    console.log("(ᓀ‸ᓂ)");

    /* Funcion al hacer click en botón */
    $("#botonBuscar").click(function(event){
        event.preventDefault()
        //console.log("(ᓀ‸ᓂ)Vanitas vanitatum et omnia vanitas");
        console.log($("#inputNumero").val());
        validacionInput($("#inputNumero").val());
    });

    /* Validación de la consulta del usuario */
    // Verificar que se ingrese solamente números
    function validacionInput(input){
        //expresionValidar = /^[1-9][0-9]*$/;//números enteros mayores a 0
        //el número debe ser de 1 a 731 (valores de la api)
        //if(expresionValidar.test(input)){
        let inputInt = parseInt(input);
        if(inputInt > 0 && inputInt <= 731){
            consulaAPI(input);
        }else{
            //error
            console.log("(ᓀ‸ᓂ)𝓥𝓪𝓷𝓲𝓽𝓪𝓼 𝓥𝓪𝓷𝓲𝓽𝓪𝓽𝓾𝓶 𝓮𝓽 𝓸𝓶𝓷𝓲𝓪 𝓥𝓪𝓷𝓲𝓽𝓪𝓼");
        }
    };

    /* Obtener información de la API */
    const ACCESS_TOKEN = "125466709f3d67e3c8fedb2a691cddd7";
    function consulaAPI(id){
        $.ajax({
            url: `https://superheroapi.com/api.php/${ACCESS_TOKEN}/${id}`,//
            type: "GET",
            dataType: "json",
            success: function(data){
                console.log(data);
                $("#resultado").empty();
                $("#resultado").append(`<p>${data.name}</p>`);
            },
            error: function(error){
                console.log("Error:");
                console.log(error);

                $("#resultado").append(`<p>---ERROR---</p>`);
            }
        })
    };

    //consulaAPI("1");

});