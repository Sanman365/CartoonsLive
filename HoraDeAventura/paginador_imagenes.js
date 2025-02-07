let currentPageEpisode = window.location.pathname.split('/').pop();

// Aquí iría el resto de tu código

// Extraer temporada y episodio usando una expresión regular
let episodeMatch = currentPage.match(/(\d+)x(\d+)\.html/);

if (match) {
    let seasonNumber = match[1]; // Número de temporada (por si lo necesitas después)
    let episodeNumber = match[2]; // Número de episodio

    // Construir la ruta de la imagen desde "imagenes 1/"
    let episodeImage = `../imagenes 1/${seasonNumber}x${episodeNumber}.jpg`;

    // Asignar la imagen al contenedor
    let imgElement = document.getElementById("episode-img");
    imgElement.src = episodeImage;

    // Manejo de error si la imagen no existe
    imgElement.onerror = function() {
        this.src = "../imagenes 1/imagen-no-encontrada.jpg"; // Imagen alternativa
    };
}