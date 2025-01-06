<?php
require "../Koneksi/koneksi.php"; // Pastikan ini menghubungkan dengan file yang benar

// Buat query SQL untuk mengambil data
$query = "SELECT * FROM data_guru";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
} else {
    echo json_encode([]);
}
?>