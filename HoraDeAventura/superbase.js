// Importa el SDK de Supabase desde un CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Configura Supabase con tus credenciales
const supabaseUrl = 'https://ihxhquvjopmpgjysugqw.supabase.co'; // Tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeGhxdXZqb3BtcGdqeXN1Z3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTgyNDIsImV4cCI6MjA1NjE3NDI0Mn0.G6NZ15PSg0U4tZ0CJwjzEud3ns94usGgQ3rUp7VCDp0'; // Tu clave anónima
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

function enviarReporte(tipo) {
    const videoUrl = document.querySelector('iframe').src;
    const rutaArchivo = window.location.pathname;

    console.log("Reporte enviado:", { tipo, videoUrl, rutaArchivo });
    alert("Reporte enviado correctamente.");
}

// Asigna el evento al botón
document.getElementById('reportarBtn').addEventListener('click', () => {
    enviarReporte('No se reproduce');
});