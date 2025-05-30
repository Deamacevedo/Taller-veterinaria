const cliente = [];
const mascotas = [];
let idCliente = 1;
let idMascotas = 1;
const estadosValidos = ['Sano', 'Enfermo', 'Tratamiento','sano','enfermo','tratamiento'];
const especiesValidas = ['Perro', 'Gato', 'Ave', 'Reptil', 'Otro','perro','gato','ave','reptil','otro'];

const validarNoVacio = (valor, campo) => {
    if (!valor || valor.trim() === '') {
        throw new Error(`El campo ${campo} no puede estar vacío`);
    }
    return true;
};

const validarNumero = (valor, campo) => {
    if (isNaN(valor) || Number(valor) <= 0) {
        throw new Error(`El campo ${campo} debe ser un número positivo`);
    }
    return true;
};

const validarEstadoSalud = (estado) => {
    if (!estadosValidos.includes(estado)) {
        throw new Error(`Estado de salud inválido. Opciones: ${estadosValidos.join(', ')}`);
    }
    return true;
};

const validarEspecie = (especie) => {
    if (!especiesValidas.includes(especie)) {
        throw new Error(`Especie inválida. Opciones: ${especiesValidas.join(', ')}`);
    }
    return true;
};

const registrarCliente = (callback) => {
    setTimeout(() => {
        try {
            const nombre = prompt("Ingrese el nombre del cliente:");
            validarNoVacio(nombre, "nombre");

            const cedula = prompt("Ingrese la cédula del cliente:");
            validarNoVacio(cedula, "cédula");

            const telefono = prompt("Ingrese el teléfono del cliente:");
            validarNoVacio(telefono, "teléfono");

            const correo = prompt("Ingrese el email del cliente:");
            validarNoVacio(correo, "email");

            const nuevoCliente = {
                id: idCliente++,
                nombre,
                cedula,
                telefono,
                correo
            };

            cliente.push(nuevoCliente);
            callback(null, `Cliente ${nombre} registrado con éxito!`);
        } catch (error) {
            callback(error.message, null);
        }
    }, 1500);
};

const buscarClientePorCedula = (cedula) => {
    return cliente.find(cliente => cliente.cedula === cedula);
};

const registrarMascota = (callback) => {
    const cedulaCliente = prompt("Ingrese la cédula del Cliente:");
    const cliente = buscarClientePorCedula(cedulaCliente);

    if (!cliente) {
        callback("No se encontró un cliente con esa cédula", null);
        return;
    }

    setTimeout(() => {
        try {
            const nombre = prompt("Ingrese el nombre de la mascota:");
            validarNoVacio(nombre, "nombre");

            const especie = prompt(`Ingrese la especie: Perro, Gato, Ave, Reptil, Otro`);
            validarEspecie(especie);

            const edad = prompt("Ingrese la edad en años:");
            validarNumero(edad, "edad");

            const peso = prompt("Ingrese el peso en kilogramos:");
            validarNumero(peso, "peso");

            const estadoSalud = prompt(`Ingrese el estado de salud: Sano, Enfermo, Tratamiento`);
            validarEstadoSalud(estadoSalud);

            const nuevaMascota = {
                id: idMascotas++,
                nombre,
                especie,
                edad: Number(edad),
                peso: Number(peso),
                estadoSalud,
                idCliente: cliente.id
            };

            mascotas.push(nuevaMascota);
            callback(null, `Mascota ${nombre} registrada con éxito para ${cliente.nombre}!`);
        } catch (error) {
            callback(error.message, null);
        }
    }, 2000);
};

const listarTodasMascotas = () => {
    if (mascotas.length === 0) {
        return "No hay mascotas registradas.";
    }

    return mascotas.map(mascota => {
        const clientem = cliente.find(d => d.id === mascota.idCliente);
        return `Nombre: ${mascota.nombre}, Especie: ${mascota.especie}, Edad: ${mascota.edad} años, Peso: ${mascota.peso} kg, Salud: ${mascota.estadoSalud}, Cliente: ${clientem ? clientem.nombre : 'Desconocido'}`;
    }).join('\n');
};

