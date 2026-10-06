// DATA
const KOLEKSI_BUKU = [
  { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Fiksi", stok: 3, rating: 4.8 },
  { id: 2, judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Fiksi", stok: 0, rating: 4.9 },
  { id: 3, judul: "Sapiens", penulis: "Yuval Noah Harari", kategori: "Sains", stok: 2, rating: 4.7 },
  { id: 4, judul: "Atomic Habits", penulis: "James Clear", kategori: "Non-fiksi", stok: 5, rating: 4.6 },
  { id: 5, judul: "Negeri 5 Menara", penulis: "Ahmad Fuadi", kategori: "Fiksi", stok: 1, rating: 4.5 },
  { id: 6, judul: "Deep Work", penulis: "Cal Newport", kategori: "Non-fiksi", stok: 0, rating: 4.4 },
  { id: 7, judul: "A Brief History of Time", penulis: "Stephen Hawking", kategori: "Sains", stok: 3, rating: 4.6 },
  { id: 8, judul: "Pulang", penulis: "Tere Liye", kategori: "Fiksi", stok: 2, rating: 4.3 }
];

let state = KOLEKSI_BUKU.map(b => ({ ...b, favorit: false }));

// FUNGSI BUAT ELEMEN
function buatBadge(teks, kelas) {
  const span = document.createElement("span");
  span.className = `badge ${kelas}`;
  span.textContent = teks;
  return span;
}

function buatTombol(teks, kelas, dataId) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `tombol-aksi ${kelas}`;
  btn.dataset.id = dataId;
  btn.textContent = teks;
  return btn;
}

function buatKartuBuku(buku) {
  const { id, judul, penulis, kategori, stok, rating, favorit } = buku;
  const tersedia = stok > 0;

  const kartu = document.createElement("div");
  kartu.className = [
    "kartu-buku",
    tersedia ? "" : "habis",
    favorit ? "favorit" : ""
  ].filter(Boolean).join(" ");
  kartu.dataset.id = id;

  const kartuAtas = document.createElement("div");
  kartuAtas.className = "kartu-atas";

  const elJudul = document.createElement("h3");
  elJudul.className = "kartu-judul";
  elJudul.textContent = judul;

  const tombolFavorit = buatTombol(
    favorit ? "♥" : "♡",
    `tombol-favorit${favorit ? " aktif" : ""}`,
    id
  );
  tombolFavorit.title = favorit ? "Hapus dari favorit" : "Tambah ke favorit";

  kartuAtas.append(elJudul, tombolFavorit);

  const elPenulis = document.createElement("p");
  elPenulis.className = "kartu-penulis";
  elPenulis.textContent = penulis;

  const kartuMeta = document.createElement("div");
  kartuMeta.className = "kartu-meta";

  const badgeKategori = buatBadge(kategori, "badge-kategori");
  let badgeStok;
  if (stok === 0) {
    badgeStok = buatBadge("Habis", "badge-habis");
  } else if (stok === 1) {
    badgeStok = buatBadge("Stok Kritis: 1", "badge-kritis");
  } else {
    badgeStok = buatBadge(`${stok} tersisa`, "badge-tersedia");
  }

  const elRating = document.createElement("span");
  elRating.className = "badge";
  elRating.style.marginLeft = "auto";
  elRating.style.color = "#d97706";
  elRating.textContent = `★ ${rating}`;

  kartuMeta.append(badgeKategori, badgeStok, elRating);

  const kartuAksi = document.createElement("div");
  kartuAksi.className = "kartu-aksi";

  const tombolPinjam = buatTombol("Pinjam", "tombol-pinjam", id);
  if (!tersedia) tombolPinjam.disabled = true;

  const tombolDetail = buatTombol("Detail", "tombol-detail", id);

  kartuAksi.append(tombolPinjam, tombolDetail);
  kartu.append(kartuAtas, elPenulis, kartuMeta, kartuAksi);

  return kartu;
}

// FUNGSI RENDER
function renderGrid() {
  const grid = document.getElementById("kontainer-buku");
  
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  const fragment = document.createDocumentFragment();
  state.forEach(buku => fragment.appendChild(buatKartuBuku(buku)));
  grid.appendChild(fragment);
}

function updateHeader() {
  const badgeTotal = document.getElementById("badge-total");
  const badgeFavorit = document.getElementById("badge-favorit");
  const totalFavorit = state.filter(b => b.favorit).length;

  badgeTotal.textContent = `${state.length} buku`;
  badgeFavorit.textContent = `${totalFavorit} ❤`;
  badgeFavorit.hidden = totalFavorit === 0;
}

function tampilkanDetailBuku(id) {
  const buku = state.find(b => b.id === id);
  const panel = document.getElementById("panel-detail");
  if (!buku || !panel) return;

  panel.innerHTML = "";
  
  const judul = document.createElement("h2");
  judul.textContent = buku.judul;

  const penulis = document.createElement("p");
  penulis.textContent = `Penulis: ${buku.penulis}`;

  const kategori = document.createElement("p");
  kategori.textContent = `Kategori: ${buku.kategori}`;

  const stok = document.createElement("p");
  stok.textContent = `Stok: ${buku.stok === 0 ? "Habis" : buku.stok + " eksemplar"}`;

  const rating = document.createElement("p");
  rating.textContent = `Rating: ★ ${buku.rating}`;

  const tombolTutup = document.createElement("button");
  tombolTutup.textContent = "X Tutup";
  tombolTutup.style.cssText = "margin-top:12px;padding:6px 14px;border:1.5px solid #e2e8f0;border-radius:8px;cursor:pointer;background:white;";
  
  tombolTutup.addEventListener("click", () => {
    panel.hidden = true;
    document.querySelector(`.kartu-buku[data-id="${id}"]`)?.classList.remove("dipilih");
  });

  panel.append(judul, penulis, kategori, stok, rating, tombolTutup);
  
  // Tampilkan Tombol "Kembalikan Buku" jika stok habis (Sesuai tugas Action To Do)
  if (buku.stok === 0) {
    const tombolKembalikan = document.createElement("button");
    tombolKembalikan.textContent = "Kembalikan Buku";
    tombolKembalikan.style.cssText = "margin-top:12px;margin-left:8px;padding:6px 14px;border:none;border-radius:8px;cursor:pointer;background:#22c55e;color:white;font-weight:600;";
    
    tombolKembalikan.addEventListener("click", () => {
      state = state.map(b => b.id === id ? { ...b, stok: b.stok + 1 } : b);
      renderGrid();
      tampilkanDetailBuku(id);
    });
    panel.append(tombolKembalikan);
  }

  panel.hidden = false;
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// EVENT DELEGATION
function setupEventDelegation() {
  const grid = document.getElementById("kontainer-buku");

  grid.addEventListener("click", function(event) {
    // Tombol Favorit
    const tombolFavorit = event.target.closest(".tombol-favorit");
    if (tombolFavorit) {
      event.stopPropagation();
      const id = Number(tombolFavorit.dataset.id);
      state = state.map(b => b.id === id ? { ...b, favorit: !b.favorit } : b);
      renderGrid();
      updateHeader();
      return;
    }

    // Tombol Pinjam
    const tombolPinjam = event.target.closest(".tombol-pinjam");
    if (tombolPinjam && !tombolPinjam.disabled) {
      event.stopPropagation();
      const id = Number(tombolPinjam.dataset.id);
      state = state.map(b => b.id === id && b.stok > 0 ? { ...b, stok: b.stok - 1 } : b);
      renderGrid();
      updateHeader();
      return;
    }

    // Tombol Detail
    const tombolDetail = event.target.closest(".tombol-detail");
    if (tombolDetail) {
      event.stopPropagation();
      const id = Number(tombolDetail.dataset.id);
      
      grid.querySelectorAll(".kartu-buku.dipilih").forEach(k => {
        k.classList.remove("dipilih");
      });

      tombolDetail.closest(".kartu-buku")?.classList.add("dipilih");
      tampilkanDetailBuku(id);
      return;
    }
  });

  // Tutup panel saat klik di luar
  document.addEventListener("click", function(event) {
    const panel = document.getElementById("panel-detail");
    if (!panel || panel.hidden) return;

    if (!grid.contains(event.target) && !panel.contains(event.target)) {
      panel.hidden = true;
      grid.querySelectorAll(".kartu-buku.dipilih").forEach(k => {
        k.classList.remove("dipilih");
      });
    }
  });
}

// INISIALISASI
function inisialisasi() {
  renderGrid();
  updateHeader();
  setupEventDelegation();
  console.log(`Perpus DOM siap - ${state.length} buku`);
}

inisialisasi();

// ==========================================
// 1. querySelector & querySelectorAll
// ==========================================
const judulPerpustakaan = document.querySelector('#judul-perpustakaan');
const formBuku = document.querySelector('#form-buku');
const inputJudul = document.querySelector('#input-judul');
const previewJudul = document.querySelector('#preview-judul');
const daftarBuku = document.querySelector('#daftar-buku');

// ==========================================
// 3. Manipulasi Style & Atribut
// ==========================================
judulPerpustakaan.style.color = '#1e293b';

// Data Awal Buku
const dataBukuAwal = ['Laskar Pelangi', 'Bumi Manusia'];

// ==========================================
// 4. Membuat & Menghapus Elemen Dinamis
// ==========================================
function tambahBukuKeDaftar(judul) {
  const li = document.createElement('li');
  li.className = 'buku-item';
  
  // 2. innerHTML
  li.innerHTML = `
    <span><strong>${judul}</strong></span>
    <button class="btn-hapus">Hapus</button>
  `;

  // 6. Event Bubbling (Klik pada kartu buku)
  li.addEventListener('click', () => {
    alert(`Melihat detail buku: "${judul}"`);
  });

  // 6. stopPropagation (Klik tombol hapus agar kartu tidak terklik)
  const btnHapus = li.querySelector('.btn-hapus');
  btnHapus.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah event bubbling ke elemen li
    
    // Menghapus elemen
    li.remove();
    alert(`Buku "${judul}" berhasil dihapus.`);
  });

  daftarBuku.appendChild(li);
}

// Render data awal saat halaman pertama dimuat
dataBukuAwal.forEach(buku => tambahBukuKeDaftar(buku));

// ==========================================
// 5. Event Listener: 'input' (Live Preview)
// ==========================================
inputJudul.addEventListener('input', (e) => {
  if (e.target.value.trim() !== '') {
    // 2. textContent / innerText
    previewJudul.innerText = `Mengetik: "${e.target.value}"`;
  } else {
    previewJudul.innerText = '';
  }
});

// ==========================================
// 5. Event Listener: 'submit' (Form Submit)
// ==========================================
formBuku.addEventListener('submit', (e) => {
  e.preventDefault(); // Mencegah reload halaman
  
  const judulBaru = inputJudul.value.trim();
  if (judulBaru !== '') {
    tambahBukuKeDaftar(judulBaru);
    inputJudul.value = '';
    previewJudul.innerText = '';
  }
});