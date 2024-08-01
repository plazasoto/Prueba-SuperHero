$(function(){
    //console.log("ᓀ‸ᓂ");

    /* Validación de la consulta del usuario */
    // Verificar que se ingrese solamente números
    function validacionInput(){

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
            },
            error: function(error){
                console.log(error);
            }
        })
    };

    //consulaAPI("1");

});