const buscarMascotaPorNombre = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const nombre = prompt("Ingrese el nombre de la mascota a buscar:");
            const mascotasEncontradas = mascotas.filter(mascota =>
                mascota.nombre.toLowerCase().includes(nombre.toLowerCase())
            );

            if (mascotasEncontradas.length === 0) {
                resolve("No se encontraron mascotas con ese nombre.");
                return;
            }

            const resultado = mascotasEncontradas.map(mascota => {
                const clientem = cliente.find(d => d.id === mascota.idCliente);
                return `Nombre: ${mascota.nombre}, Especie: ${mascota.especie}, Edad: ${mascota.edad} años, Salud: ${mascota.estadoSalud}, Dueño: ${clientem ? clientem.nombre : 'Desconocido'}`;
            }).join('\n');

            resolve(resultado);
        }, 1500);
    });
};

const actualizarEstadoSaludMascota = async () => {
    const nombre = prompt("Ingrese el nombre de la mascota a actualizar:");
    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());

    if (!mascota) {
        return "Mascota no encontrada.";
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const nuevoEstado = prompt(`Ingrese nuevo estado de salud: Sano, Enfermo, Tratamiento`);
    try {
        validarEstadoSalud(nuevoEstado);
        mascota.estadoSalud = nuevoEstado;
        return `Estado de salud de ${mascota.nombre} actualizado a ${nuevoEstado}`;
    } catch (error) {
        return error.message;
    }
};

const eliminarMascotaPorNombre = () => {
    return new Promise((resolve) => {
        const nombre = prompt("Ingrese el nombre de la mascota a eliminar:");
        const indiceMascota = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());

        if (indiceMascota === -1) {
            resolve("Mascota no encontrada.");
            return;
        }

        setTimeout(() => {
            const confirmarEliminar = confirm(`¿Está seguro que desea eliminar a ${mascotas[indiceMascota].nombre}?`);
            if (confirmarEliminar) {
                const mascotaEliminada = mascotas.splice(indiceMascota, 1)[0];
                resolve(`Mascota ${mascotaEliminada.nombre} eliminada con éxito.`);
            } else {
                resolve("Eliminación cancelada.");
            }
        }, 2000);
    });
};

const obtenerMascotasPorCedulaCliente = async () => {
    const cedula = prompt("Ingrese la cédula del cliente:");

    await new Promise(resolve => setTimeout(resolve, 2000));

    const cliente = buscarClientePorCedula(cedula);
    if (!cliente) {
        return "No se encontró un cliente con esa cédula.";
    }

    const mascotasCliente = mascotas.filter(mascota => mascota.idCliente === cliente.id);
    if (mascotasCliente.length === 0) {
        return `El cliente ${cliente.nombre} no tiene mascotas registradas.`;
    }

    return mascotasCliente.map(mascota =>
        `Nombre: ${mascota.nombre}, Especie: ${mascota.especie}, Edad: ${mascota.edad} años, Salud: ${mascota.estadoSalud}, Dueño: ${cliente ? cliente.nombre : 'Desconocido'}`
    ).join('\n');
};


const mostrarMenu = async () => {
    while (true) {
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

        switch (opcion) {
            case "1":
                await new Promise((resolve) => {
                    registrarCliente((error, exito) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(exito);
                        }
                        resolve();
                    });
                });
                break;

            case "2":
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

            case "3":
                console.log(listarTodasMascotas());
                break;

            case "4":
                const resultadoBusqueda = await buscarMascotaPorNombre();
                console.log(resultadoBusqueda);
                break;

            case "5":
                const resultadoActualizacion = await actualizarEstadoSaludMascota();
                console.log(resultadoActualizacion);
                break;

            case "6":
                const resultadoEliminacion = await eliminarMascotaPorNombre();
                console.log(resultadoEliminacion);
                break;

            case "7":
                const mascotasDueno = await obtenerMascotasPorCedulaCliente();
                console.log(mascotasDueno);
                break;

            case "8":
                console.log("Saliendo del sistema...");
                return;

            default:
                console.log("Opción inválida. Intente nuevamente.");
        }
    }
};

mostrarMenu();