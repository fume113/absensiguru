<?php
// Sambungkan ke database
require "../Koneksi/koneksi.php";

// Terima data dari JavaScript
$data = json_decode(file_get_contents("php://input"));

// Data yang diterima
$namaGuru = $data->nama; // Nama guru untuk dihapus

// Persiapkan query untuk menghapus data guru berdasarkan nama guru
$deleteQuery = "DELETE FROM data_guru WHERE nama = ?";

// Persiapkan statement
if ($deleteStmt = $conn->prepare($deleteQuery)) {
  // Bind parameter
  $deleteStmt->bind_param("s", $namaGuru);

  // Eksekusi statement
  if ($deleteStmt->execute()) {
    // Cek hasil eksekusi
    if ($deleteStmt->affected_rows > 0) {
      echo json_encode(["status" => "sukses", "pesan" => "Data guru berhasil dihapus"]);
    } else {
      echo json_encode(["status" => "gagal", "pesan" => "Gagal menghapus data guru"]);
    }
  } else {
    echo json_encode(["status" => "gagal", "pesan" => "Gagal mengeksekusi statement"]);
  }

  // Tutup statement
  $deleteStmt->close();
} else {
  echo json_encode(["status" => "gagal", "pesan" => "Gagal mempersiapkan statement untuk hapus"]);
}

// Tutup koneksi ke database jika perlu
$conn->close();
?>
