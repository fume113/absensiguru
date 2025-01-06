//
// Fungsi untuk menambahkan data guru ke database
function addTeacherToDatabase(nama, nip, golongan, mapel) {
  // Buat URL untuk permintaan POST
  var url = `../Query/queryTambahDBGuru.php`;

  // Buat objek data yang akan dikirim dalam format JSON
  var dataToSend = {
    nama: nama,
    nip: nip,
    golongan: golongan,
    mapel: mapel,
  };

  // Buat instance XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Atur metode dan URL untuk permintaan POST
  xhr.open("POST", url, true);

  // Atur header untuk mengirim data JSON
  xhr.setRequestHeader("Content-Type", "application/json");

  // Atur event handler untuk menangani respons dari server
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        if (data.status === "sukses") {
          // Reset formulir setelah data berhasil ditambahkan
          document.getElementById("nama").value = "";
          document.getElementById("nip").value = "";
          document.getElementById("golongan").value = "";
          document.getElementById("mapel").value = "";
          // Setelah menambahkan data, Anda bisa memuat ulang data guru
          fetchDataFromDatabase();
          Swal.fire({
            icon: "success",
            title: "Data Guru Sudah Ditambahkan",
            text: "Data sudah terupdate ke Database.",
            timer: 3000,
            showConfirmButton: false,
            customClass: {
              popup: "colored-toast",
            },
            background: "#a5dc86",
            timerProgressBar: true, // Menampilkan progress bar timer
            onOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer); // Berhenti timer saat mouse hover
              toast.addEventListener("mouseleave", Swal.resumeTimer); // Lanjutkan timer saat mouse leave
            },
          });
        } else {
          console.error("Gagal menambahkan data guru ke database:", data.pesan);
          // POP UP Sweetalert
          if (data.status === "blocked" || data.pesan === "Nama dan NIP guru sudah terdaftar") {
            Swal.fire({
              icon: "info",
              title: "Tidak Bisa Menambah Data Guru Yang Sudah Terdaftar",
              text: "Nama Guru Sudah Ada di Database.",
              timer: 3000,
              showConfirmButton: false,
              customClass: {
                popup: "colored-toast",
              },
              background: "#a5dc86",
              timerProgressBar: true, // Menampilkan progress bar timer
              onOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer); // Berhenti timer saat mouse hover
                toast.addEventListener("mouseleave", Swal.resumeTimer); // Lanjutkan timer saat mouse leave
              },
            });
          }
        }
      } catch (e) {
        console.error("Tidak dapat mem-parsing respons sebagai JSON:", e);
      }
    } else {
      console.error("Terjadi kesalahan saat menambahkan data ke database. Status kode:", xhr.status);
    }
  };

  // Atur event handler untuk menangani kesalahan
  xhr.onerror = function () {
    console.error("Terjadi kesalahan saat menambahkan data ke database.");
  };

  // Kirim data dalam format JSON ke server
  xhr.send(JSON.stringify(dataToSend));
}

// Event listener untuk menangani pengiriman formulir
document.getElementById("addTeacherForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah pengiriman formulir

  // Dapatkan nilai dari input formulir
  var nama = document.getElementById("nama").value;
  var nip = document.getElementById("nip").value;
  var golongan = document.getElementById("golongan").value;
  var mapel = document.getElementById("mapel").value;

  // Panggil fungsi untuk menambahkan data guru ke database
  addTeacherToDatabase(nama, nip, golongan, mapel);
});

//
// FUNCTION PEMBUATAN TABEL
// Fungsi untuk membuat tabel dinamis dengan kolom "Jam Masuk"
//

