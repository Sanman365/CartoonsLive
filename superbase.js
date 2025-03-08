import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabaseUrl = 'TU_URL_SUPABASE';
const supabaseKey = 'TU_API_KEY_SUPABASE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para enviar el reporte
async function enviarReporte(tipo) {
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

    // Insertar datos en Supabase
    const { data, error } = await supabase
        .from('reportes') // Reemplaza 'reportes' con el nombre de tu tabla
        .insert([{ tipo: tipo, video_url: videoUrl, ruta_archivo: rutaArchivo }]);

    if (error) {
        console.error("Error al enviar el reporte:", error);
        alert("Hubo un error al enviar el reporte.");
    } else {
        console.log("Reporte enviado correctamente:", data);
        alert("Reporte enviado correctamente. ¡Gracias!");
    }
}

// Asignar eventos a los botones de reporte
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reportarNoReproduce').addEventListener('click', () => enviarReporte('No se reproduce'));
    document.getElementById('reportarAudio').addEventListener('click', () => enviarReporte('Audio desincronizado'));
    document.getElementById('reportarCalidad').addEventListener('click', () => enviarReporte('Calidad baja'));
    document.getElementById('reportarOtro').addEventListener('click', () => enviarReporte('Otro problema'));
});

// Expone la función al ámbito global
window.enviarReporte = enviarReporte;