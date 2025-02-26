const supabaseUrl = 'https://ihxhquvjopmpgjysugqw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeGhxdXZqb3BtcGdqeXN1Z3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTgyNDIsImV4cCI6MjA1NjE3NDI0Mn0.G6NZ15PSg0U4tZ0CJwjzEud3ns94usGgQ3rUp7VCDp0';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function enviarReporte(tipo) {
    const videoUrl = document.querySelector('iframe').src;
    const rutaArchivo = window.location.pathname;

    const { data, error } = await supabase
        .from('reportes')
        .insert([
            { 
                tipo_reporte: tipo, 
                video_url: videoUrl, 
                ruta_archivo: rutaArchivo 
            }
        ]);

    if (error) {
        console.error("Error al enviar el reporte: ", error);
    } else {
        alert("Reporte enviado correctamente.");
    }
}