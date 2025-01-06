<?php
// Sambungkan ke database
require "../Koneksi/koneksi.php";

// Mengirim respons JSON
header('Content-Type: application/json');
// Terima data dari JavaScript
$data = json_decode(file_get_contents("php://input"));

// Data yang diterima
$columnName = $data->columnName; // Nama kolom yang akan diubah
$newValue = $data->newValue; // Nilai baru
$namaGuru = $data->namaGuru; // Nama guru dari kolom "Nama"

// Persiapkan query untuk mengupdate data berdasarkan nama guru
$updateQuery = "UPDATE data_guru SET $columnName = ? WHERE nama = ?";

// Persiapkan statement
if ($updateStmt = $conn->prepare($updateQuery)) {
  // Bind parameter
  $updateStmt->bind_param("ss", $newValue, $namaGuru);

  // Eksekusi statement
  if ($updateStmt->execute()) {
    // Cek hasil eksekusi
    if ($updateStmt->affected_rows > 0) {
      $response = ["status" => "sukses", "pesan" => "Data berhasil diperbarui"];
    } else {
      $response = ["status" => "gagal", "pesan" => "Gagal megupdate data"];
    }
  } else {
    $response = ["status" => "gagal", "pesan" => "Gagal mengeksekusi statement"];
  }
}

// Tutup koneksi ke database jika perlu
$conn->close();
echo json_encode($response);
?>
