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
    <title>Jam Absensi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="../font/Gilgan.otf">
    <link rel="stylesheet" type="text/css" href="../CSS/style.css">
</head>
<body>
<?php
    require_once('../PHP/navbar.php');
    echo navbar("Database Absensi");
?>



<div class="container">
    <h1>Data Jam Absensi</h1>
    <select id="hariSelect">
        <option value="senin">Senin</option>
        <option value="selasa">Selasa</option>
        <option value="rabu">Rabu</option>
        <option value="kamis">Kamis</option>
        <option value="jumat">Jumat</option>
        <option value="sabtu">Sabtu</option>
    </select>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Jam-Ke</th>
                    <th>Jam "Jam:Menit:Detik"</th>
                </tr>
            </thead>
            <tbody id="dataAbsensi">
                <!-- Data akan ditambahkan secara dinamis di sini -->
            </tbody>
        </table>
    </div>
</div>


<?php
    require_once('../PHP/footer.php');
?>
</body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js"></script>
<script src="../Javascript/popup.js"></script>
<script src="../Javascript/jsJamAbsensi.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script>
    function closeBrowser() {
        window.close(); // This will close the current browser window or tab.
    }
</script>
</html>
