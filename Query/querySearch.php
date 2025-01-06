<?php
require "../Koneksi/koneksi.php"; // Pastikan ini menghubungkan dengan file yang benar

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['search'])) {
        $searchText = $data['search'];
        // Query untuk mencari data di tabel data_guru berdasarkan NIP
        $sql = "SELECT nip, nama FROM data_guru WHERE nip = '$searchText'"; // Hanya mengambil kolom nip dan nama

        $result = $conn->query($sql);

        // Inisialisasi objek respons
        $response = array();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $response = $row; // Menyimpan data dalam objek respons
        }

        // Mengirim data dalam format JSON ke client
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Jika parameter 'search' tidak ada, kirim respons kosong
        header('Content-Type: application/json');
        echo json_encode([]);
    }
} else {
    // Jika metode permintaan bukan POST, kirim respons kosong
    header('Content-Type: application/json');
    echo json_encode([]);
}

// Menutup koneksi database
$conn->close();
?>
