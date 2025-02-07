// Obtener el nombre del archivo actual (ejemplo: "1x1.html")
let currentPageEpisode = window.location.pathname.split('/').pop();

// Extraer temporada y episodio usando una expresión regular
let episodeMatch = currentPageEpisode.match(/(\d+)x(\d+)\.html/);

if (episodeMatch) {
    let seasonNumber = episodeMatch[1]; // Número de temporada
    let episodeNumber = episodeMatch[2]; // Número de episodio

    // Construir la ruta de la imagen desde "imagenes_1/" (sin espacios en el nombre de carpeta)
    let episodeImage = `../imagenes1/${seasonNumber}x${episodeNumber}.jpg`;

    // Asignar la imagen al contenedor con id "episode-img"
    let imgElement = document.getElementById("episode-img");

    if (imgElement) {
        imgElement.src = episodeImage;

        // Manejo de error si la imagen no existe
        imgElement.onerror = function() {
            this.src = "../imagenes1/imagen-no-encontrada.jpg"; // Imagen alternativa
        };
    } else {
        console.error("No se encontró el elemento con ID 'episode-img'");
    }
} else {
    console.error("No se pudo extraer la temporada y episodio del nombre de archivo");
}
