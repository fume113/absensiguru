<?php
// Start the session (if not already started)
session_start();

// Check if the user is logged in
if (isset($_SESSION['user'])) {
    // Unset all session variables
    session_unset();

    // Destroy the session
    session_destroy();

    // Redirect to the login page or wherever you want
    header("Location: ../index.php"); // Change "login.php" to your actual login page URL
    exit();
} else {
    // If the user is not logged in, redirect them to the login page
    header("Location: ../index.php"); // Change "login.php" to your actual login page URL
    exit();
}
?>
