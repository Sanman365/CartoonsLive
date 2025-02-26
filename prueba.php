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

// Obtener el reporte del formulario
if (isset($_POST['reporte'])) {
    $reporte = $conn->real_escape_string($_POST['reporte']);
    
    // Insertar el reporte en la base de datos
    $sql = "INSERT INTO reportes (reporte) VALUES ('$reporte')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Reporte enviado correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
