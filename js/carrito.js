document.addEventListener("DOMContentLoaded", () => 
    {
    const vagonItemsStorage = JSON.parse(localStorage.getItem('vagon')) || [];
    const vagonItemsPrice = JSON.parse(localStorage.getItem('price')) || [];
    const vagonItemsQ = JSON.parse(localStorage.getItem('cant')) || [];
    const vagonTableBody = document.getElementById('vagon-items');
    const totalgeneral = document.getElementById('total');
    let total = 0;

 
    // Cargar productos en la tabla del carrito
    vagonItemsStorage.forEach((photo, i) => 
    {
        const row = document.createElement('tr');

        // Nombre del producto
        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = photo.title;
        row.appendChild(nombreCelda);

        // Precio del producto
        const precioCelda = document.createElement('td');
        precioCelda.textContent = `$${vagonItemsPrice[i]}`;
        row.appendChild(precioCelda);

        // Cantidad variable
        const cantidadCelda = document.createElement('td');
        cantidadCelda.textContent = vagonItemsQ[i];
        row.appendChild(cantidadCelda);

        // Subtotal 
        const subtotalCelda = document.createElement('td');
        const subtotalActual = vagonItemsPrice[i] * vagonItemsQ[i];
        subtotalCelda.textContent = `$${subtotalActual}`;
        row.appendChild(subtotalCelda);

        // Botón para eliminar la fila
        const eliminarCelda = document.createElement('td');
        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-danger', 'btn-sm');
        eliminarBoton.addEventListener('click', () => {
                    
            // Actualizar el total restando el subtotal de la fila
            total -= subtotalActual;
            totalgeneral.textContent = total.toFixed(2);
        // Eliminar fila de la tabla
            row.remove();

            // Actualizar los datos del localStorage
            vagonItemsStorage.splice(i, 1);
            vagonItemsPrice.splice(i, 1);
            vagonItemsQ.splice(i, 1);

            localStorage.setItem('vagon', JSON.stringify(vagonItemsStorage));
            localStorage.setItem('price', JSON.stringify(vagonItemsPrice));
            localStorage.setItem('cant', JSON.stringify(vagonItemsQ));

            });

        eliminarCelda.appendChild(eliminarBoton);
        row.appendChild(eliminarCelda);


        // Agregar fila a la tabla
        vagonTableBody.appendChild(row);

        // Sumar al total
        total += subtotalActual;
    });

    // Mostrar el total

    totalgeneral.textContent = total.toFixed(2);

    // Botón para limpiar el carrito y volver al inicio
    document.getElementById('limpiar-vagon').addEventListener('click', () => 
    {
        localStorage.removeItem('vagon');
        localStorage.removeItem('price');
        localStorage.removeItem('cant'); 
        window.location.href = 'index.html'; 
    });

    // Botón para finalizar la compra con sweet Alert
    document.getElementById('finalizar-compra').addEventListener('click', () => 
    {
        if (!total || total === 0 || isNaN(total)) {
            Swal.fire({
                title: 'Error',
                text: 'Seleccione algun item para comprar',
                icon: 'error',
                confirmButtonText: 'Volver al carrito'
            });
        
            return;
        };

        Swal.fire({
            title: 'Solicitud registrada!',
            text: `Se procesó la compra por un Total de: $${total}.`,
            icon: 'success',
            confirmButtonText: 'Redirigiendo al Inicio'
        });

        // Limpiar el carrito después de finalizar la compra
        localStorage.removeItem('vagon');
        localStorage.removeItem('price');
        localStorage.removeItem('cant');     
        
        // Redirigir al inicio despues de 4 segundos
        setTimeout(() => {
        window.location.href = 'index.html'; 
        }, 4000);     
    });
});
