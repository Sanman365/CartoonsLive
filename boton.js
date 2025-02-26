document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.report-button').forEach(button => {
    button.addEventListener('click', async (e) => {
      const reportType = e.target.id; // Obtiene el ID del botón clickeado
      const iframe = document.querySelector('iframe');

      if (!iframe) {
        console.error('No se encontró el elemento <iframe>');
        return;
      }

      const videoSrc = iframe.src; // Obtiene la URL del video desde el iframe
      const htmlFile = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo HTML
      const filePath = window.location.pathname; // Obtiene la ruta completa desde la carpeta raíz

      console.log('Datos a enviar:', { type: reportType, video: videoSrc, htmlFile: htmlFile, filePath: filePath }); // Verifica los datos

      try {
        // Enviar el reporte al servidor
        const response = await fetch('http://localhost:5000/api/reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: reportType,
            video: videoSrc,
            htmlFile: htmlFile,
            filePath: filePath, // Asegúrate de enviar este campo
          }),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        alert(data.message); // Mostrar mensaje de confirmación
      } catch (error) {
        console.error('Error al enviar el reporte:', error);
        alert('Hubo un error al enviar el reporte');
      }
    });
  });
});