function createJamMasukTable(users) {
  // Cari elemen tabel yang ada (jika ada) dan hapus
  var existingTable = document.querySelector(".table.table-bordered");
  if (existingTable) {
    existingTable.parentNode.removeChild(existingTable);
  }

  var table = document.createElement("table");
  table.className = "table table-bordered";

  // Buat header tabel
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["No", "Nama", "NIP", "Golongan", "Mapel", "Action"];

  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.textContent = headers[i];
    th.style.textAlign = "center"; // Centered header
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Buat isi tabel
  var tbody = document.createElement("tbody");
  var counter = 1;

  // Inisialisasi array untuk baris dengan "Kepala Sekolah"
  var kepalaSekolahRow = null;

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var row = document.createElement("tr");

    var tdNo = document.createElement("td");
    tdNo.textContent = counter++; // Menggunakan counter sebagai auto increment
    tdNo.style.textAlign = "center"; // Centered content
    row.appendChild(tdNo);

    var tdNama = document.createElement("td");
    tdNama.textContent = user.nama;
    row.appendChild(tdNama);

    var tdNIP = document.createElement("td");
    tdNIP.textContent = user.nip;
    tdNIP.style.textAlign = "center";
    tdNIP.contentEditable = "false"; // Ubah ke "false" agar tidak dapat diedit
    row.appendChild(tdNIP);

    var tdGolongan = document.createElement("td");
    tdGolongan.textContent = user.golongan;
    tdGolongan.style.textAlign = "center";
    tdGolongan.contentEditable = "false"; // Ubah ke "false" agar tidak dapat diedit
    row.appendChild(tdGolongan);

    var tdMapel = document.createElement("td");
    tdMapel.textContent = user.mata_pelajaran;
    tdMapel.style.textAlign = "center";
    tdMapel.contentEditable = "false"; // Ubah ke "false" agar tidak dapat diedit
    row.appendChild(tdMapel);

    var tdAction = document.createElement("td");
    tdAction.className = "text-center"; // Mengatur tata letak kolom ke tengah

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn btn-info btn-sm";
    editButton.addEventListener("click", function () {
      handleEditButtonClick(this); // Mengirim tombol edit sebagai argumen
    });

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.addEventListener("click", function () {
      handleDeleteButtonClick(this); // Mengirim tombol delete sebagai argumen
    });

    tdAction.appendChild(editButton);
    tdAction.appendChild(deleteButton);
    row.appendChild(tdAction);

    // Menambahkan data id_guru sebagai atribut data-id pada baris
    row.setAttribute("data-id", user.id_guru);

    // Memeriksa apakah nilai "Mapel" adalah "Kepala Sekolah" (case insensitive)
    if (user.mata_pelajaran.toLowerCase() === "kepala sekolah") {
      kepalaSekolahRow = row; // Simpan baris "Kepala Sekolah"
    } else {
      tbody.appendChild(row); // Tambahkan baris ke tbody
    }

    // Menambahkan event listener "blur" ke sel yang dapat diedit
    tdNIP.addEventListener("blur", function (event) {
      handleCellEdit(event, "NIP");
    });
    tdGolongan.addEventListener("blur", function (event) {
      handleCellEdit(event, "Golongan");
    });
    tdMapel.addEventListener("blur", function (event) {
      handleCellEdit(event, "Mapel");
    });
  }

  // Masukkan baris "Kepala Sekolah" ke nomor 1 jika ditemukan
  if (kepalaSekolahRow) {
    tbody.insertBefore(kepalaSekolahRow, tbody.childNodes[0]);
  }

  // Perbarui nomor kolom "No" setelah mengurutkannya kembali
  var rows = tbody.querySelectorAll("tr");
  for (var i = 0; i < rows.length; i++) {
    rows[i].querySelector("td:first-child").textContent = i + 1;
  }

  table.appendChild(tbody);

  return table;
}

//
// FUNCTION FETCHING DATA DARI DATABASE
// Fungsi untuk mengambil data dari database
//

function handleDeleteButtonClick(deleteButton) {
  var table = document.querySelector(".table.table-bordered");
  var rows = table.querySelectorAll("tbody tr");
  var guruDitemukan = false;
  var namaGuru = "";

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var namaCell = row.querySelector("td:nth-child(2)"); // Kolom kedua berisi nama

    if (deleteButton.closest("tr") === row) {
      // Tombol delete yang diklik berada di baris yang sama dengan nama guru
      guruDitemukan = true;
      namaGuru = namaCell.textContent.trim(); // Ambil nilai dari namaCell
      console.log(namaGuru);
      break; // Hentikan pencarian setelah menemukan cocok
    }
  }

  if (guruDitemukan) {
    // Tampilkan konfirmasi SweetAlert sebelum menghapus
    Swal.fire({
      title: "Anda yakin ingin menghapus guru ini?",
      text: "Data guru akan dihapus dari database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengonfirmasi penghapusan
        sendDeleteRequestToServer(namaGuru); // Panggil fungsi untuk menghapus data dari database
      }
    });
  }
}

