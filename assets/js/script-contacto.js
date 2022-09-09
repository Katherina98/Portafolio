window.addEventListener('DOMContentLoaded', (e) => {
    /**Cargamos los html de header y footer en la página a través de load.
     * Debemos indicar el id (#...) de donde queremos cargar los archivos.
     */
    $("#cabecera").load("parts/header.html");
    $("#pie-pagina").load("parts/footer.html");

    /**Con esta variable le agregamos la funcionalidad al boton, permitiendo enviar datos a través del click*/
    let boton = document.getElementById("btn-enviar");
    boton.addEventListener("click", (ev) => {
        /**Probar el código, si ocurre un evento inesperado ejecutar catch */
        try {
            /**Creamos variables para recuperar los valores del formulario a través de su id*/
            let nombreApellido = document.getElementById("nombre-apellido").value;
            if (nombreApellido.length < 5) {
                throw new Error("Ingrese su nombre completo, debe incluir mínimo 5 caracteres.");
            }
            let email = document.getElementById("correo").value;
            if (email.length < 1) {
                throw new Error("Ingrese un correo.");
            }
            let mensajeText = document.getElementById("textarea1").value;
            if (mensajeText.length < 1) {
                throw new Error("Ingrese un mensaje especificando su motivo.");
            }
            /**En este caso, llamamos a la función getConocido y getMotivo para poder tomar un valor en particular*/
            let conocido = getConocido();
            let motivo = getMotivo();

            let contacto = {
                nombre_completo: nombreApellido,
                email,
                conocido,
                motivo,
                mensajeText
            };
            console.dir(contacto);
            guardarContacto(contacto);
        } catch (e) {
            mostrarError(e.message);
        }
        
    });

    /***************************************************************************/

    async function guardarContacto(contacto) {
        const url = "https://curso-frontend-ef65a-default-rtdb.firebaseio.com/contactos.json";
        /** method: Método HTTP que utilizaremos, en este caso método POST. 
        *   body: cuerpo del mensaje, indicamos el tipo de dato que utilizaremos, en este caso es en formato tipo JSON y los vamos a convertir en String.*/
        const respuesta = await fetch(url, {
            method: "POST",
            body: JSON.stringify(contacto)
        });
        const data = await respuesta.json();
        swal("Gracias", "Su mensaje fue enviado correctamente", "success");
    }

    /***************************************************************************/

    function getMotivo() {
        /**QuerySelector devuelve la primera etiqueta que encuentra dentro del selector
         * Agregamos :checked (correspondiente a una sintaxis de CSS, pseudoclase), se encuentra disponible en querySelector y querySelectorAll. 
         * Permite seleccionar el valor marcado en un formulario, en este caso a través del name. 
         */
        let inputMotivos = document.querySelectorAll("input[name='motivo']:checked");
        let arrMotivos = [];

        /**Para recorrer utilizamos "FOR" y en cada vuelta revisa si se ha seleccionado un elemento.
         * Si encuentra un elemento seleccionado, lo agrega al array creado con anterioridad.
         * Se puede seleccionar mas de uno.
         */
        for (let i = 0; i < inputMotivos.length; i++) {
            const motivo = inputMotivos[i].value;
            arrMotivos.push(motivo);
        }

        if (inputMotivos.length < 1) {
            throw new Error("Debe seleccionar al menos un motivo de contacto");
            /* Si no se marca un elemento nos muestra un mensaje de error */
        }
        return arrMotivos;
    }

    /***************************************************************************/
    function getConocido() {
        /**QuerySelector devuelve la primera etiqueta que encuentra dentro del selector
         * Agregamos :checked (correspondiente a una sintaxis de CSS, pseudoclase), se encuentra disponible en querySelector y querySelectorAll. 
         * Permite seleccionar el valor marcado en un formulario, en este caso a través del name. 
         */
        let inputSeleccionado = document.querySelector("input[name='conocido']:checked")
        if (inputSeleccionado == null) {
            throw new Error("Debe seleccionar si es un conocido o no.");
            /* Si no se marca un elemento nos muestra un mensaje de error */
        }
        const conocido = inputSeleccionado.value;
        return conocido;
    }

    /***************************************************************************/

    /**Esta función nos permite mostrar un mensaje, cuando hacemos uso de la misma en la sección de catch.
         * En este caso, la utilizamos en los selectores y radios de formulario.
         */
    function mostrarError(mensajeDeError) {
        /**En esta linea podemos modificar el estado del style de un elemento, a través del document.getElementById*/
        document.getElementById("form-mensaje-error").style.display = "block";
        /**Con document.querySelector podemos recuperar a través del CSS, en este caso utilizamos el id (#...)
         * Le indicamos a través del id la ubicación donde queremos crear un nodo, en este caso en la etiqueta <ul>
        */
        const ul = document.querySelector("#form-mensaje-error ul");
        /**Con document.createElement creamos un elemento, en este caso una etiqueta HTML <li> */
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