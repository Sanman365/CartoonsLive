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

    // Verificar si los elementos existen antes de modificar su href
    let prevLink = document.getElementById("prev-link");
    let nextLink = document.getElementById("next-link");

    if (prevLink && prevEpisode) {
        prevLink.href = prevEpisode;
    } else if (prevLink) {
        prevLink.style.display = "none"; // Oculta si no hay episodio anterior
    }

    if (nextLink) {
        nextLink.href = nextEpisode;
    }
}
