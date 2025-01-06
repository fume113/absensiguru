//
// FUNCTION PEMBUATAN TABEL
// Fungsi untuk membuat tabel dinamis dengan kolom "Jam Masuk" dan "Jam Keluar"
//
var header = [];
var isi = [];

var header2 = [];
var isi2 = [];

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
  var headers = ["No", "Nama", "NIP", "Jam Masuk", "Keterangan Masuk", "Jam Keluar", "Keterangan Keluar"]; // Tambahkan "Keterangan Masuk" dan "Keterangan Keluar" ke headers

  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.textContent = headers[i];
    th.classList.add("text-center"); // Menambahkan kelas "text-center" dari Bootstrap untuk semua judul kolom
    headerRow.appendChild(th);
    header.push(headers[i]);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Buat isi tabel
  var tbody = document.createElement("tbody");

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.jammasuk !== null && user.jammasuk !== undefined) {
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
      tdJamMasuk.textContent = user.jammasuk;
      row.appendChild(tdJamMasuk);

      var tdKeteranganMasuk = document.createElement("td"); // Kolom "Keterangan Masuk"
      tdKeteranganMasuk.textContent = user.keteranganmasuk || ""; // Menggunakan "||" untuk menampilkan string kosong jika data "keteranganmasuk" tidak ada
      row.appendChild(tdKeteranganMasuk);

      var tdJamKeluar = document.createElement("td");
      tdJamKeluar.textContent = user.jamkeluar || ""; // Menggunakan "||" untuk menampilkan string kosong jika data "jamkeluar" tidak ada
      row.appendChild(tdJamKeluar);

      var tdKeteranganKeluar = document.createElement("td"); // Kolom "Keterangan Keluar"
      tdKeteranganKeluar.textContent = user.keterangankeluar || ""; // Menggunakan "||" untuk menampilkan string kosong jika data "keterangankeluar" tidak ada
      row.appendChild(tdKeteranganKeluar);

      tbody.appendChild(row);
      isi.push([th.textContent, tdNama.textContent, tdNIP.textContent, tdJamMasuk.textContent, tdKeteranganMasuk.textContent, tdJamKeluar.textContent, tdKeteranganKeluar.textContent]);
    }
  }

  table.appendChild(tbody);

  return table;
}

function createSecondTable(users) {
  // Hapus tabel lama sebelum menambahkan tabel baru
  var existingTable = document.querySelector("#second-table .table.table-bordered");
  if (existingTable) {
    existingTable.parentNode.removeChild(existingTable);
  }

  var table = document.createElement("table");
  table.className = "table table-bordered";

  // Buat header tabel
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headers = ["No", "Nama"]; // Kolom "No" dan "Nama"

  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.textContent = headers[i];
    th.classList.add("text-center");
    headerRow.appendChild(th);
    header2.push(headers[i]); // Tambahkan ke array header2
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Buat isi tabel
  var tbody = document.createElement("tbody");

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var row = document.createElement("tr");

    var th = document.createElement("th");
    th.textContent = i + 1;
    th.classList.add("text-center");
    row.appendChild(th);

    var tdNama = document.createElement("td");
    tdNama.textContent = user.nama;
    row.appendChild(tdNama);

    tbody.appendChild(row);
    isi2.push([th.textContent, tdNama.textContent]); // Tambahkan ke array isi2
  }

  table.appendChild(tbody);

  return table;
}

// Mendapatkan tanggal dari parameter 'date' dalam URL
var urlParams = new URLSearchParams(window.location.search);
var selectedDate = urlParams.get("date");

// Jika selectedDate masih kosong atau belum ada nilainya, isi dengan tanggal hari ini
if (!selectedDate) {
  var today = new Date();
  var jakartaTimezone = "Asia/Jakarta";

  var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: jakartaTimezone, // Set zona waktu ke Jakarta
  };

  var dateFormatter = new Intl.DateTimeFormat("en-US", options);
  var [{ value: month }, , { value: day }, , { value: year }] = dateFormatter.formatToParts(today);

  selectedDate = `${year}-${month}-${day}`;
  selectedDate1 = `${day}-${month}-${year}`;

  document.getElementById("tanggal-heading").textContent = "Tanggal Absensi: " + selectedDate1;
} else {
  var hari = selectedDate.substr(8, 2);
  var bulan = selectedDate.substr(5, 2);
  var tahun = selectedDate.substr(0, 4);
  selectedDate1 = hari + "-" + bulan + "-" + tahun;

  document.getElementById("tanggal-heading").textContent = "Tanggal Absensi: " + selectedDate1;
}

// Mengganti teks dalam elemen h1 dengan tanggal yang dipilih atau tanggal default
// document.getElementById("tanggal-heading").textContent = "Tanggal Absensi: " + selectedDate;

