<?php
// Pastikan Anda memiliki koneksi ke database
require_once('../Koneksi/koneksi.php');

// Setel tipe konten response menjadi JSON
header('Content-Type: application/json');

// Inisialisasi respons awal
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Baca data JSON dari permintaan POST
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    // Validasi data
    $nama = $data['nama'];
    $nip = $data['nip'];
    $golongan = $data['golongan'];
    $mapel = $data['mapel'];

    if (empty($nama) || empty($nip) || empty($golongan) || empty($mapel)) {
        $response['status'] = 'error';
        $response['pesan'] = 'Semua kolom harus diisi.';
    } else {
        // Query SQL untuk memeriksa apakah NIP guru sudah terdaftar
        $checkQuery = "SELECT * FROM data_guru WHERE nip = ? and nama = ?";
        $checkStmt = $conn->prepare($checkQuery);

        if ($checkStmt) {
            // Bind parameter
            $checkStmt->bind_param("ss", $nip, $nama);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();

            if ($checkResult->num_rows > 0) {
                // Guru dengan NIP yang sama sudah terdaftar
                $response['status'] = 'blocked';
                $response['pesan'] = 'Nama dan NIP guru sudah terdaftar.';
            } else {
                // Query SQL untuk menambahkan data guru ke dalam tabel
                $insertQuery = "INSERT INTO data_guru (nama, nip, golongan, mata_pelajaran) VALUES (?, ?, ?, ?)";
                
                // Persiapkan statement SQL
                $stmt = $conn->prepare($insertQuery);

                if ($stmt) {
                    // Bind parameter
                    $stmt->bind_param("ssss", $nama, $nip, $golongan, $mapel);

                    // Eksekusi statement SQL
                    if ($stmt->execute()) {
                        $response['status'] = 'sukses';
                        $response['pesan'] = 'Data guru berhasil ditambahkan.';
                    } else {
                        $response['status'] = 'error';
                        $response['pesan'] = 'Gagal menambahkan data guru ke database: ' . $stmt->error;
                    }

                    // Tutup statement
                    $stmt->close();
                } else {
                    $response['status'] = 'error';
                    $response['pesan'] = 'Gagal membuat statement SQL.';
                }
            }

            // Tutup statement untuk pemeriksaan NIP
            $checkStmt->close();
        } else {
            $response['status'] = 'error';
            $response['pesan'] = 'Gagal membuat statement SQL untuk pemeriksaan NIP: ' . $conn->error;
        }
    }
} else {
    $response['status'] = 'error';
    $response['pesan'] = 'Metode permintaan tidak valid.';
}

// Keluarkan respons dalam format JSON
echo json_encode($response);

// Tutup koneksi ke database jika diperlukan
$conn->close();
?>
