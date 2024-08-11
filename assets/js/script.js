$(function(){
    console.log("(ᓀ‸ᓂ)");//Ver cuando esté cargado el script

    /* Funcion al hacer click en botón */
    $("#botonBuscar").click(function(event){
        event.preventDefault()
        validacionInput($("#inputNumero").val());
    });

    /* Validación de la consulta del usuario */
    // Verificar que se ingrese solamente números dentro del rango válido.
    function validacionInput(input){
        let inputInt = parseInt(input);
        if(inputInt > 0 && inputInt <= 731){
            consulaAPI(input);
        }else{
            alert("Error: Debe ingresar un número de 1 a 731");
        }
    };

    /* Plantilla de resultados */
    function textoResultado(image, nombre, conexiones, publicacion, ocupacion, primera, altura, peso, alias){
        return `<section class="card mb-3 col-6" style="max-width: 540px;">
                    <div class="row g-0">
                    <h5 class="card-title text-center"><b>SuperHero Encontrado</b></h5>
                        <div class="col-md-4">
                            <img src="${image}" class="img-fluid rounded" alt="Imagen de ${nombre}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
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
                </section>
                <section class="col-6" id="pieChart">
                </section>`;
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
                
                if(data.error){
                    alert("id "+id+" no válida");
                }
                else{
                    $("#resultado").empty();
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
                    renderizarGrafico(powerStats(data.powerstats), data.name);
                }
            },
            error: function(error){
                console.log("Error:");
                console.log(error);
                alert("Error al consultar API");
            }
        })
    };

    /* Para recorrer objeto */
    // Podría recorrer todo el objeto para recolectar datos, limpiando un poco el código del bloque de
    // texto a insertar, pero parece que no hacen falta todos esos datos.
    /*
    function imprimirDatos(dato, dataPoints1 = []){
        for(let entry of Object.entries(dato)){
            if(typeof entry[1] === 'object' && !Array.isArray(entry[1]) && entry[1] !== null){
                //element.append(`<p>${entry[0]}:</p>`);
                console.log(`${entry[0]}:`);
                imprimirDatos(entry[1], dataPoints1);
            }else{
                //element.append(`<p>${entry[0]}: ${entry[1]}</p>`)
                console.log(`${entry[0]}: ${entry[1]}`);
                switch (entry[0]){
                    case "intelligence":
                        // fall through
                    case "strength":
                        // fall through
                    case "speed":
                        // fall through
                    case "durability":
                        // fall through
                    case "power":
                        // fall through
                    case "combat":
                        dataPoints1.push({y: parseInt(entry[1]), indexLabel: entry[0]});
                        console.log(dataPoints1);
                        break;
                    default:
                        //console.log("Not power");
                        break;

                }
            }
        }
        //////////////////////     
        return dataPoints1;
        //////////////////////
    }
    */
   /* Recolectando datos para el gráfico mediante un for (ᓀ‸ᓂ)*/
    function powerStats(dato){
        let dataPoints1 = []
        for(let entry of Object.entries(dato)){
            dataPoints1.push({y: parseInt(entry[1]), indexLabel: entry[0]});
            //console.log(dataPoints1);
        }    
        return dataPoints1;
    }

    /* Función que genera el gráfico CanvasJS. Pide nombre para ponerlo en el título. */
    function renderizarGrafico(datos, nombre){
        let chart = new CanvasJS.Chart("pieChart",
            {
                title: {
                    text: "Estadísticas de Poder para "+nombre
                },
                legend: {
                    maxWidth: 350,
                    itemWidth: 120
                },
                data: [
                    {
                        type: "pie",
			            showInLegend: true,
			            legendText: "{indexLabel}",
                        dataPoints: datos
                    }
                ]
            });
        chart.render();
    }

    //consulaAPI(1000)
});