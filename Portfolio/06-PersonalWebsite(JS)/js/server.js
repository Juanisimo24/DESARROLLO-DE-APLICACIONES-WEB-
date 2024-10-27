// Función para agregar información del formulario a la tabla
function addRowToSchedule() {
    // Obtener los valores de los campos del formulario
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start').value;
    const endTime = document.getElementById('end').value;
    const description = document.getElementById('description').value;
    const place = document.getElementById('place').value;
    const type = document.getElementById('type').value;
    const notes = document.getElementById('notes').value;
    const status = document.getElementById('status').value;
    console.log("date:",date,", ",startTime);

    // Crear una nueva fila de la tabla
    const tableBody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');

    // Crear celdas para cada campo y añadirlos a la fila
    const dateCell = document.createElement('td');
    dateCell.textContent = date;
    newRow.appendChild(dateCell);

    const startCell = document.createElement('td');
    startCell.textContent = startTime;
    newRow.appendChild(startCell);

    const endCell = document.createElement('td');
    endCell.textContent = endTime;
    newRow.appendChild(endCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description;
    newRow.appendChild(descriptionCell);

    const placeCell = document.createElement('td');
    placeCell.textContent = place;
    newRow.appendChild(placeCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = type;
    newRow.appendChild(typeCell);

    const notesCell = document.createElement('td');
    notesCell.textContent = notes;
    newRow.appendChild(notesCell);

    const statusCell = document.createElement('td');
    const statusImage = document.createElement('img');
    statusImage.src = status === 'busy' ? 'images/busy.png' : 'images/free.png';
    statusImage.alt = status === 'busy' ? 'Busy' : 'Available';
    statusImage.width = 50;
    statusCell.appendChild(statusImage);
    newRow.appendChild(statusCell);

    // Añadir la fila a la tabla
    tableBody.appendChild(newRow);

    // Limpiar los campos del formulario
    document.getElementById('eventForm').reset();
}

