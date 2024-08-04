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
        //      o podría dejar que ingresen valores más altos y manejar lo que devuelva la api...
        //          (ᓀ‸ᓂ)
        //if(expresionValidar.test(input)){
        let inputInt = parseInt(input);
        if(inputInt > 0 && inputInt <= 731){
            consulaAPI(input);
        }else{
            //error
            console.log("(ᓀ‸ᓂ)𝓥𝓪𝓷𝓲𝓽𝓪𝓼 𝓥𝓪𝓷𝓲𝓽𝓪𝓽𝓾𝓶 𝓮𝓽 𝓸𝓶𝓷𝓲𝓪 𝓥𝓪𝓷𝓲𝓽𝓪𝓼");
        }
    };

    /* Plantilla de resultados */
    function textoResultado(image, nombre, conexiones, publicacion, ocupacion, primera, altura, peso, alias){
        return `<div class="card mb-3 col-6" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${image}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">SuperHero Encontrado</h5>
                                <p class="card-text">Nombre: ${nombre}</p>
                                <p class="card-text">Conexiones: ${conexiones}</p>
                                <p class="card-text">Publicado por: ${publicacion}</p>
                                <p class="card-text">Ocupación:${ocupacion} </p>
                                <p class="card-text">Primera Aparición: ${primera}</p>
                                <p class="card-text">Altura: ${altura}</p>
                                <p class="card-text">Peso: ${peso}</p>
                                <p class="card-text">Aliases: ${alias}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6" id="pieChart">
                    <img src="./assets/img/sh2.jpg" alt="placeholder" style="width: 100%;">
                </div>`;
    }

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
                //$("#resultado").append(`<p>${data.name}</p>`);
                $("#resultado").append(textoResultado(
                    data.image.url, 
                    data.name,
                    Object.values(data.connections)[0],
                    data.biography.publisher,
                    data.work.occupation,
                    Object.values(data.biography)[4],
                    data.appearance.height,
                    data.appearance.weight,
                    data.biography.aliases));
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