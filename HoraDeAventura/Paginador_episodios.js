   // Obtener el nombre del archivo actual (ejemplo: "1x2.html")
   let currentPage = window.location.pathname.split('/').pop();

// Extraer temporada y episodio usando una expresión regular
let match = currentPage.match(/(\d+)x(\d+)\.html/);

if (match) {
    let seasonNumber = match[1]; // Número de temporada
    let episodeNumber = parseInt(match[2]); // Número de episodio

    // Crear rutas para el anterior y siguiente episodio
    let prevEpisode = episodeNumber > 1 ? `${seasonNumber}x${episodeNumber - 1}.html` : null;
    let nextEpisode = `${seasonNumber}x${episodeNumber + 1}.html`;

    // Asignar enlaces a las flechas
    if (prevEpisode) {
        document.getElementById("prev-link").href = prevEpisode;
    } else {
        document.getElementById("prev-link").style.display = "none"; // Oculta la flecha si no hay anterior
    }

    document.getElementById("next-link").href = nextEpisode;
}