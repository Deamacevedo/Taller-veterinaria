// Declara una constante 'cliente'. Es un array (lista) vacío que almacenará los objetos de los clientes registrados. En tu código anterior se llamaba 'duenos'.
const cliente = [];
// Declara una constante 'mascotas'. Es un array vacío que almacenará los objetos de las mascotas registradas.
const mascotas = [];
// Declara una variable 'idCliente' y la inicializa en 1. Se usará para generar IDs únicos para los clientes.
let idCliente = 1;
// Declara una variable 'idMascotas' y la inicializa en 1. Se usará para generar IDs únicos para las mascotas.
let idMascotas = 1;
// Define un array constante 'estadosValidos' que contiene los strings de los estados de salud permitidos para una mascota (incluye versiones con mayúscula inicial y minúsculas).
const estadosValidos = ['Sano', 'Enfermo', 'Tratamiento','sano','enfermo','tratamiento'];
// Define un array constante 'especiesValidas' que contiene los strings de las especies permitidas para una mascota (incluye versiones con mayúscula inicial y minúsculas).
const especiesValidas = ['Perro', 'Gato', 'Ave', 'Reptil', 'Otro','perro','gato','ave','reptil','otro'];

// Define una función flecha 'validarNoVacio' que toma un 'valor' y el 'campo' (nombre del campo) como argumentos.
const validarNoVacio = (valor, campo) => {
    // Verifica si 'valor' es falso (null, undefined, '', 0, false) O si después de quitarle los espacios en blanco al inicio y al final (valor.trim()) es una cadena vacía.
    if (!valor || valor.trim() === '') {
        // Si la condición es verdadera (el campo está vacío), lanza un nuevo Error con un mensaje indicando qué campo no puede estar vacío.
        throw new Error(`El campo ${campo} no puede estar vacío`);
    }
    // Si la validación pasa (el campo no está vacío), devuelve true.
    return true;
};

// Define una función flecha 'validarNumero' que toma un 'valor' y el 'campo' como argumentos.
const validarNumero = (valor, campo) => {
    // Verifica si 'valor' no es un número (isNaN(valor) es true) O si al convertir 'valor' a número (Number(valor)) es menor o igual a 0.
    if (isNaN(valor) || Number(valor) <= 0) {
        // Si la condición es verdadera (no es un número positivo), lanza un nuevo Error.
        throw new Error(`El campo ${campo} debe ser un número positivo`);
    }
    // Si la validación pasa, devuelve true.
    return true;
};

// Define una función flecha 'validarEstadoSalud' que toma un 'estado' como argumento.
const validarEstadoSalud = (estado) => {
    // Verifica si el 'estado' proporcionado NO está incluido en el array 'estadosValidos'.
    if (!estadosValidos.includes(estado)) {
        // Si no está incluido, lanza un nuevo Error indicando que el estado es inválido y muestra las opciones válidas.
        throw new Error(`Estado de salud inválido. Opciones: ${estadosValidos.join(', ')}`);
    }
    // Si el estado es válido, devuelve true.
    return true;
};

// Define una función flecha 'validarEspecie' que toma una 'especie' como argumento.
const validarEspecie = (especie) => {
    // Verifica si la 'especie' proporcionada NO está incluida en el array 'especiesValidas'.
    if (!especiesValidas.includes(especie)) {
        // Si no está incluida, lanza un nuevo Error indicando que la especie es inválida y muestra las opciones válidas.
        throw new Error(`Especie inválida. Opciones: ${especiesValidas.join(', ')}`);
    }
    // Si la especie es válida, devuelve true.
    return true;
};

