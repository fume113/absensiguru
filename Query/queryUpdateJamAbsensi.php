<?php
require "../Koneksi/koneksi.php"; // Menghubungkan ke file koneksi.php

// Inisialisasi respons awal
$response = [
    "success" => false,
    "message" => "Terjadi kesalahan dalam memproses permintaan.",
];

// Mengirim respons JSON
header('Content-Type: application/json');

// Menerima data yang dikirim melalui permintaan POST
$data = json_decode(file_get_contents("php://input"));

if (isset($data->jam[0]) && isset($data->hari)) {
    $jam = $data->jam[0]; // Akses elemen pertama dari array jam
    $hari = $data->hari;

    // Query update data ke database
    $query = "UPDATE data_jam SET 
        `Jam Ke-0` = ?,
        `Jam Ke-1` = ?,
        `Jam Ke-2` = ?,
        `Jam Ke-3` = ?,
        `Jam Ke-4` = ?,
        `Istirahat 1` = ?,
        `Jam Ke-5` = ?,
        `Jam Ke-6` = ?,
        `Jam Ke-7` = ?,
        `Istirahat 2` = ?,
        `Jam Ke-8` = ?,
        `Jam Ke-9` = ?,
        `Jam Ke-10` = ?,
        `Jam Ke-TU` = ?
    WHERE hari = ?";

    // Persiapkan statement
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param(
            'sssssssssssssss',
            $jam->{"Jam Ke-0"},
            $jam->{"Jam Ke-1"},
            $jam->{"Jam Ke-2"},
            $jam->{"Jam Ke-3"},
            $jam->{"Jam Ke-4"},
            $jam->{"Istirahat 1"},
            $jam->{"Jam Ke-5"},
            $jam->{"Jam Ke-6"},
            $jam->{"Jam Ke-7"},
            $jam->{"Istirahat 2"},
            $jam->{"Jam Ke-8"},
            $jam->{"Jam Ke-9"},
            $jam->{"Jam Ke-10"},
            $jam->{"Jam Ke-TU"},
            $hari
        );

        // Eksekusi statement
        if ($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "Data berhasil diperbarui.";
            
            // Tidak perlu mengambil data terbaru, gunakan data yang sudah diterima
            $response["updatedData"] = $jam;
        } else {
            $response["message"] = "Terjadi kesalahan saat mengupdate data: " . $stmt->error;
        }

        // Tutup statement
        $stmt->close();
    } else {
        $response["message"] = "Gagal mempersiapkan statement: " . $conn->error;
    }
} else {
    $response["message"] = "Data yang diterima tidak lengkap.";
}

echo json_encode($response);
?>
