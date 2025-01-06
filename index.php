<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Absensi Guru</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="CSS/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container">
                <img src="./Image/logo.png" alt="SMPN 1 Lembang" width="87" height="100" class="img-fluid">
                <span class="navbar-text ml-2 d-lg-inline-flex">
                    <span class="school-name text-white">SMPN 1 Lembang</span>
                    <span class="d-none d-lg-inline-flex text-white">Absensi Guru</span>
                </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <!-- Navbar links and other content here -->
                </ul>
            </div>
            <!-- Align the buttons to the right -->
            <div class="ml-auto">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <button class="btn btn-success ml-2" onclick="openForm()">Login</button>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-secondary" id="keluarButton">Keluar</button>
                    </li>
                </ul>
            </div>
            <div class="form-popup" id="myForm">
                <form action="../absensiguru/PHP/prosesLogin.php" class="form-container" method="POST">
                    <label for="user"><b>Username</b></label>
                    <input type="text" placeholder="Masukkan Username" name="user" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Masukkan Password" name="psw" required>

                    <button type="submit" class="btn">Login</button>
                    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
                </form>
            </div>
        </div>
    </nav>

    <div class="container mt-3">
        <div class="row">
            <!-- Input Text -->
            <div class="mt-3">
                <input type="text" class="form-control-sm form-control" placeholder="Scan QR Code Anda" id="searchInput">
                <br>
            </div>
            <!-- Tabel Pertama -->
            <div class="table-responsive" id="absensi-table">
                <!-- Tabel akan ditampilkan di sini oleh script jstabel.js-->
            </div>
        </div>
    </div>
<footer class="bg-light text-center text-lg-start">
    <!-- Copyright -->
    <div class="footer text-center p-3">
        © 2023 Copyright:
        <span class="text-dark">SMPN 1 Lembang</span>
    </div>
  <!-- Copyright -->
</footer>

    <script src="Javascript/popup.js"></script>
    <script src="Javascript/jstabel.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
    <script>
        function closeBrowser() {
            window.close(); // This will close the current browser window or tab.
        }

        // Add a click event listener to the "Keluar" button
        document.getElementById("keluarButton").addEventListener("click", closeBrowser);
    </script>
</body>
</html>