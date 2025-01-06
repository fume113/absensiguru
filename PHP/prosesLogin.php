<?php
// Replace with your actual database credentials
$host = "localhost";
$username = "root";
$password = ""; 
$database = "absenguru_db"; 

// Create a database connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle login form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['user'];
    $password = $_POST['psw'];

    // Validate user credentials against the database
    $query = "SELECT * FROM data_admin WHERE username = '$user' AND password = '$password'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
        // Start a session
        session_start();

        // Store user information in the session
        $_SESSION['user'] = $user;

        // Redirect to a dashboard or another page
        header("Location: ../PHP Page/databaseAbsensi.php");
        exit();
    } else {
        // Invalid login credentials
        echo "Username atau Password Salah";
    }
} else {
    // Debug: Output a message if the form was not submitted as expected
    echo "Form was not submitted.";
}

// Close the database connection
mysqli_close($conn);
?>
