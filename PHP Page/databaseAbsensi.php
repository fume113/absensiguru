<?php
session_start();

// Check if the user is not logged in, redirect to the login page
if (!isset($_SESSION['user'])) {
    header("Location: ../index.php"); // Sesuaikan URL ke halaman login Anda
    exit();
}
$judul = "Database Absensi";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Database Absensi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="../font/Gilgan.otf">
    <link rel="stylesheet" type="text/css" href="../CSS/style.css">
</head>
<body>
    <?php
        require_once('../PHP/navbar.php');
        echo navbar("Database Absensi");
    ?>

<div class="container mt-3">
    <div class="row">
        <div class="col-md-12">
            <!-- Tombol Kalender (biru) -->
            <button class="btn btn-primary" onclick="location.href='kalenderAbsen.php'">Kalender</button>
            <!-- Tombol Database Guru (kuning) -->
            <button class="btn btn-warning" onclick="location.href='databaseGuru.php'">Database Guru</button>
            <!-- Tombol Ganti Jam (Oranye) -->
            <button class="btn btn-info" onclick="location.href='jamAbsen.php'">Jam Absensi</button>
            <!-- Tombol Download PDF (Hijau) -->
            <button class="btn btn-success" onclick="downloadExcel()">Download Excel</button>
            <!-- Tombol Download PDF (Merah) -->
            <button class="btn btn-danger" onclick="downloadPDF()">Download PDF</button>
        </div>
    </div>
</div>

<div class="container mt-3">
    <div>
        <h1 id="tanggal-heading">Placeholder Tanggal</h1>
    </div>
    <div class="row">
        <!-- Tabel Pertama -->
        <div>
            <div class="table-responsive" id="absensi-table">
                <!-- Tabel akan ditampilkan di sini oleh script jsTabelAbsensi.js -->
            </div>
        </div>
        <h1 id="tanggal-heading">Guru Yang Belum Absen</h1>
        <!-- Tabel Kedua -->            
            <div class="col-md-12">
                <div class="table-responsive" id="second-table">
                    <!-- Tabel kedua akan ditampilkan di sini oleh script tertentu -->
                </div>
            </div>
    </div>
    <p id="demo"></p>
</div>


<?php
        require_once('../PHP/footer.php');
    ?>
</body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js"></script>
<script src="../Javascript/popup.js"></script>
<script src="../Javascript/jsTabelAbsensi.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script>
    function closeBrowser() {
        window.close(); // This will close the current browser window or tab.
    }
</script>
</html>