function fetchDataFromDatabase() {
  // Menggunakan fetch API untuk mengambil data dari PHP server-side
  fetch("../Query/queryTabelDataGuru.php") // Sesuaikan dengan nama file PHP Anda
    .then((response) => response.json())
    .then((data) => {
      // Panggil fungsi untuk membuat tabel dinamis dengan kolom "Jam Masuk"
      var jamMasukTable = createJamMasukTable(data);

      // Tampilkan tabel "Jam Masuk" di dalam div dengan id "jam-masuk-table"
      var jamMasukTableContainer = document.getElementById("jam-masuk-table");
      jamMasukTableContainer.appendChild(jamMasukTable);

      // Tambahkan event listener untuk menyimpan perubahan ke server ketika sel tabel diubah
      jamMasukTable.addEventListener("blur", function (event) {
        var target = event.target;
        var columnName = target.parentNode.parentNode.rows[0].cells[target.cellIndex].textContent;
        var newValue = target.textContent;

        // Menemukan id_guru dari atribut data-id pada baris
        var id_guru = target.parentNode.getAttribute("data-id");

        // Mengganti nilai columnName sesuai dengan kondisi yang Anda tentukan
        if (columnName === "Nama") {
          columnName = "nama";
        } else if (columnName === "NIP") {
          columnName = "nip";
        } else if (columnName === "Golongan") {
          columnName = "golongan";
        } else if (columnName === "Mapel") {
          columnName = "mata_pelajaran";
        }

        // Kirim data yang telah diubah ke server untuk disimpan
        sendDataToServer(id_guru, columnName, newValue);
      });
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
}

// Tombol Edit Access
var isEditMode = false;
document.getElementById("editButton").addEventListener("click", function () {
  isEditMode = !isEditMode; // Mengganti status mode pengeditan (aktif/non-aktif)

  var editButton = document.getElementById("editButton");

  if (isEditMode) {
    editButton.textContent = "Selesai"; // Mengganti teks tombol menjadi "Selesai"

    // Mengaktifkan pengeditan pada kolom-kolom yang sesuai
    var cells = document.querySelectorAll("td[contenteditable]");
    cells.forEach(function (cell) {
      cell.contentEditable = true; // Ubah ke "true" agar dapat diedit

      // Tambahkan efek visual (warna latar belakang hijau)
      cell.style.backgroundColor = "#d4edda"; // Warna latar belakang hijau

      // Tambahkan event listener "blur" untuk mengembalikan warna latar belakang ke transparan setelah pengguna selesai mengedit
      cell.addEventListener("blur", function () {
        cell.style.backgroundColor = "transparent"; // Kembalikan latar belakang ke semula
      });
    });
  } else {
    editButton.textContent = "Edit"; // Mengganti teks tombol menjadi "Edit"

    // Menonaktifkan pengeditan pada kolom-kolom yang sesuai
    var cells = document.querySelectorAll("td[contenteditable]");
    cells.forEach(function (cell) {
      cell.contentEditable = false; // Ubah ke "false" agar tidak dapat diedit
      cell.style.backgroundColor = "transparent"; // Kembalikan latar belakang ke semula
    });
  }
});

// Fungsi untuk menangani perubahan sel dan mengirim perubahan ke server
function handleCellEdit(event, columnName) {
  var target = event.target;
  var newValue = target.textContent.trim();
  var namaGuru = target.parentNode.cells[1].textContent; // Ambil nama guru dari kolom "Nama"

  console.log("Editing cell:", columnName);

  if (namaGuru.trim() !== "") {
    console.log("Nilai namaGuru:", namaGuru);
  } else {
    console.log("Nilai namaGuru kosong atau tidak valid");
    return; // Jika nama guru kosong, hentikan pengiriman data
  }

  // Kirim data yang telah diubah ke server untuk disimpan
  sendDataToServer(namaGuru, columnName, newValue);
}

// ...

// Fungsi untuk mengirim data ke server untuk disimpan
function sendDataToServer(namaGuru, columnName, newValue) {
  // Map nama kolom yang diedit ke nama kolom yang sesuai di database
  var columnMapping = {
    Nama: "nama",
    NIP: "nip",
    Golongan: "golongan",
    Mapel: "mata_pelajaran",
  };

  // Cek apakah kolom yang diedit valid
  if (columnMapping[columnName]) {
    // Kolom valid, dapatkan nama kolom yang sesuai di database
    var dbColumnName = columnMapping[columnName];

    // Buat objek data yang akan dikirim ke server
    var dataToSend = {
      namaGuru: namaGuru, // Menggunakan nama guru sebagai patokan
      columnName: dbColumnName, // Menggunakan nama kolom di database
      newValue: newValue,
    };

    // Kirim data menggunakan fetch API atau AJAX ke server-side script PHP Anda
    fetch("../Query/queryUpdateDBGuru.php", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data berhasil disimpan:", data);

        if (data.status === "sukses") {
          // Jika data berhasil dihapus, panggil fungsi untuk memuat ulang data guru
          fetchDataFromDatabase();

          // Setelah itu, ubah tombol "Selesai" menjadi "Edit"
          document.getElementById("editButton").textContent = "Edit";

          // Setel status isEditMode kembali ke false
          isEditMode = false;

          // Kemudian, tampilkan popup SweetAlert
          Swal.fire({
            icon: "success",
            title: "Data Guru Berhasil Dirubah",
            text: "Data sudah terupdate ke Database.",
            timer: 3000,
            showConfirmButton: false,
            customClass: {
              popup: "colored-toast",
            },
            background: "#a5dc86",
            timerProgressBar: true, // Menampilkan progress bar timer
            onOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer); // Berhenti timer saat mouse hover
              toast.addEventListener("mouseleave", Swal.resumeTimer); // Lanjutkan timer saat mouse leave
            },
          });
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menyimpan data:", error);
        console.log("Respons dari server:", data);
      });
  } else {
    console.error("Kolom yang diedit tidak valid:", columnName);
  }
}

