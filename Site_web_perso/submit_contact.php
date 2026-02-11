<?php
// submit_contact.php
// Enable Error Reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_connect.php';

// Check if POST is empty (which means either not POST or post_max_size exceeded)
if (empty($_POST) && $_SERVER["REQUEST_METHOD"] == "POST") {
    die("Erreur: Aucune donnée reçue. Vérifiez la configuration PHP post_max_size.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and Validate Input
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $message = $conn->real_escape_string($_POST['message']);

    // Insert Query
    $sql = "INSERT INTO messages (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        // Success: Redirect back with a success parameter
        header("Location: index.html?status=success#contact");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    // Not a POST request
    header("Location: index.html");
}

$conn->close();
?>