// Define la función 'registrarCliente'. Acepta un 'callback' como argumento, que es una función que se ejecutará después de la operación asíncrona.
const registrarCliente = (callback) => {
    // 'setTimeout' ejecuta la función que se le pasa como primer argumento después de 1500 milisegundos (1.5 segundos). Simula una demora.
    setTimeout(() => {
        // Inicia un bloque 'try...catch' para manejar posibles errores que ocurran durante la ejecución del código dentro de 'try'.
        try {
            // Pide al usuario el nombre del cliente mediante una ventana emergente (prompt) y guarda el resultado.
            const nombre = prompt("Ingrese el nombre del cliente:");
            // Valida que el nombre no esté vacío usando la función 'validarNoVacio'. Si está vacío, 'validarNoVacio' lanzará un error que será capturado por el 'catch'.
            validarNoVacio(nombre, "nombre");

            // Pide y valida la cédula del cliente.
            const cedula = prompt("Ingrese la cédula del cliente:");
            validarNoVacio(cedula, "cédula");

            // Pide y valida el teléfono del cliente.
            const telefono = prompt("Ingrese el teléfono del cliente:");
            validarNoVacio(telefono, "teléfono");

            // Pide y valida el correo electrónico del cliente.
            const correo = prompt("Ingrese el email del cliente:");
            validarNoVacio(correo, "email");

            // Crea un nuevo objeto 'nuevoCliente' con los datos ingresados y un ID único.
            const nuevoCliente = {
                id: idCliente++, // Asigna el valor actual de 'idCliente' y luego lo incrementa.
                nombre,         // nombre: nombre (shorthand property)
                cedula,         // cedula: cedula
                telefono,       // telefono: telefono
                correo          // correo: correo
            };

            // Agrega el 'nuevoCliente' al array 'cliente'.
            cliente.push(nuevoCliente);
            // Llama a la función 'callback' pasada como argumento.
            // El primer argumento del callback es para errores (null en caso de éxito).
            // El segundo argumento es el mensaje de éxito.
            callback(null, `Cliente ${nombre} registrado con éxito!`);
        // Si ocurre un error en el bloque 'try' (por ejemplo, una validación falla y lanza un Error).
        } catch (error) {
            // Llama a la función 'callback' indicando el error.
            // El primer argumento es el mensaje del error (error.message).
            // El segundo argumento para el resultado exitoso es null.
            callback(error.message, null);
        }
    }, 1500); // Fin del setTimeout.
};

// Define una función flecha 'buscarClientePorCedula' que toma 'cedula' como argumento.
const buscarClientePorCedula = (cedula) => {
    // Utiliza el método 'find' del array 'cliente' para buscar un elemento (llamado 'cliente' individualmente en la iteración)
    // cuya propiedad 'cedula' sea estrictamente igual a la 'cedula' proporcionada.
    // Devuelve el primer cliente que coincida o 'undefined' si no se encuentra ninguno.
    return cliente.find(cliente => cliente.cedula === cedula);
};

// Define la función 'registrarMascota'. Acepta un 'callback'.
const registrarMascota = (callback) => {
    // Pide al usuario la cédula del cliente para asociar la mascota.
    const cedulaCliente = prompt("Ingrese la cédula del Cliente:");
    // Busca al cliente usando la función 'buscarClientePorCedula'.
    const clienteEncontrado = buscarClientePorCedula(cedulaCliente); // Renombré 'cliente' a 'clienteEncontrado' para evitar confusión con el array global 'cliente'.

    // Si 'clienteEncontrado' es falso (es decir, undefined, porque no se encontró el cliente).
    if (!clienteEncontrado) {
        // Llama al callback con un mensaje de error y null para el éxito.
        callback("No se encontró un cliente con esa cédula", null);
        // Termina la ejecución de 'registrarMascota' para no continuar.
        return;
    }

    // Simula una demora de 2 segundos.
    setTimeout(() => {
        // Bloque try...catch para manejar errores de validación de la mascota.
        try {
            // Pide y valida el nombre de la mascota.
            const nombre = prompt("Ingrese el nombre de la mascota:");
            validarNoVacio(nombre, "nombre");

            // Pide y valida la especie de la mascota.
            const especie = prompt(`Ingrese la especie: Perro, Gato, Ave, Reptil, Otro`);
            validarEspecie(especie);

            // Pide y valida la edad de la mascota.
            const edad = prompt("Ingrese la edad en años:");
            validarNumero(edad, "edad");

            // Pide y valida el peso de la mascota.
            const peso = prompt("Ingrese el peso en kilogramos:");
            validarNumero(peso, "peso");

            // Pide y valida el estado de salud de la mascota.
            const estadoSalud = prompt(`Ingrese el estado de salud: Sano, Enfermo, Tratamiento`);
            validarEstadoSalud(estadoSalud);

            // Crea un nuevo objeto 'nuevaMascota'.
            const nuevaMascota = {
                id: idMascotas++,           // Asigna y luego incrementa idMascotas.
                nombre,
                especie,
                edad: Number(edad),        // Convierte la edad a número.
                peso: Number(peso),        // Convierte el peso a número.
                estadoSalud,
                idCliente: clienteEncontrado.id // Asigna el ID del cliente encontrado para la asociación.
            };

            // Agrega la 'nuevaMascota' al array 'mascotas'.
            mascotas.push(nuevaMascota);
            // Llama al callback con null para error y un mensaje de éxito.
            callback(null, `Mascota ${nombre} registrada con éxito para ${clienteEncontrado.nombre}!`);
        } catch (error) {
            // Si hay un error en las validaciones, llama al callback con el mensaje de error.
            callback(error.message, null);
        }
    }, 2000); // Fin del setTimeout.
};

