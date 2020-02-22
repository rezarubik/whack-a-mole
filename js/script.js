// ? Cari tanah dan tikus dulu
const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
// const start = document.querySelector('.start');
const scoreBoard = document.querySelector('.score-board');
const pop = document.querySelector('#pop');

let beforeEarth;
let finish; // ! awalnya belum selesai
let score;

// ? Membuat bilangan random
function randomEarth(tanah) {
    // todo mendapatkan bilangan random dengan mendapatkan banyaknya tanah.
    // todo supaya tidak mendapatkan angka desimal, maka bungkus dengan Math.floor untuk membulatkan kebawah.

    // ! Pembulatan ada tiga:
    // ! Floor(lantai dibawah) : pembulatan kebawah
    // ! Round : pembulatan terdekat
    // ! Ceil(Celling/langit-langit) : pembulatan keatas 
    const t = Math.floor(Math.random() * tanah.length);
    const earthRandom = tanah[t];
    // ! Jika earthRandom sama dengan tanah sebelumnya, maka jalankan randomEarthnya. Kalau pertama kali beforeEarthnya pasti gak ada isinya.
    if (earthRandom == beforeEarth) {
        randomEarth(tanah);
    }
    // ! Jika tidak sama, maka diisi oleh tanah sebelumnya
    beforeEarth = earthRandom;
    // todo yg ingin kita dapatkan adalah tanah keberapa
    return earthRandom;
}
// ? Membuat time random untuk menghilangkan tikusnya
function timeRandom(min, max) {
    // ? Pembulatannya ambil yg terdekat
    return Math.round(Math.random() * (max - min) + min);
}

// ? Untuk memunculkan tikus
function showMouse() { // ! gak perlu pake parameter tanah lagi karena langsung dari function randomEarth()
    // console.log(tanah);
    // ? ambil dari randwomEarth. YG masuk ke earthRandom udah pasti elemennya
    const earthRandom = randomEarth(tanah);
    // * Variabel untuk randomTime
    const wRandom = timeRandom(300, 1000); // ? dari 300 detik sampai 1000 detik
    // * Memunculkan tikusnya. Tapi harus random, maka buat dulu function untuk membuat angka random
    earthRandom.classList.add('muncul');
    // ? Tikusnya hilang setelah setengah detik misal
    setTimeout(() => {
        earthRandom.classList.remove('muncul');
        // ? jika tidak selesai
        if (!finish) {
            // ? Panggil lagi function showMouse
            showMouse();
        }
        // ? Jika selesai maka akan masuk ke function start
    }, wRandom);
}

// ? Fungsi untuk mulai
function start() {
    finish = false;
    score = 0;
    scoreBoard.textContent = 0;
    // todo jalankan function showMouse untuk memunculkan tikus
    showMouse();
    // todo setiap 10 detik maka akan berhenti dan selesai permainan
    setTimeout(() => {
        finish = true;
    }, 3000); // ? selama 3000 detik
}

// ? Untuk mukul tikusnya
function whack() {
    // todo menambahkan score
    score++;
    // todo ketika kita pukul, buat si tikus jadi ngumpet lagi. this adalah tikusnya. Ambil parent tikusya yaitu tanah, terus remove muncul setelah di click
    this.parentNode.classList.remove('muncul');
    // todo jalankan audionya
    pop.play();
    // todo kita akan ganti si scoreBoard diisi dengan score
    scoreBoard.textContent = score;
}

// todo kita tangkap tikusnya. Untuk setiap tikus
tikus.forEach(t => {
    // ? ketika di klik tikusnya
    t.addEventListener('click', whack);
});