<?php
require "../Koneksi/koneksi.php";

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);
$response = array();

try {
    // Set timezone ke Asia/Jakarta
    date_default_timezone_set('Asia/Jakarta');
    // Jam Real-time
    $jamstr = strtotime(date("H:i:s"));
    // Ambil hari dari permintaan POST
    $today = $data['today']; // Ambil nilai today dari data yang dikirimkan
    
    // Query untuk mengambil jam-jam dari tabel data_jam (sesuaikan dengan struktur tabel Anda)
    $queryJadwal = "SELECT * FROM `data_jam` WHERE `hari` = ?";
    $stmtJadwal = $conn->prepare($queryJadwal);
    $stmtJadwal->bind_param("s", $today);
    $stmtJadwal->execute();
    $result = $stmtJadwal->get_result();

    if ($result->num_rows > 0) {
        $jamData = $result->fetch_assoc();

        // Mengganti jam-jam dalam kode dengan jam-jam dari database
        $jam0 = strtotime($jamData['Jam Ke-0']);
        $jam1 = strtotime($jamData['Jam Ke-1']);
        $jam2 = strtotime($jamData['Jam Ke-2']);
        $jam3 = strtotime($jamData['Jam Ke-3']);
        $jam4 = strtotime($jamData['Jam Ke-4']);
        $jami1 = strtotime($jamData['Istirahat 1']);
        $jam5 = strtotime($jamData['Jam Ke-5']);
        $jam6 = strtotime($jamData['Jam Ke-6']);
        $jam7 = strtotime($jamData['Jam Ke-7']);
        $jami2 = strtotime($jamData['Istirahat 2']);
        $jam8 = strtotime($jamData['Jam Ke-8']);
        $jam9 = strtotime($jamData['Jam Ke-9']);
        $jam10 = strtotime($jamData['Jam Ke-10']);
        $jamTU = strtotime($jamData['Jam Ke-TU']);
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'Data jam tidak ditemukan dalam database.'
        );
        echo json_encode($response);
        exit();
    }

    function DataKeteranganMasuk($jamstr, $jam0, $jam1,  $jam2,  $jam3,  $jam4,  $jami1,  $jam5,  $jam6, $jam7,  $jami2, $jam8, $jam9,  $jam10,  $jamTU) {
        if ($jamstr >= $jam0 && $jamstr < $jam1) {
            $keteranganMasuk = "Jam Ke-0";
        } elseif ($jamstr >= $jam1 && $jamstr < $jam2) {
            $keteranganMasuk = "Jam Ke-1";
        } elseif ($jamstr >= $jam2 && $jamstr < $jam3) {
            $keteranganMasuk = "Jam Ke-2";
        } elseif ($jamstr >= $jam3 && $jamstr < $jam4) {
            $keteranganMasuk = "Jam Ke-3";
        } elseif ($jamstr >= $jam4 && $jamstr < $jami1) {
            $keteranganMasuk = "Jam Ke-4";
        } elseif ($jamstr >= $jami1 && $jamstr < $jam5) {
            $keteranganMasuk = "Jam Istirahat Ke-1";
        } elseif ($jamstr >= $jam5 && $jamstr < $jam6) {
            $keteranganMasuk = "Jam Ke-5";
        } elseif ($jamstr >= $jam6 && $jamstr < $jam7) {
            $keteranganMasuk = "Jam Ke-6";
        } elseif ($jamstr >= $jam7 && $jamstr < $jami2) {
            $keteranganMasuk = "Jam Ke-7";
        } elseif ($jamstr >= $jami2 && $jamstr < $jam8) {
            $keteranganMasuk = "Jam Istirahat Ke-2";
        } elseif ($jamstr >= $jam8 && $jamstr < $jam9) {
            $keteranganMasuk = "Jam Ke-8";
        } elseif ($jamstr >= $jam9 && $jamstr < $jam10) {
            $keteranganMasuk = "Jam Ke-9";
        } elseif ($jamstr >= $jam10 && $jamstr < $jamTU) {
            $keteranganMasuk = "Jam Ke-10";
        } else {
            $keteranganMasuk = "Belum Waktunya Absen";
        }
        if ($keteranganMasuk === "Belum Waktunya Absen") {
            // Buat respons JSON
            $response = array(
                'status' => 'aware',
                'message' => 'Belum Waktunya Absen'
            );
            echo json_encode($response);
            exit();
        }
        return $keteranganMasuk;
    }

    function DataKeteranganKeluar($jamstr, $jam1,  $jam2,  $jam3,  $jam4,  $jami1,  $jam5,  $jam6, $jam7,  $jami2, $jam8, $jam9,  $jam10,  $jamTU) {
        if ($jamstr >= $jam1 && $jamstr <= $jam2) {
            $keteranganKeluar = "Jam ke-1";
        } elseif ($jamstr >= $jam2 && $jamstr <= $jam3) {
            $keteranganKeluar = "Jam ke-2";
        } elseif ($jamstr >= $jam3 && $jamstr <= $jam4) {
            $keteranganKeluar = "Jam ke-3";
        } elseif ($jamstr >= $jam4 && $jamstr <= $jami1) {
            $keteranganKeluar = "Jam ke-4";
        } elseif ($jamstr >= $jami1 && $jamstr < $jam5) {
            $keteranganKeluar = "Jam Istirahat Ke-1";
        } elseif ($jamstr >= $jam5 && $jamstr <= $jam6) {
            $keteranganKeluar = "Jam ke-5";
        } elseif ($jamstr >= $jam6 && $jamstr <= $jam7) {
            $keteranganKeluar = "Jam ke-6";
        } elseif ($jamstr >= $jam7 && $jamstr <= $jami2) {
            $keteranganKeluar = "Jam ke-7";
        } elseif ($jamstr >= $jami2 && $jamstr < $jam8) {
            $keteranganKeluar = "Jam Istirahat Ke-2";
        } elseif ($jamstr >= $jam8 && $jamstr <= $jam9) {
            $keteranganKeluar = "Jam ke-8";
        } elseif ($jamstr >= $jam9 && $jamstr <= $jam10) {
            $keteranganKeluar = "Jam ke-9";
        } elseif ($jamstr >= $jam10 && $jamstr <= $jamTU) {
            $keteranganKeluar = "Jam ke-10";
        } elseif ($jamstr >= $jamTU) {
            $keteranganKeluar = "Jam ke-TU";
        } else {
            $keteranganKeluar = "Debugging";
        }
        if ($keteranganKeluar === "Belum Waktunya Absen") {
            // Buat respons JSON
            $response = array(
                'status' => 'aware',
                'message' => 'Belum Waktunya Absen'
            );
            echo json_encode($response);
            exit();
        }
        return $keteranganKeluar;
    }

    function isEligibleToAbsen($conn, $nip) {
        date_default_timezone_set("Asia/Jakarta");
        $tanggal = date("Y-m-d");
        $jamSekarang = date("H:i:s");
        $timeRange = 5; // Waktu dalam menit
    
        $query = "SELECT jammasuk FROM data_absensi WHERE nip = ? AND tanggal = ? ORDER BY jammasuk DESC LIMIT 1";
        $stmt = $conn->prepare($query);
        if ($stmt) {
            $stmt->bind_param("ss", $nip, $tanggal);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $lastAbsenTime = strtotime($row['jammasuk']);
                $currentTime = strtotime($jamSekarang);
    
                // Memeriksa apakah waktu absen terakhir dalam rentang waktu yang diizinkan
                if (($currentTime - $lastAbsenTime) / 1 < $timeRange) {
                    $stmt->close();
                    return false;
                }
            }
            $stmt->close();
        }
    
        return true;
    }
    

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validasi data
        date_default_timezone_set("Asia/Jakarta");
        $tanggal = date("Y-m-d");
        $nip = isset($data['nip']) ? $data['nip'] : '';
        $nama = isset($data['nama']) ? $data['nama'] : '';
        $jam = date("H:i:s");

        if (empty($nama) || empty($nip)) {
            $response['status'] = 'error';
            $response['message'] = 'Semua kolom harus diisi.';
        } else {
            if (isEligibleToAbsen($conn, $nip)) {
                // Cek apakah data dengan nip, tanggal hari ini sudah ada dalam database
                $checkQuery = "SELECT * FROM data_absensi WHERE nip = ? AND tanggal = ?";
                $checkStmt = $conn->prepare($checkQuery);
                if ($checkStmt) {
                        // Bind parameter
                        $checkStmt->bind_param("ss", $nip, $tanggal);
                        $checkStmt->execute();
                        $checkResult = $checkStmt->get_result();
        
                        if ($checkResult->num_rows > 0) {
                            $row = $checkResult->fetch_assoc();
        
                            // Memeriksa apakah jamkeluar sudah memiliki nilai
                            if (!empty($row['jamkeluar'])) {
                                // Jamkeluar sudah memiliki nilai, guru sudah absen
                                $response['status'] = 'warning'; // Ganti status menjadi 'warning'
                                $response['message'] = 'Guru sudah absen.';
                                echo json_encode($response);
                                exit();
                            }
        
                            // Data sudah ada, lakukan UPDATE
                            $updateQuery = "UPDATE data_absensi SET jamkeluar = ?, keterangankeluar = ? WHERE nip = ? AND tanggal = ?";
        
                            $updateStmt = $conn->prepare($updateQuery);
        
                            if ($updateStmt) {
                                // Isi nilai-nilai parameter yang sesuai
                                $hasilKeluar = DataKeteranganKeluar($jamstr, $jam1,  $jam2,  $jam3,  $jam4,  $jami1,  $jam5,  $jam6, $jam7,  $jami2, $jam8, $jam9,  $jam10,  $jamTU);
                                $updateStmt->bind_param("ssss", $jam, $hasilKeluar, $nip, $tanggal);
        
                                if ($updateStmt->execute()) {
                                    $response['status'] = 'sukses';
                                    $response['message'] = 'Data guru berhasil diperbarui.';
                                } else {
                                    $response['status'] = 'error';
                                    $response['message'] = 'Gagal memperbarui data guru di database: ' . $updateStmt->error;
                                }
                                $updateStmt->close();
                            } else {
                                $response['status'] = 'error';
                                $response['message'] = 'Gagal membuat statement SQL untuk pembaruan: ' . $conn->error;
                            }
                        } else {
                            // Data belum ada, lakukan INSERT
                            // Perhitungan hasilMasuk
                            $hasilMasuk = DataKeteranganMasuk($jamstr, $jam0, $jam1,  $jam2,  $jam3,  $jam4,  $jami1,  $jam5,  $jam6, $jam7,  $jami2, $jam8, $jam9,  $jam10,  $jamTU);
                            $hasilKeluar = DataKeteranganKeluar($jamstr, $jam1,  $jam2,  $jam3,  $jam4,  $jami1,  $jam5,  $jam6, $jam7,  $jami2, $jam8, $jam9,  $jam10,  $jamTU);
        
                            $insertQuery = "INSERT INTO data_absensi (tanggal, nip, nama, jammasuk, keteranganmasuk) VALUES (?, ?, ?, ?, ?)";
                            $insertStmt = $conn->prepare($insertQuery);
        
                            if ($insertStmt) {
                                // Bind parameter
                                $insertStmt->bind_param("sssss", $tanggal, $nip, $nama, $jam, $hasilMasuk);
                                if ($insertStmt->execute()) {
                                    $response['status'] = 'sukses';
                                    $response['message'] = 'Data guru berhasil ditambahkan.';
                                } else {
                                    $response['status'] = 'error';
                                    $response['message'] = 'Gagal menambahkan data guru ke database: ' . $insertStmt->error;
                                }
                                $insertStmt->close();
                            } else {
                                $response['status'] = 'error';
                                $response['message'] = 'Gagal membuat statement SQL untuk penambahan data: ' . $conn->error;
                            }
                        }
                        $checkStmt->close();
                } else {
                    $response['status'] = 'error';
                    $response['message'] = 'Gagal membuat statement SQL untuk pengecekan data: ' . $conn->error;
                }
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Anda tidak dapat absen lebih dari satu kali dalam waktu 5 menit.';
            }
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Metode permintaan tidak valid.';
    }
} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = 'Terjadi kesalahan: ' . $e->getMessage();
}

// Mengubah respons menjadi objek JSON tunggal
echo json_encode($response);
// Tutup koneksi database
$conn->close();
?>