// Define la función 'listarTodasMascotas'.
const listarTodasMascotas = () => {
    // Si el array 'mascotas' está vacío (no hay mascotas registradas).
    if (mascotas.length === 0) {
        // Devuelve un mensaje indicándolo.
        return "No hay mascotas registradas.";
    }

    // Si hay mascotas, usa el método 'map' para transformar cada objeto 'mascota' en el array 'mascotas'
    // en una cadena de texto formateada.
    return mascotas.map(mascota => {
        // Para cada mascota, busca su cliente correspondiente en el array 'cliente' global usando el 'id' del cliente.
        const clientem = cliente.find(d => d.id === mascota.idCliente);
        // Devuelve una cadena con los detalles de la mascota y el nombre del cliente (o 'Desconocido' si no se encuentra).
        return `Nombre: ${mascota.nombre}, Especie: ${mascota.especie}, Edad: ${mascota.edad} años, Peso: ${mascota.peso} kg, Salud: ${mascota.estadoSalud}, Cliente: ${clientem ? clientem.nombre : 'Desconocido'}`;
    // Une todas las cadenas generadas por 'map' en una sola cadena, separadas por un salto de línea ('\n').
    }).join('\n');
};

// Define la función 'buscarMascotaPorNombre'.
const buscarMascotaPorNombre = () => {
    // Devuelve un nuevo objeto 'Promise'. Una promesa representa el resultado eventual de una operación asíncrona.
    // El constructor de Promise toma una función con un argumento: 'resolve' (no se usa 'reject' aquí, se resuelve siempre).
    return new Promise((resolve) => {
        // Simula una demora de 1.5 segundos.
        setTimeout(() => {
            // Pide al usuario el nombre de la mascota a buscar.
            const nombre = prompt("Ingrese el nombre de la mascota a buscar:");
            // Filtra el array 'mascotas' para encontrar todas las mascotas cuyo nombre (convertido a minúsculas)
            // incluya la cadena 'nombre' (también convertida a minúsculas). Esto permite búsquedas parciales.
            const mascotasEncontradas = mascotas.filter(mascota =>
                mascota.nombre.toLowerCase().includes(nombre.toLowerCase())
            );

            // Si no se encontraron mascotas (el array 'mascotasEncontradas' está vacío).
            if (mascotasEncontradas.length === 0) {
                // Resuelve la promesa con un mensaje indicando que no se encontraron mascotas.
                resolve("No se encontraron mascotas con ese nombre.");
                // Termina la ejecución de la función dentro del setTimeout.
                return;
            }

            // Si se encontraron mascotas, transforma cada mascota encontrada en una cadena formateada.
            const resultado = mascotasEncontradas.map(mascota => {
                // Busca el cliente de la mascota.
                const clientem = cliente.find(d => d.id === mascota.idCliente);
                // Devuelve la cadena con los detalles.
                return `Nombre: ${mascota.nombre}, Especie: ${mascota.especie}, Edad: ${mascota.edad} años, Salud: ${mascota.estadoSalud}, Dueño: ${clientem ? clientem.nombre : 'Desconocido'}`;
            // Une las cadenas con saltos de línea.
            }).join('\n');

            // Resuelve la promesa con la cadena de resultados.
            resolve(resultado);
        }, 1500); // Fin del setTimeout.
    }); // Fin de la Promise.
};

// Define una función asíncrona 'actualizarEstadoSaludMascota'. 'async' permite usar 'await' dentro de ella.
const actualizarEstadoSaludMascota = async () => {
    // Pide al usuario el nombre de la mascota a actualizar.
    const nombre = prompt("Ingrese el nombre de la mascota a actualizar:");
    // Busca la mascota en el array 'mascotas' por su nombre (insensible a mayúsculas).
    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());

    // Si no se encuentra la mascota.
    if (!mascota) {
        // Devuelve un mensaje indicándolo.
        return "Mascota no encontrada.";
    }

    // 'await' pausa la ejecución de 'actualizarEstadoSaludMascota' hasta que la Promesa se resuelva.
    // 'new Promise(resolve => setTimeout(resolve, 1000))' crea una promesa que se resuelve después de 1000 ms (1 segundo).
    // Esto simula una espera (por ejemplo, consulta al veterinario).
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Pide al usuario el nuevo estado de salud.
    const nuevoEstado = prompt(`Ingrese nuevo estado de salud: Sano, Enfermo, Tratamiento`);
    // Bloque try...catch para validar el nuevo estado.
    try {
        // Valida el 'nuevoEstado' usando 'validarEstadoSalud'. Si es inválido, lanzará un error.
        validarEstadoSalud(nuevoEstado);
        // Si es válido, actualiza el 'estadoSalud' de la mascota.
        mascota.estadoSalud = nuevoEstado;
        // Devuelve un mensaje de éxito.
        return `Estado de salud de ${mascota.nombre} actualizado a ${nuevoEstado}`;
    } catch (error) {
        // Si 'validarEstadoSalud' lanzó un error, lo captura y devuelve el mensaje del error.
        return error.message;
    }
};

