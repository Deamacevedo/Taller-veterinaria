const cliente = [];
const mascotas = [];
let idCliente = 1;
let idMascotas = 1;
const generarIdCliente = () => idCliente++;
const generarIdMascotas = () => idMascotas++;
const validarTexto = (texto) => texto.trim() !== "";
const validarNumeroPositivo = (num) => !isNaN(num) && Number(num) > 0;
const estadosValidos = ["Sano", "Enfermo", "Tratamiento"];
const especiesValidas = ["Perro", "Gato", "Ave", "Reptil", "Otro"];

function registrarCliente() {
  const nombre = prompt("Nombre:");
  const cedula = prompt("Cédula:");
  const telefono = prompt("Teléfono:");
  const correo = prompt("Correo:");

  if (![nombre, cedula, telefono, correo].every(validarTexto)) {
    alert("Todos los campos deben ser completados.");
    return;
  }

  cliente.push({
    id: generarIdCliente(),
    nombre,
    cedula,
    telefono,
    correo
  });

  alert("Dueño registrado correctamente.");
}

function registrarMascota() {
  const nombre = prompt("Nombre de la mascota:");
  const especie = prompt("Especie (Perro, Gato, Ave, Reptil, Otro):");
  const edad = parseInt(prompt("Edad (años):"));
  const peso = parseFloat(prompt("Peso (kg):"));
  const estado = prompt("Estado de salud (Sano, Enfermo, Tratamiento):");
  const cedulaCliente = prompt("Cédula del cliente:");

  if (!validarTexto(nombre) || !especiesValidas.includes(especie)) {
    alert("Datos inválidos.");
    return;
  }

  if (!validarNumeroPositivo(edad) || !validarNumeroPositivo(peso)) {
    alert("Edad y peso deben ser positivos.");
    return;
  }

  if (!estadosValidos.includes(estado)) {
    alert("Estado de salud no válido.");
    return;
  }

  const clientem = cliente.find(d => d.cedula === cedulaCliente);

  if (!clientem) {
    alert("Cliente no encontrado.");
    return;
  }

  mascotas.push({
    id: generarIdMascotas(),
    nombre,
    especie,
    edad,
    peso,
    estado,
    idCliente: clientem.id
  });

  alert("Mascota registrada.");
}

function listarMascotas() {
  console.log("Listado de mascotas:");
  mascotas.forEach(m => {
    console.log(`${m.nombre} (${m.especie}) - Estado: ${m.estado}`);
  });
}

function buscarMascota() {
  const nombre = prompt("Nombre de la mascota a buscar:");
  const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
  if (mascota) {
    console.log("Mascota encontrada:", mascota);
  } else {
    alert("No se encontró la mascota.");
  }
}

function actualizarEstadoMascota() {
  const nombre = prompt("Nombre de la mascota a actualizar:");
  const nuevoEstado = prompt("Nuevo estado (Sano, Enfermo, Tratamiento):");

  if (!estadosValidos.includes(nuevoEstado)) {
    alert("Estado no válido.");
    return;
  }

  const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());

  if (mascota) {
    mascota.estado = nuevoEstado;
    alert("Estado actualizado.");
  } else {
    alert("Mascota no encontrada.");
  }
}

function eliminarMascota() {
  const nombre = prompt("Nombre de la mascota a eliminar:");
  const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());

  if (index >= 0) {
    mascotas.splice(index, 1);
    alert("Mascota eliminada.");
  } else {
    alert("No se encontró la mascota.");
  }
}

function verMascotasPorCedula() {
  const cedula = prompt("Cédula del dueño:");
  const clientems = cliente.find(d => d.cedula === cedula);

  if (!clientems) {
    alert("Dueño no encontrado.");
    return;
  }

  const mascotasDelCliente = mascotas.filter(m => m.idCliente === clientems.id);

  if (mascotasDelCliente.length === 0) {
    alert("Este dueño no tiene mascotas registradas.");
  } else {
    console.log(`Mascotas de ${clientems.nombre}:`);
    mascotasDelCliente.forEach(m => console.log(`${m.nombre} - ${m.estado}`));
  }
}

function menu() {
  let opcion;

  do {
    opcion = prompt(
      `Deam pets\n\n1. Registrar cliente\n2. Registrar mascota\n3. Listar mascotas\n4. Buscar mascota\n5. Actualizar estado mascota\n6. Eliminar mascota\n7. Ver mascotas por cliente\n0. Salir`
    );

    switch (opcion) {
      case "1": registrarCliente(); break;
      case "2": registrarMascota(); break;
      case "3": listarMascotas(); break;
      case "4": buscarMascota(); break;
      case "5": actualizarEstadoMascota(); break;
      case "6": eliminarMascota(); break;
      case "7": verMascotasPorCedula(); break;
      case "0": alert("¡Hasta luego!"); break;
      default: alert("Opción inválida."); break;
    }
  } while (opcion !== "0");
}

menu();