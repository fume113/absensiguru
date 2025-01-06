const hariSelect = document.getElementById("hariSelect");
const dataAbsensi = document.getElementById("dataAbsensi");

// Fungsi untuk mengambil data dari server berdasarkan hari yang dipilih
function fetchDataByHari() {
  const hari = hariSelect.value; // Ambil hari yang dipilih dari elemen select
  const url = `../Query/queryJamAbsensi.php`;

  // Buat objek FormData untuk mengirim data
  const formData = new FormData();
  formData.append("hari", hari);

  fetch(url, {
    method: "POST",
    body: formData, // Menggunakan objek FormData
  })
    .then((response) => response.json())
    .then((data) => {
      tampilkanData(data);
    })
    .catch((error) => {
      console.error("Kesalahan mengambil data:", error);
    });
}

// Event listener untuk memantau perubahan seleksi hari
hariSelect.addEventListener("change", fetchDataByHari);

// Fungsi untuk menampilkan data dalam tabel
function tampilkanData(data) {
  dataAbsensi.innerHTML = "";

  if (data.length > 0) {
    data.forEach((item) => {
      const jamKeys = ["Jam Ke-0", "Jam Ke-1", "Jam Ke-2", "Jam Ke-3", "Jam Ke-4", "Istirahat 1", "Jam Ke-5", "Jam Ke-6", "Jam Ke-7", "Istirahat 2", "Jam Ke-8", "Jam Ke-9", "Jam Ke-10", "Jam Ke-TU"];

      jamKeys.forEach((key) => {
        const row = dataAbsensi.insertRow();
        const cellKey = row.insertCell(0);
        cellKey.textContent = key;

        const cellValue = row.insertCell(1);
        const jamInput = document.createElement("input");
        jamInput.type = "text";
        jamInput.className = "form-control";
        jamInput.value = item[key];
        jamInput.name = key.replace(/ /g, "_"); // Ganti spasi dengan garis bawah untuk sesuai dengan database
        cellValue.appendChild(jamInput);
      });

      const simpanButton = document.createElement("button");
      simpanButton.textContent = "Simpan";
      simpanButton.className = "btn btn-success";
      // Event listener untuk mengirim data saat tombol "Simpan" diklik
      simpanButton.addEventListener("click", function () {
        const newJamValues = {};

        jamKeys.forEach((key) => {
          const inputKey = key.replace(/ /g, "_"); // Ganti spasi dengan garis bawah untuk sesuai dengan database
          const jamInput = dataAbsensi.querySelector(`input[name="${inputKey}"]`);
          newJamValues[key] = jamInput.value;
        });

        const hariSelect = document.getElementById("hariSelect");
        const hari = hariSelect.value; // Ambil nilai hari yang dipilih
        const data = {
          jam: [newJamValues], // Menggunakan objek langsung
          hari: hari,
        };
        kirimDataUpdate(data);
      });

      const cell = dataAbsensi.insertRow().insertCell(0);
      cell.colSpan = 2;
      cell.appendChild(simpanButton);
    });
  } else {
    const row = dataAbsensi.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 2;
    cell.textContent = "Tidak ada data yang tersedia.";
  }
}

// Event listener untuk memantau perubahan seleksi hari
hariSelect.addEventListener("change", function () {
  const selectedHari = hariSelect.value;
  fetchDataByHari(selectedHari);
});

// Panggil fungsi untuk membuat formulir saat halaman dimuat
window.onload = function () {
  fetchDataByHari(hariSelect.value); // Mengambil data jadwal jam absensi untuk hari awal
};

// Fungsi untuk mengirim data update ke server
function kirimDataUpdate(data) {
  console.log("Data yang dikirim ke server:", data);

  fetch("../Query/queryUpdateJamAbsensi.php", {
    method: "POST",
    body: JSON.stringify(data), // Menggunakan JSON.stringify untuk mengubah objek menjadi JSON
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Respon dari server:", result);

      if (result.success) {
        Swal.fire({
          title: "Update Berhasil",
          text: "Data berhasil diperbarui.",
          icon: "success",
        });

        if (result.updatedData) {
          console.log("Data terbaru:", result.updatedData);
          // Lakukan sesuatu dengan data terbaru, jika diperlukan
        }

        // Fetch ulang data setelah pembaruan
        fetchDataByHari(hariSelect.value);
      } else {
        Swal.fire({
          title: "Update Gagal",
          text: "Terjadi kesalahan saat mengupdate data. Pesan: " + result.message,
          icon: "error",
        });
      }
    })
    .catch((error) => {
      console.error("Kesalahan mengirim data update:", error);
    });
}

// Memuat jadwal jam absensi untuk hari ini saat halaman dimuat
const hariIni = "senin"; // Atur nilai awal ke "Senin"
hariSelect.value = hariIni;
fetchDataByHari(hariIni); // Panggil fungsi fetchDataByHari dengan "Senin"
