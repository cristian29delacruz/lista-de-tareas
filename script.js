// Paso 1: Seleccionar los elementos del DOM que voy a usar
const nuevaTareaInput = document.getElementById('nuevaTareaInput');
const agregarTareaBtn = document.getElementById('agregarTareaBtn');
const listaDeTareas = document.getElementById('listaDeTareas');

// ¡NUEVO! Seleccionar los botones de acciones masivas
const eliminarSeleccionadasBtn = document.getElementById('eliminarSeleccionadasBtn');
const marcarSeleccionadasBtn = document.getElementById('marcarSeleccionadasBtn');
const desmarcarSeleccionadasBtn = document.getElementById('desmarcarSeleccionadasBtn');

// Paso 2: Función para agregar una nueva tarea
function agregarTarea() {
    const textoTarea = nuevaTareaInput.value.trim();

    // Si quieres permitir tareas vacías, el siguiente bloque debe estar comentado o eliminado
    /*
    if (textoTarea === '') {
        alert('¡Ups! No puedes agregar una tarea vacía. Escribe algo.');
        return;
    }
    */

    const listItem = document.createElement('li');
    listItem.classList.add('tarea-item');

    // ¡NUEVO! Crear el checkbox para seleccionar la tarea
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // Decimos que es un checkbox
    checkbox.classList.add('tarea-checkbox'); // Le añadimos una clase para estilos si queremos

    // ¡NUEVO! Añadir un evento al checkbox para que también cambie el estado de completada
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            listItem.classList.add('completada');
        } else {
            listItem.classList.remove('completada');
        }
    });

    const tareaTextoSpan = document.createElement('span');
    tareaTextoSpan.classList.add('tarea-texto');
    tareaTextoSpan.textContent = textoTarea;
    
    // Modificado: Ahora el clic en el texto SOLO invoca el clic en el checkbox.
    // Esto es para que el checkbox y el texto se sincronicen mejor.
    tareaTextoSpan.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked; // Invierte el estado del checkbox
        checkbox.dispatchEvent(new Event('change')); // Dispara el evento 'change' del checkbox manualmente
    });

    const tareaAccionesDiv = document.createElement('div');
    tareaAccionesDiv.classList.add('tarea-acciones');

    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.classList.add('eliminar');

    eliminarBtn.addEventListener('click', () => {
        listaDeTareas.removeChild(listItem);
    });

    // "Enganchar" los elementos:
    // ¡NUEVO! Añadimos el checkbox primero
    listItem.appendChild(checkbox); 
    listItem.appendChild(tareaTextoSpan);
    tareaAccionesDiv.appendChild(eliminarBtn);
    listItem.appendChild(tareaAccionesDiv);
    
    listaDeTareas.appendChild(listItem);

    nuevaTareaInput.value = '';
    nuevaTareaInput.focus();
}

// Paso 3: Asignar eventos a los botones y al input
agregarTareaBtn.addEventListener('click', agregarTarea);

nuevaTareaInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

// --- NUEVAS FUNCIONES PARA ACCIONES MASIVAS ---

// Función para eliminar todas las tareas seleccionadas
function eliminarTareasSeleccionadas() {
    // Seleccionamos todos los checkboxes que estén marcados
    // 'querySelectorAll' me permite obtener una lista de todos los elementos que cumplen con el selector
    const checkboxesSeleccionados = document.querySelectorAll('.tarea-checkbox:checked');

    // Recorremos la lista de checkboxes seleccionados
    checkboxesSeleccionados.forEach(checkbox => {
        // Para cada checkbox, accedemos a su elemento padre (que es el <li> de la tarea)
        const listItem = checkbox.closest('.tarea-item'); // 'closest' busca el ancestro más cercano con esa clase
        if (listItem) { // Nos aseguramos de que lo encontró
            listaDeTareas.removeChild(listItem); // Y lo eliminamos
        }
    });
}

// Función para marcar todas las tareas seleccionadas como completadas
function marcarTareasSeleccionadas() {
    const checkboxesSeleccionados = document.querySelectorAll('.tarea-checkbox:checked');
    checkboxesSeleccionados.forEach(checkbox => {
        const listItem = checkbox.closest('.tarea-item');
        if (listItem && !listItem.classList.contains('completada')) {
            listItem.classList.add('completada');
            // También asegúrate de que el checkbox esté marcado
            checkbox.checked = true; 
        }
    });
}

// Función para desmarcar todas las tareas seleccionadas
function desmarcarTareasSeleccionadas() {
    const checkboxesSeleccionados = document.querySelectorAll('.tarea-checkbox:checked');
    checkboxesSeleccionados.forEach(checkbox => {
        const listItem = checkbox.closest('.tarea-item');
        if (listItem && listItem.classList.contains('completada')) {
            listItem.classList.remove('completada');
            // También asegúrate de que el checkbox esté desmarcado
            checkbox.checked = false;
        }
    });
}


// Paso 4: Asignar eventos a los nuevos botones de acciones masivas
eliminarSeleccionadasBtn.addEventListener('click', eliminarTareasSeleccionadas);
marcarSeleccionadasBtn.addEventListener('click', marcarTareasSeleccionadas);
desmarcarSeleccionadasBtn.addEventListener('click', desmarcarTareasSeleccionadas);
