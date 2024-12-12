<?php
include 'db_connect.php'; // Include database connection
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username_or_email = $_POST['emailorUser'];
    $password = $_POST['password'];

    // Check user in the database
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username_or_email, $username_or_email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $username, $hashed_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Set session variables and redirect to dashboard
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;
            header("Location: dashboard.php");
            exit();
        } else {
            echo "Invalid username/email or password. <a href='login.php'>Try again</a>";
        }
    } else {
        echo "Invalid username/email or password. <a href='login.php'>Try again</a>";
    }

    $stmt->close();
}
$conn->close();
?>