window.addEventListener('DOMContentLoaded', (e) => {
    /**Cargamos los html de header y footer en la página a través de load.
     * Debemos indicar el id (#...) de donde queremos cargar los archivos.
     */
    $("#cabecera").load("parts/header.html");
    $("#pie-pagina").load("parts/footer.html");

    /**Creamos la variable form a través del id del formulario, con ello podemos utilizar posteriormente la función reset.*/
    let form = document.getElementById('form-id-sug');
    /**Con esta variable le agregamos la funcionalidad al boton, permitiendo enviar datos a través del click*/
    let boton = document.getElementById("btn-enviar");
    boton.addEventListener("click", (ev) => {
        /**Probar el código, si ocurre un evento inesperado ejecutar catch */
        try {
            /**En este caso, llamamos a la funciones para poder tomar un valor en particular*/
            let nombreApellido = getNombreApellido();
            let email = getCorreo();
            let eleccion = getEleccion();
            let sugerencia = getSugerencia();
            let comentario = getComentario();

            let observador = {
                nombre_completo: nombreApellido,
                email,
                eleccion,
                sugerencia,
                comentario
            };
            console.dir(observador);
            /**Linea 34: llamamos a la función guardar contacto.
             * Linea 35: Reseteamos el formulario para que quede limpio.
             * Linea 36: En caso de que quede un mensaje de error, ocultamos el bloque nuevamente.
             */
            guardarObservador(observador);
            form.reset();
            document.getElementById("form-mensaje-error").style.display = "none";
        } catch (e) {
            mostrarError(e.message);
        }
    });

    /***************************************************************************/

    async function guardarObservador(observador) {
        const url = "https://curso-frontend-ef65a-default-rtdb.firebaseio.com/observadores.json";
        /** method: Método HTTP que utilizaremos, en este caso método POST. 
        *   body: cuerpo del mensaje, indicamos el tipo de dato que utilizaremos, en este caso es en formato tipo JSON y los vamos a convertir en String.*/
        const respuesta = await fetch(url, {
            method: "POST",
            body: JSON.stringify(observador)
        });
        const data = await respuesta.json();
        /**Al completar el proceso de guardar al observador, le enviamos un mensaje de éxito. */
        swal("Gracias", "Su mensaje fue enviado correctamente", "success");
    }


    /**Creamos funciones para recuperar los valores del formulario a través de su id o name*/
    /***************************************************************************/

    function getNombreApellido() {
        /**Obtenemos el valor del input a través del id.
         * Generamos una condicional para evaluar un posible error.
         */
        let inputNombreApellido = document.getElementById("nombre-apellido").value;

        if (inputNombreApellido.length < 1) {
            throw new Error("Ingrese su nombre completo, debe incluir mínimo 5 caracteres.")
            /* Si el largo del texto ingresado es menor a 1 nos muestra un mensaje de error */
        }
        return inputNombreApellido;
    }

    /***************************************************************************/

    function getCorreo() {
        /**Obtenemos el valor del input a través del id.
         * Generamos una condicional para evaluar un posible error.
         */
        let inputCorreo = document.getElementById("correo").value;

        if (inputCorreo.length < 1) {
            throw new Error("Ingrese un correo electrónico válido.")
            /* Si el largo del texto ingresado es menor a 1 nos muestra un mensaje de error */
        }
        return inputCorreo;
    }

    /***************************************************************************/

    function getSugerencia() {
        /**QuerySelector devuelve la primera etiqueta que encuentra dentro del selector
         * Agregamos :checked (correspondiente a una sintaxis de CSS, pseudoclase), se encuentra disponible en querySelector y querySelectorAll. 
         * Permite seleccionar el valor marcado en un formulario, en este caso a través del name. 
         */
        let inputSugerencia = document.querySelectorAll("input[name='sugerencia']:checked");
        /**Cremos el array en donde guardaremos posteriormente las sugerencias seleccionadas. */
        let arrSugerencia = [];

        /**Para recorrer utilizamos "FOR" y en cada vuelta revisa si se ha seleccionado un elemento.
         * Si encuentra un elemento seleccionado, lo agrega al array creado con anterioridad.
         * Se puede seleccionar mas de uno.
         */
        for (let i = 0; i < inputSugerencia.length; i++) {
            const motivos = inputSugerencia[i].value;
            arrSugerencia.push(motivos);
        }

        if (inputSugerencia.length < 1) {
            throw new Error("Debe seleccionar al menos un tipo de sugerencia.");
            /* Si no se marca un elemento nos muestra un mensaje de error */
        }
        return arrSugerencia;
    }

    /***************************************************************************/
    function getEleccion() {
        /**QuerySelector devuelve la primera etiqueta que encuentra dentro del selector
         * Agregamos :checked (correspondiente a una sintaxis de CSS, pseudoclase), se encuentra disponible en querySelector y querySelectorAll. 
         * Permite seleccionar el valor marcado en un formulario, en este caso a través del name. 
         */
        let inputEleccion = document.querySelector("input[name='eleccion']:checked")
        if (inputEleccion == null) {
            throw new Error("Debe seleccionar el mockup a evaluar.");
            /* Si no se marca un elemento nos muestra un mensaje de error */
        }
        /**Tomamos el valor del elemento seleccionado y retornamos la elección.*/
        const eleccion = inputEleccion.value;
        return eleccion;
    }

    /***************************************************************************/

    function getComentario() {
        /**Obtenemos el valor del input a través del id.
         * Generamos una condicional para evaluar un posible error.
         */
        let inputComentario = document.getElementById("textarea2").value;

        if (inputComentario.length < 1) {
            throw new Error("Ingrese un mensaje especificando los detalles de su sugerencia.")
            /* Si el largo del texto ingresado es menor a 1 nos muestra un mensaje de error */
        }
        return inputComentario;

    }

    /***************************************************************************/

    /**Esta función nos permite mostrar un mensaje, cuando hacemos uso de la misma en la sección de catch.*/
    function mostrarError(mensajeDeError) {
        /**En esta linea podemos modificar el estado del style de un elemento, a través del document.getElementById
         * En este caso, tenemos un div el cual se encuentra oculto, al cambiar el style a "block" lo dejamos visible al usuario.
        */
        document.getElementById("form-mensaje-error").style.display = "block";
        /**Con document.querySelector podemos recuperar a través del CSS, en este caso utilizamos el id (#...)
         * Le indicamos a través del id la ubicación donde queremos crear un nodo, en este caso en la etiqueta <ul>
        */
        const ul = document.querySelector("#form-mensaje-error ul");
        /**Con document.createElement creamos un elemento, en este caso una etiqueta HTML <li> */
        ul.innerHTML = "";
        const li = document.createElement("li");
        /**Con document.createTextNode creamos un nodo interno, en este caso sería el contenido de la etiqueta <li> */
        const liText = document.createTextNode(mensajeDeError);
        /**Con appendChild indicamos donde queremos guardar las variables creadas.
         * Caso 1, guardarmos dentro de la etiqueta <li> el contenido de la variable liText.
         * Caso 2, guardarmos dentro de la etiqueta <ul> la variable li, con su respectiva etiqueta.
         */
        li.appendChild(liText);
        ul.appendChild(li);
    }

});