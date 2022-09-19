window.addEventListener('DOMContentLoaded', (e) => {
    /**Cargamos los html de header y footer en la página a través de load.
     * Debemos indicar el id (#...) de donde queremos cargar los archivos.
     */
    $("#cabecera").load("parts/header.html");
    $("#pie-pagina").load("parts/footer.html");

    /**Inicio ciclo for para poder visualizar las imagenes en el visualizador
     * En este caso utilizamos los primeros 150 pokemon disponibles en la api
    */
    for (let i = 1; i < 151; i++) {
        /**Vamos agregando las imagenes con append y establecemos la variable i para obtener el id unico por pokemon
         * Cada imagen va dentro de un div con la clase mostrarPoke, asi podemos asignar estilo.
         * A cada imagen se le agrega un id y un alt obtenidos con la variable i del ciclo for.
         */
        $('#visualizador').append('<div class="mostrarPoke">' + '<img  id="' + i + '"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + i + '.png" alt="pokemon' + i + '">' + '<h6>#' + i + '</h6>' + '</div>');
    }
    //Cuando realizamos clic en la imagen le asignamos a la variable nroPoke el id de la imagen.
    $('img').click(function () {
        let nroPoke = this.id;
        //A traves de la variable obtenemos los datos basicos de cada pokemon.
        $.get('https://pokeapi.co/api/v2/pokemon/' + nroPoke + '/', function (respuesta) {
            let imagen = respuesta.sprites.other.home.front_default;
            let nombre = respuesta.name;
            let peso = respuesta.weight;
            let movimiento1 = respuesta.moves[0].move.name;
            let movimiento2 = respuesta.moves[1].move.name;
            let tipo = respuesta.types[0].type.name;
            let habilidad = respuesta.abilities[0].ability.name;
            /**Mostrar los datos obtenidos en el divisor de detalles
             * Utilizamos html para que con cada clic se limpie el espacio y muestre el nuevo pokemon seleccionado
             * Se debe agregar un salto de linea en el primer valor, para separar de la imagen el resto de datos*/
            $('.detalles').html('<img class="rounded clickImagen" src="' + imagen + '" alt="' + nombre + '">' + '<br>' + "Nombre: " + '<h2>' + nombre + '</h2>' + "Peso: " + '<h2>' + peso + '</h2>' + "Tipo: " + '<h2>' + tipo + '</h2>' + "Habilidad: " + '<h2>' + habilidad + '</h2>' + 'Movimiento 1: ' + '<h2>' + movimiento1 + '</h2>' + 'Movimiento 2: ' + '<h2>' + movimiento2 + '</h2>');
        }, 'json');
    });

    /**Función asignada al boton del buscador*/
    $('#btnBuscar').click(function () {
        let nroPokemon = $('#pokemon').val();

        //A traves de la variable obtenemos los datos basicos de cada pokemon.
        $.get('https://pokeapi.co/api/v2/pokemon/' + nroPokemon + '/', function (respuesta) {
            let imagen = respuesta.sprites.other.home.front_default;
            let nombre = respuesta.name;
            let peso = respuesta.weight;
            let movimiento1 = respuesta.moves[0].move.name;
            let movimiento2 = respuesta.moves[1].move.name;
            let tipo = respuesta.types[0].type.name;
            let habilidad = respuesta.abilities[0].ability.name;
            /**Mostrar los datos obtenidos en el divisor de detalles
             * Utilizamos html para que con cada clic se limpie el espacio y muestre el nuevo pokemon seleccionado
             * Se debe agregar un salto de linea en el primer valor, para separar de la imagen el resto de datos*/
            $('.detalles').html('<img class="rounded clickImagen" src="' + imagen + '" alt="' + nombre + '">' + '<br>' + "Nombre: " + '<h2>' + nombre + '</h2>' + "Peso: " + '<h2>' + peso + '</h2>' + "Tipo: " + '<h2>' + tipo + '</h2>' + "Habilidad: " + '<h2>' + habilidad + '</h2>' + 'Movimiento 1: ' + '<h2>' + movimiento1 + '</h2>' + 'Movimiento 2: ' + '<h2>' + movimiento2 + '</h2>');
        }, 'json');

    });

});