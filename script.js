// =========================
// MENGAMBIL ELEMEN HTML
// =========================

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

// =========================
// PENGATURAN
// =========================

const pesan = [
    "Kamu itu imut banget, bikin aku senyum sendiri. ❤️",
    "Senyummu punya cara sendiri untuk bikin hariku lebih indah. 🌷",
    "Buat aku, kamu wanita paling cantik di dunia. 💗",
    "Kamu lucu, menggemaskan, dan istimewa dengan caramu sendiri. ✨"
];

let waktu = 0;
let waktuTerakhir = 0;
let berhenti = false;

let sudutMouse = 0;
let kemiringan = 0;

let targetSudut = 0;
let targetKemiringan = 0;

const kecepatan = 0.0008;
const gerakanHalus = 0.08;

const mengurangiGerakan = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// =========================
// MENGATUR UKURAN CANVAS
// =========================

function aturCanvas() {
    const rasio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(window.innerWidth * rasio);
    canvas.height = Math.round(window.innerHeight * rasio);

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(rasio, 0, 0, rasio, 0, 0);
}

window.addEventListener("resize", aturCanvas);

aturCanvas();

// =========================
// MEMBUAT BINTANG
// =========================

const bintang = [];

function buatBintang() {
    bintang.length = 0;

    const jumlah = Math.min(
        150,
        Math.floor(window.innerWidth / 6)
    );

    for (let i = 0; i < jumlah; i++) {
        bintang.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            ukuran: Math.random() * 1.6 + 0.3,
            fase: Math.random() * Math.PI * 2,
            kecepatan: 0.4 + Math.random() * 0.8
        });
    }
}

buatBintang();

window.addEventListener("resize", buatBintang);

// =========================
// MENGGAMBAR BINTANG
// =========================

