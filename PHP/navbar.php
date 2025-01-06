<?php
// Function to get the current page filename
function getCurrentPageFilename() {
    return basename($_SERVER['PHP_SELF']);
}

// Function to generate the navigation bar
function navbar($nama) {
    $currentPage = getCurrentPageFilename();
    
    echo '
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container">
                <img src="../Image/logo.png" alt="SMPN 1 Lembang" width="87" height="100" class="img-fluid">
                <span class="navbar-text ml-2 d-lg-inline-flex">
                    <span class="school-name text-white">SMPN 1 Lembang</span>
                    <span class="d-none d-lg-inline-flex text-white">'.$nama.'</span>
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
                <ul class="navbar-nav">';
                
                // Show the "Kembali" button on all pages except databaseAbsensi.php
                if ($currentPage !== 'databaseAbsensi.php') {
                    echo '
                    <li class="nav-item">
                        <a href="javascript:history.back()">
                            <button class="btn btn-secondary ml-2">Kembali</button>
                        </a>
                    </li>';
                }
                
                echo '
                <li class="nav-item">
                    <form method="post" action="../PHP/prosesLogout.php" class="logout-form">
                        <button type="submit" class="btn btn-danger">Logout</button>
                    </form>
                </li>
                </ul>
            </div>
        </div>
    </nav>
    ';
}
?>
