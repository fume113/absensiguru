<?php
require "../Koneksi/koneksi.php"; // Pastikan ini menghubungkan dengan file yang benar

// Mendapatkan tanggal hari ini dan Set zona waktu default ke Asia/Jakarta
date_default_timezone_set("Asia/Jakarta");
$hariIni = date("Y-m-d");

// Buat query SQL untuk mengambil data berdasarkan tanggal hari ini
$query = "SELECT * FROM data_absensi WHERE tanggal = ?";

$stmt = $conn->prepare($query);

if ($stmt) {
    // Bind parameter
    $stmt->bind_param("s", $hariIni);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode([]);
    }

    $stmt->close();
} else {
    echo json_encode([]);
}
?>
