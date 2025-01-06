<?php
session_start();

// Check if the user is not logged in, redirect to the login page
if (!isset($_SESSION['user'])) {
    header("Location: ../index.php"); // Sesuaikan URL ke halaman login Anda
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Database Guru</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="../CSS/style.css">
</head>
<body>
    <?php
        require_once('../PHP/navbar.php');
        echo navbar("Database Guru");
    ?>
            <br>
            <p class="text-center">Klik Tombol Edit Untuk Merubah Data Guru</p>
            <p class="text-center">*Catatan, Nama Guru Tidak Dapat Di Edit</p>
            <div class="text-center d-flex justify-content-center">
                <button id="addTeacherButton" class="btn btn-primary btn-sm" style="margin-right: 10px;">Tambah Guru</button>
                <button id="editButton" class="btn btn-primary btn-sm">Edit</button>
            </div>
            <div id="addTeacherModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <form id="addTeacherForm" method="POST" action="../Query/queryTambahDBGuru.php">
                <label for="nama">Nama:</label>
                <input type="text" id="nama" name="nama" required>
                <br>
                <label for="nip">NIP:</label>
                <input type="text" id="nip" name="nip" required>
                <br>
                <label for="golongan">Golongan:</label>
                <input type="text" id="golongan" name="golongan" required>
                <br>
                <label for="mapel">Mapel:</label>
                <input type="text" id="mapel" name="mapel" required>
                <br>
                <button type="submit" id="submitButton">Tambah</button>
                </form>
            </div>
            </div>
            <div class="container mt-3">
                <!-- Tabel Pertama -->
                <div class="table-responsive" id="jam-masuk-table">
                    <br>
                    <!-- Tabel akan ditampilkan di sini oleh script jstabel.js-->
                </div>
            </div>
        </div>
    </div>

    <?php
        require_once('../PHP/footer.php');
    ?>
</body>
    <script src="../Javascript/jsTabelDBGuru.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha384-Rx+T1VzGupg4BHQYs2gCW9It+akI2MM/mndMCy36UVfodzcJcF0GGLxZIzObiEfa" crossorigin="anonymous"></script>
    <script>
    // Get the modal and button elements
    var modal = document.getElementById("addTeacherModal");
    var btn = document.getElementById("addTeacherButton");
    var submitButton = document.getElementById("submitButton");
    var span = document.getElementsByClassName("close")[0];

    // When the button is clicked, display the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the close button or anywhere outside the modal is clicked, close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // When the submit button is clicked, close the modal
    submitButton.onclick = function() {
        modal.style.display = "none";
    }
</script>
    </html>