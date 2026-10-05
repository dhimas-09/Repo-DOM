// ==========================================
// SYNCHRONOUS VS ASYNCHRONOUS JAVASCRIPT
// ==========================================


// ==========================================
// 1. SYNCHRONOUS
// ==========================================

console.log("=== SYNCHRONOUS ===");

console.log("Pertama");
console.log("Kedua");
console.log("Ketiga");


// ==========================================
// 2. ASYNCHRONOUS
// ==========================================

console.log("\n=== ASYNCHRONOUS ===");

console.log("Mulai");

setTimeout(() => {
    console.log("Proses asynchronous selesai");
}, 2000);

console.log("Program tetap berjalan");


// ==========================================
// 3. CALLBACK
// ==========================================

console.log("\n=== CALLBACK ===");

function prosesDenganCallback(callback) {
    setTimeout(() => {
        callback("Data berhasil diproses");
    }, 1000);
}

prosesDenganCallback((hasil) => {
    console.log(hasil);
});


// ==========================================
// 4. PROMISE
// ==========================================

console.log("\n=== PROMISE ===");

const prosesDenganPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise berhasil dijalankan");
    }, 1500);
});

prosesDenganPromise.then((hasil) => {
    console.log(hasil);
});


// ==========================================
// 5. ASYNC / AWAIT
// ==========================================

console.log("\n=== ASYNC / AWAIT ===");

function ambilData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data berhasil diambil");
        }, 2000);
    });
}

async function jalankanAsync() {
    const hasil = await ambilData();
    console.log(hasil);
}

jalankanAsync();