// Define la función 'eliminarMascotaPorNombre'.
const eliminarMascotaPorNombre = () => {
    // Devuelve una nueva Promesa.
    return new Promise((resolve) => {
        // Pide al usuario el nombre de la mascota a eliminar.
        const nombre = prompt("Ingrese el nombre de la mascota a eliminar:");
        // Busca el índice (posición) de la mascota en el array 'mascotas' (insensible a mayúsculas).
        // 'findIndex' devuelve el índice o -1 si no se encuentra.
        const indiceMascota = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());

        // Si la mascota no se encontró (índice es -1).
        if (indiceMascota === -1) {
            // Resuelve la promesa con un mensaje indicándolo.
            resolve("Mascota no encontrada.");
            // Termina la ejecución.
            return;
        }

        // Simula una demora de 2 segundos antes de pedir confirmación.
        setTimeout(() => {
            // Muestra una ventana de confirmación al usuario. 'confirm' devuelve true si el usuario hace clic en "Aceptar", false si hace clic en "Cancelar".
            const confirmarEliminar = confirm(`¿Está seguro que desea eliminar a ${mascotas[indiceMascota].nombre}?`);
            // Si el usuario confirma la eliminación.
            if (confirmarEliminar) {
                // Elimina la mascota del array 'mascotas' usando 'splice'.
                // 'splice(indiceMascota, 1)' elimina 1 elemento a partir de 'indiceMascota'.
                // '[0]' obtiene el elemento eliminado (que es un array de un solo elemento).
                const mascotaEliminada = mascotas.splice(indiceMascota, 1)[0];
                // Resuelve la promesa con un mensaje de éxito.
                resolve(`Mascota ${mascotaEliminada.nombre} eliminada con éxito.`);
            } else {
                // Si el usuario cancela, resuelve la promesa con un mensaje de cancelación.
                resolve("Eliminación cancelada.");
            }
        }, 2000); // Fin del setTimeout.
    }); // Fin de la Promise.
};

// Define una función asíncrona 'obtenerMascotasPorCedulaCliente'.
const obtenerMascotasPorCedulaCliente = async () => {
    // Pide al usuario la cédula del cliente.
    const cedula = prompt("Ingrese la cédula del cliente:");

    // Simula una carga de información con un retardo de 2 segundos.
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Busca al cliente por la cédula proporcionada.
    const clienteEncontrado = buscarClientePorCedula(cedula); // Renombré 'cliente' a 'clienteEncontrado' para claridad.
    // Si no se encuentra el cliente.
    if (!clienteEncontrado) {
        // Devuelve un mensaje indicándolo.
        return "No se encontró un cliente con esa cédula.";
    }

    // Filtra el array 'mascotas' para obtener solo las mascotas cuyo 'idCliente' coincida con el 'id' del cliente encontrado.
    const mascotasDueno = mascotas.filter(mascota => mascota.idCliente === clienteEncontrado.id);
    // Si el cliente no tiene mascotas registradas.
    if (mascotasDueno.length === 0) {
        // Devuelve un mensaje indicándolo.
        return `El cliente ${clienteEncontrado.nombre} no tiene mascotas registradas.`;
    }

    // Si tiene mascotas, las transforma en una cadena formateada.
    // ¡POTENCIAL ERROR AQUÍ! 'clientem' no está definido en este scope. Debería ser 'clienteEncontrado.nombre'.
    // La línea original es: `Dueño: ${clientem ? clientem.nombre : 'Desconocido'}`
    // Debería ser: `Dueño: ${clienteEncontrado.nombre}` (ya que sabemos que clienteEncontrado existe en este punto).
    return mascotasDueno.map(mascota =>
        `Nombre: ${mascota.nombre}, Especie: ${mascota.especie}, Edad: ${mascota.edad} años, Salud: ${mascota.estadoSalud}, Dueño: ${clienteEncontrado.nombre}`
    ).join('\n'); // Une las cadenas con saltos de línea.
};


