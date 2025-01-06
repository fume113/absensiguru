<?php
require "../Koneksi/koneksi.php"; // Pastikan ini menghubungkan dengan file yang benar

// Setel tipe konten response menjadi JSON
header('Content-Type: application/json');

// Pastikan data yang dikirim dalam bentuk JSON dari JavaScript tersedia
$data = json_decode(file_get_contents("php://input", true));

// Pastikan 'hari' diterima dari permintaan POST
if (isset($_POST['hari'])) {
    $hari = $_POST['hari'];

    // Buat query SQL untuk mengambil data berdasarkan hari yang dipilih
    $query = "SELECT * FROM data_jam WHERE hari = ?"; // Gantilah 'hari' dengan nama kolom yang sesuai

    // Persiapkan statement
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param('s', $hari);

        // Eksekusi statement
        if ($stmt->execute()) {
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode($data);
            } else {
                echo json_encode([]);
            }
        } else {
            echo json_encode(["error" => "Gagal menjalankan kueri: " . $stmt->error]);
        }

        // Tutup statement
        $stmt->close();
    } else {
        echo json_encode(["error" => "Gagal mempersiapkan statement: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Data 'hari' tidak diterima dari permintaan POST"]);
}
?>
