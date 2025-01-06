//
// FUNCTION PEMBUATAN TABEL
// Fungsi untuk membuat tabel dinamis dengan kolom "Jam Masuk" dan "Jam Keluar"
//

function createAbsensiTable(users) {
  // Hapus tabel lama sebelum menambahkan tabel baru
  var existingTable = document.querySelector(".table.table-bordered");
  if (existingTable) {
    existingTable.parentNode.removeChild(existingTable);
  }
  var table = document.createElement("table");
  table.className = "table table-bordered";

  // Buat header tabel
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["No", "Nama", "NIP", "Jam Masuk", "Keterangan Masuk", "Jam Keluar", "Keterangan Keluar"];

  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.textContent = headers[i];
    th.classList.add("text-center"); // Menambahkan kelas "text-center" dari Bootstrap untuk semua judul kolom
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Buat isi tabel
  var tbody = document.createElement("tbody");

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var row = document.createElement("tr");

    var th = document.createElement("th");
    th.textContent = i + 1; // Nomor otomatis (auto increment)
    th.classList.add("text-center"); // Menambahkan kelas "text-center" dari Bootstrap untuk kolom "No"
    row.appendChild(th);

    var tdNama = document.createElement("td");
    tdNama.textContent = user.nama;
    row.appendChild(tdNama);

    var tdNIP = document.createElement("td");
    tdNIP.textContent = user.nip;
    row.appendChild(tdNIP);

    var tdJamMasuk = document.createElement("td");
    var tdKeteranganMasuk = document.createElement("td");
    if (user.jammasuk !== null && user.jammasuk !== undefined) {
      tdJamMasuk.textContent = user.jammasuk;
      tdKeteranganMasuk.textContent = user.keteranganmasuk;
    } else {
      tdJamMasuk.textContent = "-";
      tdKeteranganMasuk.textContent = "-";
    }
    row.appendChild(tdJamMasuk);
    row.appendChild(tdKeteranganMasuk);

    var tdJamKeluar = document.createElement("td");
    var tdKeteranganKeluar = document.createElement("td");
    if (user.jamkeluar !== null && user.jamkeluar !== undefined) {
      tdJamKeluar.textContent = user.jamkeluar;
      tdKeteranganKeluar.textContent = user.keterangankeluar;
    } else {
      tdJamKeluar.textContent = "-";
      tdKeteranganKeluar.textContent = "-";
    }
    row.appendChild(tdJamKeluar);
    row.appendChild(tdKeteranganKeluar);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  return table;
}

//
// FUNCTION FETCHING DATA DARI DATABASE
// Fungsi untuk mengambil data dari database
//

function fetchDataFromDatabase() {
  // Menggunakan fetch API untuk mengambil data dari PHP server-side
  fetch("./Query/querytabel.php") // Sesuaikan dengan nama file PHP Anda
    .then((response) => response.json())
    .then((data) => {
      // Panggil fungsi untuk membuat tabel dinamis dengan kolom "Jam Masuk" dan "Jam Keluar"
      var absensiTable = createAbsensiTable(data);

      // Tampilkan tabel "Jam Masuk" dan "Jam Keluar" di dalam div dengan id "absensi-table"
      var absensiTableContainer = document.getElementById("absensi-table");
      absensiTableContainer.appendChild(absensiTable);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
}

// Panggil fungsi untuk mengambil data dari database dan membuat tabel
fetchDataFromDatabase();

// Fokuskan input dengan id "searchInput" saat halaman dimuat
window.addEventListener("load", function () {
  document.getElementById("searchInput").focus();
});

//
// FUNCTION UNTUK MENCARI NIP
// Menambahkan event listener ke elemen input
//

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.trim(); // Mendapatkan teks input yang telah di-trim

  // Jika panjang teks input lebih dari 0, kirim permintaan untuk mencari data ke server
  if (searchText.length > 0) {
    searchDatabase(searchText);
  }
});

function clearSearchInput() {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = ""; // Mengosongkan nilai input
}

