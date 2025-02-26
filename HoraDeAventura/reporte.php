<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "Arigames290607"; // Deja la contraseña vacía si usas XAMPP con root sin contraseña
$database = "cinepatos";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $database);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
if (isset($_POST['reporte']) && isset($_POST['video_url']) && isset($_POST['ruta_archivo'])) {
    $reporte = $conn->real_escape_string($_POST['reporte']);
    $video_url = $conn->real_escape_string($_POST['video_url']);
    $ruta_archivo = $conn->real_escape_string($_POST['ruta_archivo']);
    
    // Insertar el reporte en la base de datos
    $sql = "INSERT INTO reportes (reporte, video_url, ruta_archivo) VALUES ('$reporte', '$video_url', '$ruta_archivo')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Reporte enviado correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>