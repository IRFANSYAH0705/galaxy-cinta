// Mengambil elemen dari HTML
const galaksi = document.getElementById("galaksi");
const foto = document.querySelectorAll(".foto");

const modalSurat = document.getElementById("modalSurat");
const bukaSurat = document.getElementById("bukaSurat");
const tutupSurat = document.getElementById("tutupSurat");

const jedaAnimasi = document.getElementById("jedaAnimasi");
const kirimBintang = document.getElementById("kirimBintang");

const pesanFoto = document.getElementById("pesanFoto");
const isiPesan = document.getElementById("isiPesan");
const tutupPesan = document.getElementById("tutupPesan");

const canvas = document.getElementById("bintang");
const ctx = canvas.getContext("2d");

// Pengaturan galaksi
let waktu = 0;
let berhenti = false;
let sudutMouse = 0;
let kemiringan = 0;

const kecepatan = 0.004;

const pesan = [
    "Kamu itu imut banget, bikin aku senyum sendiri. ❤️",
    "Senyummu punya cara sendiri untuk bikin hariku lebih indah. 🌷",
    "Buat aku, kamu wanita paling cantik di dunia. 💗",
    "Kamu lucu, menggemaskan, dan istimewa dengan caramu sendiri. ✨"
];

// Mengatur ukuran canvas agar sesuai layar
function aturCanvas() {
    const rasio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * rasio;
    canvas.height = window.innerHeight * rasio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(rasio, 0, 0, rasio, 0, 0);
}

window.addEventListener("resize", aturCanvas);
aturCanvas();

// Membuat bintang secara acak
const bintang = [];

function buatBintang() {
    bintang.length = 0;

    const jumlah = Math.min(
        180,
        Math.floor(window.innerWidth / 5)
    );

    for (let i = 0; i < jumlah; i++) {
        bintang.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            ukuran: Math.random() * 1.8 + 0.3,
            cahaya: Math.random(),
            kecepatan: Math.random() * 0.015 + 0.005
        });
    }
}

buatBintang();

window.addEventListener("resize", buatBintang);

// Menggambar dan menggerakkan bintang
function gambarBintang() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    bintang.forEach((b) => {
        b.cahaya += b.kecepatan;

        const terang = 0.3 + Math.abs(Math.sin(b.cahaya)) * 0.7;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.ukuran, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, 230, 255, ${terang})`;
        ctx.fill();
    });
}

// Mengatur posisi foto mengelilingi pusat galaksi
function gerakkanFoto() {
    const ukuran = galaksi.clientWidth;

    foto.forEach((item, index) => {
        const jarak = ukuran * 0.34;
        const sudut = waktu + (index * Math.PI * 2 / foto.length);

        const x = Math.cos(sudut) * jarak;
        const y = Math.sin(sudut) * jarak * 0.65;

        // Foto yang berada di depan tampak lebih besar
        const kedalaman = (Math.sin(sudut) + 1) / 2;
        const skala = 0.78 + kedalaman * 0.3;
        const lapisan = Math.round(kedalaman * 10);

        item.style.transform =
            `translate(-50%, -50%) ` +
            `translate(${x}px, ${y}px) ` +
            `scale(${skala})`;

        item.style.zIndex = lapisan + 1;
        item.style.opacity = 0.75 + kedalaman * 0.25;
    });
}

// Animasi utama
function animasi() {
    gambarBintang();

    if (!berhenti) {
        waktu += kecepatan;
    }

    gerakkanFoto();

    galaksi.style.transform =
        `translate(-50%, -50%) ` +
        `perspective(900px) ` +
        `rotateX(${kemiringan}deg) ` +
        `rotateZ(${sudutMouse}deg)`;

    requestAnimationFrame(animasi);
}

animasi();

// Mengubah sudut galaksi menggunakan mouse
galaksi.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const batas = galaksi.getBoundingClientRect();

    const x = event.clientX - batas.left;
    const y = event.clientY - batas.top;

    sudutMouse = ((x / batas.width) - 0.5) * 10;
    kemiringan = ((y / batas.height) - 0.5) * -8;
});

// Mengembalikan posisi saat mouse keluar
galaksi.addEventListener("pointerleave", () => {
    sudutMouse = 0;
    kemiringan = 0;
});

// Membuka surat cinta
bukaSurat.addEventListener("click", () => {
    modalSurat.classList.add("aktif");
    modalSurat.setAttribute("aria-hidden", "false");
});

// Menutup surat cinta
function tutupModalSurat() {
    modalSurat.classList.remove("aktif");
    modalSurat.setAttribute("aria-hidden", "true");
}

tutupSurat.addEventListener("click", tutupModalSurat);

// Menutup surat jika bagian gelap di luar surat diklik
modalSurat.addEventListener("click", (event) => {
    if (event.target === modalSurat) {
        tutupModalSurat();
    }
});

// Tombol jeda dan lanjutkan animasi
jedaAnimasi.addEventListener("click", () => {
    berhenti = !berhenti;

    jedaAnimasi.textContent = berhenti
        ? "Lanjutkan Galaksi ▶"
        : "Jeda Galaksi ⏸";
});

// Menampilkan pesan saat foto dipilih
foto.forEach((item) => {
    item.addEventListener("click", () => {
        const index = Number(item.dataset.index);

        isiPesan.textContent = pesan[index];

        pesanFoto.classList.add("aktif");
    });
});

// Menutup pesan foto
tutupPesan.addEventListener("click", () => {
    pesanFoto.classList.remove("aktif");
});

// Membuat efek bintang saat tombol ditekan
kirimBintang.addEventListener("click", () => {
    for (let i = 0; i < 18; i++) {
        const partikel = document.createElement("span");

        partikel.className = "partikel";
        partikel.textContent = Math.random() > 0.5 ? "✦" : "♡";

        partikel.style.left = Math.random() * 100 + "vw";
        partikel.style.top = (40 + Math.random() * 50) + "vh";
        partikel.style.fontSize = (12 + Math.random() * 18) + "px";

        document.body.appendChild(partikel);

        setTimeout(() => {
            partikel.remove();
        }, 1900);
    }
});

// Menutup tampilan menggunakan tombol Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        tutupModalSurat();
        pesanFoto.classList.remove("aktif");
    }
});
