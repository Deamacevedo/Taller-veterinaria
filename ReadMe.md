# 🐾 Deam Pets - Gestión de Veterinaria 🐶🐱

## 📝 Descripción del Proyecto

**Deam Pets** es una aplicación interactiva, simulada en el navegador a través de la consola y ventanas emergentes, diseñada para la gestión de clientes y sus mascotas en una clínica veterinaria. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) tanto para clientes como para mascotas. Todos los datos se almacenan en memoria (arrays de JavaScript) y persisten únicamente durante la sesión activa de la aplicación en el navegador.

El objetivo principal de este proyecto es demostrar y aplicar conceptos de **asincronía en JavaScript**, utilizando `Callbacks`, `Promesas` y `Async/Await` para simular operaciones que en un entorno real no serían instantáneas, como validaciones de datos, consultas a bases de datos o esperas de confirmación. La interacción con el usuario se gestiona completamente a través de las funciones nativas del navegador: `prompt()` para la entrada de datos, `alert()` y `confirm()` para mostrar mensajes y solicitar confirmaciones, y `console.log()` para mostrar listados y resultados detallados.

## 📸 Capturas de Pantalla o GIF (Opcional)

*(En esta sección, puedes añadir imágenes o un GIF que muestren la aplicación en funcionamiento. Por ejemplo:*

* *Menú principal presentado en una ventana `prompt`.*
    * ![ventana emerjente](/assets/image.png)
* *Secuencia de `prompts` durante el registro de un nuevo cliente.*
    * <video controls src="./assets/video.mp4" title="Demostración de la aplicación" width="480"></video>
    * *Un mensaje de éxito o error mostrado en la consola después de una operación.*
    * ![mensaje en consola](/assets/image-1.png)
* *El diálogo `confirm` al intentar eliminar una mascota.*
    * ![Eliminacion](/assets/image-2.png)
* *Un listado de mascotas mostrado en la consola.*
    ![mascotas](/assets/image-3.png)
*)*


## 💻 Tecnologías Usadas

* **JavaScript (ES6+):** Lógica principal de la aplicación, manejo de datos en memoria, y la implementación de la asincronía.
    * Variables (`const`, `let`)
    * Funciones flecha
    * Arrays y sus métodos (`.push`, `.find`, `.findIndex`, `.map`, `.filter`, `.join`)
    * Objetos
    * Manejo de errores (`try...catch`, `throw new Error`)
* **Asincronía en JavaScript:**
    * `setTimeout` para simular retrasos.
    * **Callbacks:** Utilizados en el registro de clientes y mascotas.
    * **Promesas:** Utilizadas para la búsqueda y eliminación de mascotas.
    * **Async/Await:** Utilizado para la actualización del estado de salud, la visualización de mascotas de un cliente y para orquestar el flujo del menú principal.
* **HTML (Implícito):** Para ejecutar el script JavaScript en un navegador. (Aunque no se proporcionó un archivo HTML, se asume su existencia para correr `script.js`).
* **Herramientas del Navegador:**
    * `prompt()`: Para la entrada de datos del usuario.
    * `alert()`: Para mostrar mensajes al usuario.
    * `confirm()`: Para obtener confirmación del usuario.
    * `console.log()`: Para mostrar información y listados.

## ✨ Aplicación de Asincronía

La asincronía se implementó para simular operaciones del mundo real que no son instantáneas y para demostrar diferentes técnicas de manejo de código asíncrono en JavaScript:

1.  🔹 **Registro de Cliente (`registrarCliente`)**:
    * **Técnica:** Callback + `setTimeout`.
    * **Simulación:** Se introduce un retraso de **1.5 segundos** para simular la validación y guardado de los datos del nuevo cliente. La función principal recibe un callback que se invoca con el resultado (éxito o error) después del retraso.

2.  🔹 **Registro de Mascota (`registrarMascota`)**:
    * **Técnica:** Callback + `setTimeout`.
    * **Simulación:** Primero se verifica la existencia del cliente de forma síncrona. Si existe, se introduce un retraso de **2 segundos** para simular la validación de los datos de la mascota y su asociación con el cliente. El callback se invoca tras este proceso.

3.  🔹 **Búsqueda de Mascota por Nombre (`buscarMascotaPorNombre`)**:
    * **Técnica:** Promesa + `setTimeout`.
    * **Simulación:** Se simula un tiempo de búsqueda de **1.5 segundos**. La función retorna una Promesa que se resolverá con la lista de mascotas encontradas (o un mensaje si no hay coincidencias).

4.  🔹 **Actualización de Estado de Salud (`actualizarEstadoSaludMascota`)**:
    * **Técnica:** `async/await` + `new Promise(resolve => setTimeout(resolve, 1000))`.
    * **Simulación:** Se simula una espera (por ejemplo, "espera del veterinario") de **1 segundo** usando `await` sobre una promesa que se resuelve después del `setTimeout`. Luego se procede a solicitar y validar el nuevo estado.

5.  🔹 **Eliminación de Mascota por Nombre (`eliminarMascotaPorNombre`)**:
    * **Técnica:** Promesa + `setTimeout` + `confirm`.
    * **Simulación:** Tras encontrar la mascota (o no), si se va a proceder con la eliminación, se espera **2 segundos** antes de mostrar un diálogo de `confirm` al usuario. La Promesa se resuelve según la decisión del usuario y el resultado de la operación.

6.  🔹 **Ver Mascotas de un Cliente (`obtenerMascotasPorCedulaCliente`)**:
    * **Técnica:** `async/await` + `new Promise(resolve => setTimeout(resolve, 2000))`.
    * **Simulación:** Se simula una carga de información de las mascotas asociadas al cliente con un retardo de **2 segundos** antes de procesar y devolver los datos.

El menú principal (`mostrarMenu`) también es una función `async` y utiliza `await` para manejar las llamadas a estas funciones asíncronas, asegurando que la interfaz de usuario (basada en `prompt`) espere a que las operaciones se completen antes de continuar, proporcionando una experiencia de usuario secuencial a pesar de la naturaleza asíncrona de las tareas.

## 🚀 Cómo Ejecutar

1.  Guarda el código proporcionado como un archivo `script.js`.
2.  Crea un archivo `index.html` simple en el mismo directorio con el siguiente contenido:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Deam Pets - Veterinaria</title>
    </head>
    <body>
        <h1>Gestión de Veterinaria "Deam Pets"</h1>
        <script src="script.js"></script>
    </body>
    </html>
    ```
3.  Abre el archivo `index.html` en tu navegador web.
4.  Abre la consola de desarrollador del navegador (usualmente con la tecla F12) para ver los mensajes de `console.log`.
5.  Interactúa con la aplicación a través de las ventanas emergentes (`prompt`, `alert`, `confirm`) que aparecerán.

## ✍️ Autor
Desarrollado por **Dylan Acevedo**, como parte de un proyecto individual para practicar asincronía y lógica con JavaScript puro.