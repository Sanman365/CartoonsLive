// Función para enviar el reporte
function enviarReporte(tipo) {
    const videoUrl = document.querySelector('iframe').src;
    const rutaArchivo = window.location.pathname;

    console.log("Datos a enviar:", { tipo, videoUrl, rutaArchivo });

    // Obtener la hora del último reporte desde localStorage
    const lastReportTime = localStorage.getItem(`lastReportTime_${videoUrl}`);

    if (lastReportTime) {
        const currentTime = Date.now();
        const timeDifference = currentTime - parseInt(lastReportTime, 10);

        // Verificar si han pasado menos de 10 minutos (600,000 milisegundos)
        if (timeDifference < 10 * 60 * 1000) {
            alert("Ya has enviado un reporte para este video. Se revisará lo más pronto posible.");
            return;
        }
    }

    // Guardar la hora actual en localStorage
    localStorage.setItem(`lastReportTime_${videoUrl}`, Date.now());

    // Mostrar mensaje de éxito
    alert("Reporte enviado correctamente. ¡Gracias!");

    // Aquí puedes agregar lógica adicional, como enviar el reporte a un servidor si es necesario.
    // Por ejemplo, usando fetch() para enviar los datos a un backend.
}

// Expone la función al ámbito global
window.enviarReporte = enviarReporte;