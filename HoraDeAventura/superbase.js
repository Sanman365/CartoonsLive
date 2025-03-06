import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://ihxhquvjopmpgjysugqw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeGhxdXZqb3BtcGdqeXN1Z3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTgyNDIsImV4cCI6MjA1NjE3NDI0Mn0.G6NZ15PSg0U4tZ0CJwjzEud3ns94usGgQ3rUp7VCDp0';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Función para enviar el reporte
function enviarReporte(tipo) {
    console.log("Botón clickeado. Tipo de reporte:", tipo); // Verifica que la función se ejecuta
    const videoUrl = document.querySelector('iframe').src;
    const rutaArchivo = window.location.pathname;

    console.log("Datos a enviar:", { tipo, videoUrl, rutaArchivo }); // Verifica los datos

    supabaseClient
        .from('reportes')
        .insert([{ tipo_reporte: tipo, video_url: videoUrl, ruta_archivo: rutaArchivo }])
        .then(response => {
            if (response.error) {
                console.error("Error al enviar el reporte:", response.error);
                alert("Hubo un error al enviar el reporte.");
            } else {
                console.log("Reporte enviado correctamente:", response.data);
                alert("Reporte enviado correctamente.");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            alert("Hubo un error en la solicitud.");
        });
}

// Verifica la conexión con Supabase
async function verificarConexion() {
    const { data, error } = await supabaseClient
        .from('reportes')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error al conectar con Supabase:", error);
    } else {
        console.log("Conexión exitosa. Datos:", data);
    }
}

// Llama a la función para verificar la conexión
verificarConexion();