function downloadExcel() {
  // Ambil tabel HTML yang ingin Anda ubah menjadi file Excel
  var absensiTable = document.getElementById("absensi-table");
  var secondTable = document.getElementById("second-table");

  // Konversi tabel HTML menjadi data yang dapat digunakan oleh xlsx
  var absensiData = tableToExcelData(absensiTable);
  var secondTableData = tableToExcelData(secondTable);

  // Buat objek workbook
  var wb = XLSX.utils.book_new();

  // Tambahkan worksheet dengan data absensi
  var absensiWS = XLSX.utils.aoa_to_sheet(absensiData);
  XLSX.utils.book_append_sheet(wb, absensiWS, "Absensi");

  // Tambahkan worksheet dengan data guru tidak absen
  var secondTableWS = XLSX.utils.aoa_to_sheet(secondTableData);
  XLSX.utils.book_append_sheet(wb, secondTableWS, "Guru Tidak Absen");

  // Simpan workbook sebagai file Excel
  XLSX.writeFile(wb, "Excel Data Guru Tanggal " + selectedDate + ".xlsx");

  // Tampilkan SweetAlert setelah berhasil mengunduh
  Swal.fire({
    icon: "success",
    title: "File Excel Sudah Terdownload",
    text: "Silahkan Buka Folder Download Anda.",
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

// Fungsi untuk mengambil data dari tabel HTML
function tableToExcelData(table) {
  var data = [];
  var rows = table.querySelectorAll("tr");
  for (var i = 0; i < rows.length; i++) {
    var row = [];
    var cells = rows[i].querySelectorAll("th, td");
    for (var j = 0; j < cells.length; j++) {
      row.push(cells[j].textContent);
    }
    data.push(row);
  }
  return data;
}

//Download PDF
function downloadPDF() {
  var doc = new jsPDF();
  // Tambahkan tabel "Absensi" ke dokumen PDF
  doc.text("Absensi", 10, 10); // Tambahkan judul "Absensi"
  doc.autoTable({
    theme: "striped",
    head: [header],
    body: isi,
  });

  // Tambahkan halaman baru
  doc.addPage();

  // Tambahkan judul halaman kedua
  doc.text("Guru Tidak Absen", 10, 10);

  // Tambahkan tabel "Guru Tidak Absen" ke halaman kedua
  doc.autoTable({
    theme: "striped",
    head: [header2], // Anda perlu mendefinisikan header untuk tabel kedua
    body: isi2, // Anda perlu mendefinisikan data untuk tabel kedua
  });

  doc.setProperties({
    title: "PDF Data Absensi Guru Tanggal " + selectedDate,
  });

  // Generate nama file PDF dengan format "Data_Absensi_Tanggal_YYYY-MM-DD.pdf"
  var fileName = "PDF Data Absensi Guru Tanggal " + selectedDate + ".pdf";

  // Simpan file PDF dengan nama yang telah dibuat
  doc.save(fileName);

  // Tampilkan SweetAlert setelah berhasil mengunduh
  Swal.fire({
    icon: "success",
    title: "File PDF Sudah Terdownload",
    text: "Silahkan Buka Folder Download Anda.",
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

//
// FUNCTION FETCHING DATA DARI DATABASE
// Fungsi untuk mengambil data dari database
//

function fetchDataFromDatabase(selectedDate) {
  // Menggunakan fetch API untuk mengambil data dari PHP server-side
  fetch("../Query/queryTabelAbsensi.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date: selectedDate }), // Mengirim tanggal sebagai data JSON
  })
    .then((response) => response.json())
    .then((data) => {
      // Panggil fungsi untuk membuat tabel dinamis dengan kolom "Jam Masuk" dan "Jam Keluar"
      var absensiTable = createAbsensiTable(data);

      // Tampilkan tabel "Absensi" di dalam div dengan id "absensi-table"
      var absensiTableContainer = document.getElementById("absensi-table");
      absensiTableContainer.appendChild(absensiTable);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
}

function fetchDataBelumAbsen(selectedDate) {
  // Menggunakan fetch API untuk mengambil data dari PHP server-side
  fetch("../Query/queryTabelBelumAbsen.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date: selectedDate }), // Mengirim tanggal sebagai data JSON
  })
    .then((response) => response.json())
    .then((data) => {
      // Filter guru-guru yang belum memiliki tanggal di hari tersebut
      var filteredData = data.filter((user) => !user.tanggal);

      // Panggil fungsi untuk membuat tabel kedua dengan guru-guru yang belum memiliki tanggal
      var secondTable = createSecondTable(filteredData);

      // Tampilkan tabel kedua di dalam div dengan id "second-table"
      var secondTableContainer = document.getElementById("second-table");
      secondTableContainer.appendChild(secondTable);
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
}

// Memanggil fetchDataFromDatabase dengan tanggal yang dipilih dari jsKalenderAbsen.js
function getSelectedDateFromKalender(selectedDate) {
  fetchDataFromDatabase(selectedDate);
  fetchDataBelumAbsen(selectedDate);
}

getSelectedDateFromKalender(selectedDate);
