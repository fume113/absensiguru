$(document).ready(function () {
  // Fungsi untuk mengambil kalender melalui AJAX
  function getCalendar(month, year) {
    $.ajax({
      url: "../PHP/calendar-ajax.php",
      type: "POST",
      data: { month: month, year: year }, // Menggunakan objek data untuk mengirim data
      success: function (response) {
        $("#calendar-html-output").html(response);
      },
      error: function () {},
    });
  }

  // Event handler untuk tombol "Prev" dan "Next"
  $(document).on("click", ".prev, .next", function (event) {
    var month = $(this).data("prev-month") || $(this).data("next-month");
    var year = $(this).data("prev-year") || $(this).data("next-year");
    getCalendar(month, year);
  });

  // Menambahkan event click pada setiap tanggal dalam kalender
  $(document).on("click", "#calendar-html-output li[data-date]", function () {
    var selectedDate = $(this).data("date");
    redirectToDatabaseAbsensi(selectedDate);
  });

  // Fungsi untuk mengarahkan ke halaman databaseAbsensi.php dengan parameter tanggal yang dipilih
  function redirectToDatabaseAbsensi(selectedDate) {
    window.location.href = "databaseAbsensi.php?date=" + selectedDate;
  }
});
