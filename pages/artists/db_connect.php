<?php
$host = 'localhost';
$dbname = 'apollo';
$username = 'root'; // Default username for phpMyAdmin
$password = '';     // Default password is empty

// Create the database connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>