function gambarBintang() {
    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    bintang.forEach((b) => {
        const terang = mengurangiGerakan
            ? 0.7
            : 0.25 + (
                Math.sin(b.fase) + 1
            ) * 0.35;

        ctx.beginPath();

        ctx.arc(
            b.x,
            b.y,
            b.ukuran,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255, 230, 255, ${terang})`;

        ctx.fill();

        if (!mengurangiGerakan && !berhenti) {
            b.fase += b.kecepatan * 0.025;
        }
    });
}

// =========================
// MENGGERAKKAN FOTO
// =========================

function gerakkanFoto() {
    const ukuran = galaksi.clientWidth;

    const jarak = ukuran * 0.34;

    foto.forEach((item, index) => {
        const sudut =
            waktu + index * Math.PI * 2 / foto.length;

        const x = Math.cos(sudut) * jarak;
        const y = Math.sin(sudut) * jarak * 0.65;

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

// =========================
// ANIMASI GALAKSI
// =========================

function animasi(waktuSekarang) {
    if (!waktuTerakhir) {
        waktuTerakhir = waktuSekarang;
    }

    const selisih = Math.min(
        waktuSekarang - waktuTerakhir,
        40
    );

    waktuTerakhir = waktuSekarang;

    gambarBintang();

    if (!berhenti && !mengurangiGerakan) {
        waktu += kecepatan * selisih;
    }

    sudutMouse +=
        (targetSudut - sudutMouse) * gerakanHalus;

    kemiringan +=
        (targetKemiringan - kemiringan) * gerakanHalus;

    gerakkanFoto();

    galaksi.style.transform =
        `translate(-50%, -50%) ` +
        `perspective(900px) ` +
        `rotateX(${kemiringan}deg) ` +
        `rotateZ(${sudutMouse}deg)`;

    requestAnimationFrame(animasi);
}

requestAnimationFrame(animasi);

// =========================
// INTERAKSI MOUSE
// =========================

galaksi.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
        return;
    }

    const batas = galaksi.getBoundingClientRect();

    const x = event.clientX - batas.left;
    const y = event.clientY - batas.top;

    targetSudut = ((x / batas.width) - 0.5) * 10;

    targetKemiringan =
        ((y / batas.height) - 0.5) * -8;
});

galaksi.addEventListener("pointerleave", () => {
    targetSudut = 0;
    targetKemiringan = 0;
});

// =========================
// INTERAKSI SENTUHAN HP
// =========================

let sentuhanAktif = false;
let posisiSentuhanX = 0;
let posisiSentuhanY = 0;

galaksi.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") {
        return;
    }

    sentuhanAktif = true;

    posisiSentuhanX = event.clientX;
    posisiSentuhanY = event.clientY;
});

galaksi.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "touch" || !sentuhanAktif) {
        return;
    }

    const selisihX = event.clientX - posisiSentuhanX;
    const selisihY = event.clientY - posisiSentuhanY;

    targetSudut += selisihX * 0.12;
    targetKemiringan -= selisihY * 0.08;

    targetSudut = Math.max(
        -20,
        Math.min(20, targetSudut)
    );

    targetKemiringan = Math.max(
        -12,
        Math.min(12, targetKemiringan)
    );

    posisiSentuhanX = event.clientX;
    posisiSentuhanY = event.clientY;
});

function selesaiSentuhan() {
    sentuhanAktif = false;
}

galaksi.addEventListener("pointerup", selesaiSentuhan);
galaksi.addEventListener("pointercancel", selesaiSentuhan);

// =========================
// MEMBUKA SURAT CINTA
// =========================

let elemenSebelumModal = null;

bukaSurat.addEventListener("click", () => {
    elemenSebelumModal = document.activeElement;

    modalSurat.classList.add("aktif");
    modalSurat.setAttribute("aria-hidden", "false");

    tutupSurat.focus();
});

function tutupModalSurat() {
    modalSurat.classList.remove("aktif");
    modalSurat.setAttribute("aria-hidden", "true");

    if (elemenSebelumModal) {
        elemenSebelumModal.focus();
    }
}

tutupSurat.addEventListener("click", tutupModalSurat);

modalSurat.addEventListener("click", (event) => {
    if (event.target === modalSurat) {
        tutupModalSurat();
    }
});

// =========================
// JEDA ANIMASI
// =========================

jedaAnimasi.addEventListener("click", () => {
    berhenti = !berhenti;

    jedaAnimasi.textContent = berhenti
        ? "Lanjutkan Galaksi ▶"
        : "Jeda Galaksi ⏸";
});

// =========================
// PESAN FOTO
// =========================

foto.forEach((item) => {
    item.addEventListener("click", () => {
        const index = Number(item.dataset.index);

        isiPesan.textContent = pesan[index];

        pesanFoto.classList.add("aktif");
        pesanFoto.setAttribute("aria-hidden", "false");

        tutupPesan.focus();
    });
});

function tutupPesanFoto() {
    pesanFoto.classList.remove("aktif");
    pesanFoto.setAttribute("aria-hidden", "true");
}

tutupPesan.addEventListener("click", tutupPesanFoto);

// =========================
// EFEK KIRIM BINTANG
// =========================

kirimBintang.addEventListener("click", () => {
    if (mengurangiGerakan) {
        return;
    }

    for (let i = 0; i < 18; i++) {
        const partikel = document.createElement("span");

        partikel.className = "partikel";

        partikel.textContent =
            Math.random() > 0.5 ? "✦" : "♡";

        partikel.style.left =
            Math.random() * 100 + "vw";

        partikel.style.top =
            (40 + Math.random() * 50) + "vh";

        partikel.style.fontSize =
            (12 + Math.random() * 18) + "px";

        document.body.appendChild(partikel);

        setTimeout(() => {
            partikel.remove();
        }, 1900);
    }
});

// =========================
// TOMBOL ESCAPE
// =========================

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        tutupModalSurat();
        tutupPesanFoto();
    }
});

// =========================
// MEMERIKSA FOTO
// =========================

foto.forEach((item) => {
    const gambar = item.querySelector("img");

    gambar.addEventListener("error", () => {
        console.error(
            "Foto tidak ditemukan:",
            gambar.getAttribute("src")
        );
    });
});
