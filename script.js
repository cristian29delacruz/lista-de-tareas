
const nuevaTareaInput = document.getElementById('nuevaTareaInput');
const agregarTareaBtn = document.getElementById('agregarTareaBtn');
const listaDeTareas = document.getElementById('listaDeTareas');


const eliminarSeleccionadasBtn = document.getElementById('eliminarSeleccionadasBtn');
const marcarSeleccionadasBtn = document.getElementById('marcarSeleccionadasBtn');
const desmarcarSeleccionadasBtn = document.getElementById('desmarcarSeleccionadasBtn');


function agregarTarea() {
    const textoTarea = nuevaTareaInput.value.trim();

    

    const listItem = document.createElement('li');
    listItem.classList.add('tarea-item');

   
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; 
    checkbox.classList.add('tarea-checkbox'); 

   
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
    
  
    tareaTextoSpan.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change')); 
    });

    const tareaAccionesDiv = document.createElement('div');
    tareaAccionesDiv.classList.add('tarea-acciones');

    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.classList.add('eliminar');

    eliminarBtn.addEventListener('click', () => {
        listaDeTareas.removeChild(listItem);
    });

    
    listItem.appendChild(checkbox); 
    listItem.appendChild(tareaTextoSpan);
    tareaAccionesDiv.appendChild(eliminarBtn);
    listItem.appendChild(tareaAccionesDiv);
    
    listaDeTareas.appendChild(listItem);

    nuevaTareaInput.value = '';
    nuevaTareaInput.focus();
}


agregarTareaBtn.addEventListener('click', agregarTarea);

nuevaTareaInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});


function eliminarTareasSeleccionadas() {
   
    const checkboxesSeleccionados = document.querySelectorAll('.tarea-checkbox:checked');

   
    checkboxesSeleccionados.forEach(checkbox => {
       
        const listItem = checkbox.closest('.tarea-item'); 
        if (listItem) { 
            listaDeTareas.removeChild(listItem); 
        }
    });
}


function marcarTareasSeleccionadas() {
    const checkboxesSeleccionados = document.querySelectorAll('.tarea-checkbox:checked');
    checkboxesSeleccionados.forEach(checkbox => {
        const listItem = checkbox.closest('.tarea-item');
        if (listItem && !listItem.classList.contains('completada')) {
            listItem.classList.add('completada');
           
            checkbox.checked = true; 
        }
    });
}


function desmarcarTareasSeleccionadas() {
    const checkboxesSeleccionados = document.querySelectorAll('.tarea-checkbox:checked');
    checkboxesSeleccionados.forEach(checkbox => {
        const listItem = checkbox.closest('.tarea-item');
        if (listItem && listItem.classList.contains('completada')) {
            listItem.classList.remove('completada');
           
            checkbox.checked = false;
        }
    });
}



eliminarSeleccionadasBtn.addEventListener('click', eliminarTareasSeleccionadas);
marcarSeleccionadasBtn.addEventListener('click', marcarTareasSeleccionadas);
desmarcarSeleccionadasBtn.addEventListener('click', desmarcarTareasSeleccionadas);
