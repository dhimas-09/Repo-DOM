// Synchronous — Satu Per Satu, Berurutan
console.log("Mulai");

function hitungTotal(koleksi) {
  let total = 0;
  for (const buku of koleksi) {
    total += buku.stok;
  }
  return total;
}

const koleksi = [
  { judul: "Laskar Pelangi", stok: 3 },
  { judul: "Sapiens", stok: 2 },
  { judul: "Atomic Habits", stok: 5 }
];

const total = hitungTotal(koleksi); // baris ini harus selesai dulu
console.log("Total stok:", total);  // baru baris ini dieksekusi
console.log("Selesai");

// Output selalu dalam urutan ini:
// Mulai
// Total stok: 10
// Selesai



// Asynchronous — Mulai, Lanjut, Kembali Nanti
console.log("1. Mulai muat halaman Perpus");

// Mulai fetch data — TIDAK blocking
// JavaScript tidak menunggu, langsung lanjut ke baris berikutnya
fetch("https://api.example.com/buku&quot")
  .then(response => response.json())
  .then(data => {
    // Ini dieksekusi NANTI, saat data sudah tiba
    console.log("3. Data buku diterima:", data.length, "buku");
  });

// Baris ini langsung dieksekusi tanpa menunggu fetch selesai
console.log("2. Render loading state dulu...");

// Output:
// 1. Mulai muat halaman BWAPerpus
// 2. Render loading state dulu...
// 3. Data buku diterima: 8 buku  ← muncul belakangan, setelah data tiba

// Tiga Cara Menulis Kode Asynchronous di JavaScript
// JavaScript telah berkembang dalam cara menangani async code. Ada tiga generasi pendekatan yang perlu diketahui:
// Callback adalah pendekatan paling awal — kirim sebuah fungsi sebagai argumen yang akan dipanggil saat operasi selesai. Sederhana untuk kasus tunggal, tapi menjadi mimpi buruk saat banyak operasi async bergantung satu sama lain.
// Promise adalah evolusi dari callback — sebuah object yang merepresentasikan nilai yang akan tersedia di masa depan. Lebih terstruktur, bisa di-chain, dan punya mekanisme error handling yang lebih jelas.
// Async/Await adalah sintaks modern yang dibangun di atas Promise — memungkinkan penulisan kode async yang terlihat dan terasa seperti kode synchronous biasa. Ini adalah standar yang paling banyak dipakai saat ini.
// // Callback — cara lama
ambilDataBuku(function(data) {
  prosesBuku(data, function(hasil) {
    simpanHasil(hasil, function() {
      console.log("Selesai");
    });
  });
});

// Promise — lebih terstruktur
ambilDataBuku()
  .then(data => prosesBuku(data))
  .then(hasil => simpanHasil(hasil))
  .then(() => console.log("Selesai"))
  .catch(error => console.error(error));

// Async/Await — paling bersih
async function jalankan() {
  try {
    const data = await ambilDataBuku();
    const hasil = await prosesBuku(data);
    await simpanHasil(hasil);
    console.log("Selesai");
  } catch (error) {
    console.error(error);
  }
}


// ACTION Lakukan ini di VSCODE 

// Buka Console browser dan jalankan eksperimen urutan eksekusi berikut satu per satu
// Eksperimen 1 — setTimeout dan urutan
console.log("1 - Pertama");

setTimeout(() => {
  console.log("2 - Dari setTimeout");
}, 1000);

console.log("3 - Setelah setTimeout didaftarkan");

// Pertanyaan sebelum jalan: angka berapa yang muncul terakhir?

// Eksperimen 2 — setTimeout dengan delay 0
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");

// Apakah B muncul sebelum atau sesudah C? Mengapa?

// Eksperimen 3 — fetch real
console.log("Sebelum fetch");

fetch("https://jsonplaceholder.typicode.com/todos/1&quot")
  .then(res => res.json())
  .then(data => console.log("Data fetch:", data.title));

console.log("Setelah fetch didaftarkan");

// Baris mana yang muncul pertama — "Setelah fetch" atau "Data fetch"?