//
//
// Function BUTTON DELETE
//

function handleEditButtonClick(editButton) {
  var row = editButton.closest("tr"); // Temukan baris terdekat yang mengandung tombol "Edit"
  var cells = row.querySelectorAll("td[contenteditable]");

  if (isEditMode) {
    // Jika sedang dalam mode pengeditan
    cells.forEach(function (cell) {
      cell.contentEditable = false; // Nonaktifkan pengeditan sel
      cell.style.backgroundColor = "transparent"; // Kembalikan latar belakang ke semula
    });
    isEditMode = false;
    editButton.textContent = "Edit";
  } else {
    // Jika tidak dalam mode pengeditan
    cells.forEach(function (cell) {
      cell.contentEditable = true; // Aktifkan pengeditan sel
      cell.style.backgroundColor = "#d4edda"; // Warna latar belakang hijau
    });
    isEditMode = true;
    editButton.textContent = "Selesai";
  }
}

// Fungsi untuk mengirim permintaan penghapusan guru ke server
function sendDeleteRequestToServer(namaGuru) {
  // Buat objek data yang akan dikirim ke server
  var dataToDelete = {
    nama: namaGuru,
  };

  // Kirim permintaan penghapusan menggunakan fetch API atau AJAX ke server-side script PHP Anda
  fetch("../Query/queryHapusDBGuru.php", {
    method: "POST", // Metode POST
    body: JSON.stringify(dataToDelete),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "sukses") {
        console.log("Data guru dengan Nama " + namaGuru + " berhasil dihapus:", data);

        // Jika data berhasil dihapus, panggil fungsi untuk memuat ulang data guru
        fetchDataFromDatabase();
        Swal.fire({
          icon: "success",
          title: "Data Guru Sudah Terhapus",
          text: "Data sudah terupdate ke Database.",
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: "colored-toast",
          },
          background: "#a5dc86",
          timerProgressBar: true, // Menampilkan progress bar timer
          onOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer); // Berhenti timer saat mouse hover
            toast.addEventListener("mouseleave", Swal.resumeTimer); // Lanjutkan timer saat mouse leave
          },
        });
      } else {
        console.error("Gagal menghapus guru dengan Nama " + namaGuru + ": " + data.pesan);
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat menghapus data guru:", error);
    });
}

// FUNCTION UNTUK MENGAMBIL DATA FETCH LALU DIBUAT TABEL
// Panggil fungsi untuk mengambil data dari database dan membuat tabel
//

fetchDataFromDatabase();
