import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://ihxhquvjopmpgjysugqw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeGhxdXZqb3BtcGdqeXN1Z3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTgyNDIsImV4cCI6MjA1NjE3NDI0Mn0.G6NZ15PSg0U4tZ0CJwjzEud3ns94usGgQ3rUp7VCDp0';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Función para enviar el reporte
async function enviarReporte(tipo) {
    const videoUrl = document.querySelector('iframe').src;
    const rutaArchivo = window.location.pathname;

    console.log("Datos a enviar:", { tipo, videoUrl, rutaArchivo });

    // Verificar si el usuario ya ha enviado un reporte recientemente
    const { data: existingReports, error: queryError } = await supabaseClient
        .from('reportes')
        .select('*')
        .eq('video_url', videoUrl) // Filtra por el mismo video
        .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString()); // Últimos 10 minutos

    if (queryError) {
        console.error("Error al verificar reportes existentes:", queryError);
        alert("Hubo un error al verificar reportes existentes.");
        return;
    }

    if (existingReports.length > 0) {
        // Si ya hay un reporte reciente, mostrar un mensaje al usuario
        alert("Ya has enviado un reporte para este video. Se revisará lo más pronto posible.");
        return;
    }

    // Si no hay reportes recientes, insertar el nuevo reporte
    const { data, error } = await supabaseClient
        .from('reportes')
        .insert([{ tipo_reporte: tipo, video_url: videoUrl, ruta_archivo: rutaArchivo }]);

    if (error) {
        console.error("Error al enviar el reporte:", error);
        alert("Hubo un error al enviar el reporte.");
    } else {
        console.log("Reporte enviado correctamente:", data);
        alert("Reporte enviado correctamente. ¡Gracias!");
    }
}

// Expone la función al ámbito global
window.enviarReporte = enviarReporte;