// Fungsi untuk mengirim permintaan pencarian ke server
function searchDatabase(searchText) {
  // Data yang akan dikirim dalam permintaan POST
  const requestData = {
    search: searchText,
  };

  // Menggunakan fetch API untuk mengirim permintaan POST ke server
  fetch("./Query/querySearch.php", {
    method: "POST", // Metode POST
    headers: {
      "Content-Type": "application/json", // Atur tipe konten yang sesuai
    },
    body: JSON.stringify(requestData), // Mengirim data dalam bentuk JSON
  })
    .then((response) => response.json())
    .then((data) => {
      // Pastikan data adalah objek JSON tunggal, bukan array objek JSON
      const resultData = Array.isArray(data) ? data[0] : data;

      // Panggil fungsi untuk memperbarui tampilan dengan data yang ditemukan
      insertData(resultData);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
}

// Fungsi untuk memperbarui tampilan dengan data yang ditemukan
function insertData(data) {
  if (data && typeof data === "object" && Object.keys(data).length > 0) {
    const today = getToday(); // Panggil fungsi getToday untuk mendapatkan hari saat ini
    // Menggunakan fetch API untuk mengirim data yang ditemukan ke server untuk INSERT
    fetch("./Query/queryInsert.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, today }), // Sertakan today di dalam objek data
    })
      .then((response) => response.json()) // Ubah respons ke JSON
      .then((result) => {
        console.log("Respons dari server:", result); // Tampilkan respons untuk debug
        if (result.status === "sukses") {
          // Jika pembaruan berhasil, Anda dapat memperbarui tampilan sesuai kebutuhan.
          const guruName = data.nama; // Ambil nama guru dari data
          const successMessage = `${guruName}`; // Pesan yang akan ditampilkan

          console.log("Pembaruan berhasil:", successMessage);

          clearSearchInput();
          fetchDataFromDatabase();
          Swal.fire({
            icon: "success",
            title: successMessage,
            text: "Terimakasih Sudah Mengabsen",
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: "colored-toast",
            },
            background: "#a5dc86",
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        } else if (result.status === "warning" || result.message === "Guru Sudah Absen") {
          // Jika respons adalah "Belum Waktunya Absen," tampilkan pesan pop-up menggunakan SweetAlert2.
          clearSearchInput();
          fetchDataFromDatabase();
          Swal.fire({
            icon: "warning", // Setel ikon menjadi error
            title: "Anda Sudah Absen",
            text: "Anda tidak dapat melakukan absen dua kali.",
            timer: 3000, // Otomatis menutup pop-up setelah 1 detik (1000 milidetik)
            showConfirmButton: false, // Sembunyikan tombol "OK"
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
        } else if (result.status === "aware" && result.message === "Belum Waktunya Absen") {
          // Jika respons adalah "Belum Waktunya Absen," tampilkan pesan pop-up menggunakan SweetAlert2.
          clearSearchInput();
          fetchDataFromDatabase();
          Swal.fire({
            icon: "error", // Setel ikon menjadi error
            title: "Belum Waktunya Absen",
            text: "Anda tidak dapat melakukan absen pada saat ini.",
            timer: 3000, // Otomatis menutup pop-up setelah 1 detik (1000 milidetik)
            showConfirmButton: false, // Sembunyikan tombol "OK"
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
        } else if (result.status === "error" && result.message === "Anda tidak dapat absen lebih dari satu kali dalam waktu 5 menit.") {
          // Jika respons adalah "Belum Waktunya Absen," tampilkan pesan pop-up menggunakan SweetAlert2.
          clearSearchInput();
          fetchDataFromDatabase();
          Swal.fire({
            icon: "error", // Setel ikon menjadi error
            title: "Anda Baru Saja Absen",
            text: "Anda tidak dapat melakukan absen pada saat ini.",
            timer: 3000, // Otomatis menutup pop-up setelah 1 detik (1000 milidetik)
            showConfirmButton: false, // Sembunyikan tombol "OK"
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
        } else if (result.status === "aware" && result.message === "Debugging") {
          // Jika respons adalah "Belum Waktunya Absen," tampilkan pesan pop-up menggunakan SweetAlert2.
          clearSearchInput();
          fetchDataFromDatabase();
          Swal.fire({
            icon: "error", // Setel ikon menjadi error
            title: "Debugging",
            text: "Hanya Developer Yang Boleh Mendebug.",
            timer: 3000, // Otomatis menutup pop-up setelah 1 detik (1000 milidetik)
            showConfirmButton: false, // Sembunyikan tombol "OK"
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
          console.error("Gagal melakukan pembaruan:", result);
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat melakukan INSERT:", error);
      });
  } else {
    console.log("Data yang akan dikirim tidak valid atau kosong."); // Menampilkan pesan jika data tidak valid
  }
}

// Function Exit mode Fullscreen
document.getElementById("keluarButton").addEventListener("click", function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    // Untuk kompatibilitas dengan browser Safari
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // Untuk kompatibilitas dengan browser Firefox
    document.mozCancelFullScreen();
  }
});

//
function getToday() {
  const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
  const today = new Date().getDay(); // Mendapatkan indeks hari saat ini (0 untuk minggu, 1 untuk senin, dst.)
  return days[today]; // Mengembalikan hari dalam format yang Anda inginkan
}

//
// FUNCTION UNTUK MENGAMBIL DATA FETCH LALU DIBUAT TABEL
// Panggil fungsi untuk mengambil data dari database dan membuat tabel
//

fetchDataFromDatabase();
