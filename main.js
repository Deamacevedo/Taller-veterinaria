// const veterinaria = {
//     nombre,
//     especie : ["Perro","Gato","otro"],
//     edad,
//     peso,
//     EstadoDeSalud : ["Sano","Enfermo","Tratamiento"]
// }

let mascotas = []

function registrarMascota() {
    const nombre = prompt("Ingrese el nombre de la mascota:");

    const especie = prompt("Ingrese la especie de la mascota (Ej: Perro, Gato):");

    let edad = prompt("Ingrese la edad de la mascota (en años):");
    let peso = prompt("Ingrese el peso de la mascota (en kg):");
    let estadoSalud = prompt("Ingrese el estado de salud (sano, enfermo, tratamiento):");
 

    const nuevaMascota = {
        nombre: nombre,
        especie: especie,
        edad: edad,
        peso: peso,
        estadoSalud: estadoSalud
    };

    mascotas.push(nuevaMascota);
    alert('Mascota "' + nombre + '" registrada exitosamente.');
}

function listarMascotas() {


    let listaStr = "Mascotas Registradas:\n";
    for (let i = 0; i < mascotas.length; i++) {
        let mascota = mascotas[i];
        listaStr += (i + 1) + ". Nombre: " + mascota.nombre + "\n";
        listaStr += "   Especie: " + mascota.especie + "\n";
        listaStr += "   Edad: " + mascota.edad + " años\n";
        listaStr += "   Peso: " + mascota.peso + " kg\n";
        listaStr += "   Estado de Salud: " + mascota.estadoSalud + "\n";
        listaStr += "-------------------------\n";
    }
    alert(listaStr);
}

function buscarMascota() {

    const nombreBusqueda = prompt("Ingrese el nombre de la mascota a buscar:");

    const encontradas = mascotas.filter(mascota => mascota.nombre.includes(nombreBusqueda));

    let resultadoStr = `🔍 Resultados para "${nombreBusqueda}" 🔍\n-------------------------\n`;
    encontradas.forEach(mascota => {
        resultadoStr += "Nombre: " + mascota.nombre + "\n";
        resultadoStr += "Especie: " + mascota.especie + "\n";
        resultadoStr += "Edad: " + mascota.edad + " años\n";
        resultadoStr += "Peso: " + mascota.peso + " kg\n";
        resultadoStr += "Estado de Salud: " + mascota.estadoSalud + "\n";
        resultadoStr += "-------------------------\n";
    });
    alert(resultadoStr);
}

function actualizarEstadoSalud() {

    const nombreBusqueda = prompt("Ingrese el nombre de la mascota cuyo estado de salud desea actualizar:");

    const mascotaEncontrada = mascotas.find(mascota => mascota.nombre === nombreBusqueda);

    let nuevoEstadoSalud;
    while (true) {
        nuevoEstadoSalud = prompt(`Estado de salud actual de ${mascotaEncontrada.nombre}: ${mascotaEncontrada.estadoSalud}\nIngrese el nuevo estado de salud (Sano, Enfermo, En tratamiento):`);
        if (["sano", "enfermo", "tratamiento"].includes(nuevoEstadoSalud)) {
            mascotaEncontrada.estadoSalud = nuevoEstadoSalud.charAt(0)  + nuevoEstadoSalud.slice(1);
            alert('El estado de salud de "' + mascotaEncontrada.nombre + '" ha sido actualizado a "' + mascotaEncontrada.estadoSalud + '".');
            break;
        }
        alert("Estado de salud inválido. Use Sano, Enfermo o Tratamiento.");
    }
}

function eliminarMascota() {

    const nombreBusqueda = prompt("Ingrese el nombre de la mascota que desea eliminar:");

    const indiceMascota = mascotas.findIndex(mascota => mascota.nombre.toLowerCase() === nombreBusqueda);


    const confirmacion = confirm('¿Está seguro de que desea eliminar a "' + mascotas[indiceMascota].nombre + '"?');
    if (confirmacion) {
        const mascotaEliminada = mascotas.splice(indiceMascota, 1);
        alert('Mascota "' + mascotaEliminada[0].nombre + '" eliminada exitosamente.');
    } else {
        alert("Eliminación cancelada.");
    }
}

function menu() {
    let opcion = "";
    while (opcion !== "6") {
        opcion = prompt(
            " Menú Veterinaria \n\n" +
            "1. Registrar nueva mascota\n" +
            "2. Listar todas las mascotas\n" +
            "3. Buscar mascota por nombre\n" +
            "4. Actualizar estado de salud de una mascota\n" +
            "5. Eliminar mascota por nombre\n" +
            "6. Salir del programa\n\n" +
            "Por favor, ingrese el número de la opción deseada:"
        );

        if (opcion === null) { // Por si el usuario cancela el prompt
            opcion = "6"; 
        }

        switch (opcion) {
            case "1":
                registrarMascota();
                break;
            case "2":
                listarMascotas();
                break;
            case "3":
                buscarMascota();
                break;
            case "4":
                actualizarEstadoSalud();
                break;
            case "5":
                eliminarMascota();
                break;
            case "6":
                alert("Gracias por usar el sistema de gestión veterinaria. ¡Hasta pronto!");
                break;
            default:
                if (opcion !== null) { 
                    alert("Opción no válida. Por favor, intente de nuevo.");
                }
                break;
        }
    }
}

menu();