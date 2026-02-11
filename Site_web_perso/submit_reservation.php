<?php
// submit_reservation.php
include 'db_connect.php';

// Check if request is AJAX (JSON) or Form POST
// Since we used fetch in JS typically, but looking at old form it might be standard POST.
// Let's support standard POST for simplicity or JSON if we upgrade JS.
// Based on current form structure, standard POST is easier to implement without heavy JS rewrite,
// BUT handling the 'selected date' which is in a div/input needs care.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $car_model = $conn->real_escape_string($_POST['car_model']);
    $date = $conn->real_escape_string($_POST['date']);
    $email = $conn->real_escape_string($_POST['email']);

    // Basic Validation
    if(empty($car_model) || empty($date) || empty($email)) {
        echo "Veuillez remplir tous les champs.";
        exit;
    }

    $sql = "INSERT INTO reservations (car_model, reservation_date, email) VALUES ('$car_model', '$date', '$email')";

    if ($conn->query($sql) === TRUE) {
         // Success: Redirect back with success
         // Since reservation is on a separate page
         header("Location: reservation.html?status=success&car=$car_model");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
