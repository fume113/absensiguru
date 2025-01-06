<?php
require "../Koneksi/koneksi.php"; // Pastikan ini menghubungkan dengan file yang benar

// Inisialisasi respons
$response = array();

// Pastikan data yang dikirim dalam bentuk JSON dari JavaScript tersedia
$data = json_decode(file_get_contents("php://input", true));

if ($data && isset($data->date)) {
    $selectedDate = $data->date;

    // Buat query SQL untuk mengambil data berdasarkan tanggal yang dipilih
    $query = "SELECT * FROM data_absensi WHERE tanggal = ?";

    $stmt = $conn->prepare($query);

    if ($stmt) {
        // Bind parameter
        $stmt->bind_param("s", $selectedDate);
        $stmt->execute();

        $result = $stmt->get_result();

        $dataResponse = array(); // Array untuk menampung data

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Menambahkan setiap baris data ke dalam array dataResponse
                $dataResponse[] = $row;
            }
            $response = $dataResponse;
        } else {
            $response = [];
        }

        $stmt->close();
    } else {
        $response = [];
    }
} else {
    $response = [];
}

// Mengirim respons JSON
header('Content-Type: application/json');
echo json_encode($response);
?>