// Define una función asíncrona 'mostrarMenu' que manejará la interacción principal con el usuario.
const mostrarMenu = async () => {
    // Inicia un bucle infinito. El bucle solo se romperá con 'return' (en la opción de salida).
    while (true) {
        // Muestra un prompt con las opciones del menú y guarda la elección del usuario en 'opcion'.
        const opcion = prompt(`Deam pets:
1. Registrar cliente
2. Registrar mascota
3. Listar todas las mascotas
4. Buscar mascota por nombre
5. Actualizar estado de salud de mascota
6. Eliminar mascota por nombre
7. Ver mascotas de un cliente
8. Salir

Seleccione una opción:`);

        // Evalúa el valor de 'opcion' usando una estructura 'switch'.
        switch (opcion) {
            case "1": // Si la opción es "1" (Registrar cliente).
                // 'await new Promise(...)' se usa para esperar a que la función basada en callback 'registrarCliente' termine.
                // Se crea una nueva Promesa. El 'resolve' de esta promesa se llama dentro del callback de 'registrarCliente'.
                // 'await' pausa la ejecución del menú hasta que esta promesa se resuelva.
                await new Promise((resolve) => {
                    // Llama a 'registrarCliente' y le pasa un callback.
                    registrarCliente((error, exito) => {
                        // Este callback se ejecuta cuando 'registrarCliente' termina su 'setTimeout'.
                        if (error) { // Si hubo un error.
                            console.log(error); // Muestra el error en la consola.
                        } else { // Si fue exitoso.
                            console.log(exito); // Muestra el mensaje de éxito en la consola.
                        }
                        resolve(); // Resuelve la promesa creada por 'new Promise', permitiendo que 'await' continúe.
                    });
                });
                break; // Sale del 'switch'.

            case "2": // Si la opción es "2" (Registrar mascota).
                // Similar al caso "1", espera a que 'registrarMascota' (basada en callback) termine.
                await new Promise((resolve) => {
                    registrarMascota((error, exito) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(exito);
                        }
                        resolve();
                    });
                });
                break;

            case "3": // Si la opción es "3" (Listar todas las mascotas).
                // Llama a 'listarTodasMascotas()' (que es sincrónica) y muestra su resultado en la consola.
                console.log(listarTodasMascotas());
                break;

            case "4": // Si la opción es "4" (Buscar mascota por nombre).
                // 'buscarMascotaPorNombre()' devuelve una Promesa. 'await' pausa hasta que la promesa se resuelva.
                const resultadoBusqueda = await buscarMascotaPorNombre();
                // Muestra el resultado de la búsqueda en la consola.
                console.log(resultadoBusqueda);
                break;

            case "5": // Si la opción es "5" (Actualizar estado de salud).
                // 'actualizarEstadoSaludMascota()' es una función 'async' (devuelve implícitamente una Promesa).
                // 'await' pausa hasta que se complete.
                const resultadoActualizacion = await actualizarEstadoSaludMascota();
                // Muestra el resultado en la consola.
                console.log(resultadoActualizacion);
                break;

            case "6": // Si la opción es "6" (Eliminar mascota por nombre).
                // 'eliminarMascotaPorNombre()' devuelve una Promesa. 'await' pausa.
                const resultadoEliminacion = await eliminarMascotaPorNombre();
                // Muestra el resultado en la consola.
                console.log(resultadoEliminacion);
                break;

            case "7": // Si la opción es "7" (Ver mascotas de un cliente).
                // 'obtenerMascotasPorCedulaCliente()' es una función 'async'. 'await' pausa.
                const mascotasDueno = await obtenerMascotasPorCedulaCliente();
                // Muestra el resultado en la consola.
                console.log(mascotasDueno);
                break;

            case "8": // Si la opción es "8" (Salir).
                // Muestra un mensaje de despedida en la consola.
                console.log("Saliendo del sistema...");
                // 'return' sale de la función 'mostrarMenu', terminando así el bucle 'while(true)'.
                return;

            default: // Si 'opcion' no coincide con ningún 'case' anterior.
                // Muestra un mensaje de opción inválida en la consola.
                console.log("Opción inválida. Intente nuevamente.");
        } // Fin del switch.
    } // Fin del while. El bucle se repetirá mostrando el menú hasta que se elija la opción "8".
};

// Llama a la función 'mostrarMenu()' para iniciar la aplicación.
mostrarMenu();