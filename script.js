// EMPAT SURAT UNTUK GABY

const letters = [

    {
        title: 'Untuk senyummu 🌷',
        eyebrow: 'A LITTLE NOTE FOR YOU',

        paragraphs: [
            'Hai Gaby, ada hal sederhana yang pengin aku bilang. Senyummu itu punya cara sendiri untuk bikin suasana terasa lebih hangat.',

            'Semoga hari-harimu dipenuhi hal baik, orang-orang yang tulus, dan alasan kecil untuk tersenyum. Jangan lupa istirahat dan jaga diri, ya.',

            'Kalau hari ini terasa berat, semoga kamu ingat kalau kamu tetap berharga, bahkan saat kamu sedang tidak merasa baik-baik saja.'
        ],

        signoff: 'Semoga senyummu selalu punya alasan ♡',
        photo: 'gaby1.jpeg'
    },

    {
        title: 'Hal kecil tentangmu ✨',
        eyebrow: 'THINGS I APPRECIATE',

        paragraphs: [
            'Kadang yang bikin seseorang spesial bukan hal besar, tapi hal-hal kecil yang mungkin dia sendiri tidak sadar.',

            'Cara kamu bercerita, caramu tertawa, dan hal sederhana tentang dirimu bisa membuat hari biasa terasa sedikit lebih menyenangkan.',

            'Aku harap kamu tidak lupa menghargai dirimu sendiri. Kamu tidak harus selalu sempurna untuk pantas disayangi.'
        ],

        signoff: 'Hal kecil tentangmu tetap berarti 💗',
        photo: 'gaby2.jpeg'
    },

    {
        title: 'Kamu yang spesial 💗',
        eyebrow: 'A GENTLE REMINDER',

        paragraphs: [
            'Gaby, kalau suatu saat kamu merasa kurang percaya diri, coba lihat dirimu dengan lebih lembut. Kamu punya banyak hal baik yang mungkin belum kamu sadari.',

            'Kamu boleh capek, boleh sedih, dan boleh mengambil waktu untuk diri sendiri. Tidak apa-apa kalau semuanya tidak selalu berjalan sesuai rencana.',

            'Aku cuma berharap kamu selalu bertemu alasan untuk bahagia dan orang-orang yang memperlakukanmu dengan baik.'
        ],

        signoff: 'Kamu spesial dengan caramu sendiri ♡',
        photo: 'gaby3.jpeg'
    },

    {
        title: 'Satu pesan lagi 🌙',
        eyebrow: 'BEFORE YOU GO',

        paragraphs: [
            'Terima kasih sudah menjadi dirimu sendiri, Gaby. Semoga kamu selalu punya keberanian untuk mengejar hal yang kamu inginkan.',

            'Jangan terlalu keras pada diri sendiri, ya. Kamu juga pantas mendapatkan perhatian, ketenangan, dan waktu untuk beristirahat.',

            'Kalau suatu hari kamu membaca surat ini lagi, semoga kamu tersenyum kecil dan ingat bahwa ada pesan baik yang dibuat khusus untukmu.'
        ],

        signoff: 'Jaga diri baik-baik, Gaby 🌙',
        photo: 'gaby4.jpeg'
    }

];


// SURAT KHUSUS KELINCI

const bunnyLetter = {

    title: 'Surat rahasia dari kelinci 🐰',
    eyebrow: 'A TINY SECRET FOR GABY',
    bunny: true,

    paragraphs: [

        'Hop hop, Gaby! 🐰 Aku kelinci kecil yang datang membawa pesan rahasia untukmu.',

        'Aku punya satu tugas penting: mengingatkan kamu supaya jangan lupa tersenyum, makan dengan baik, istirahat kalau lelah, dan menyayangi diri sendiri.',

        'Kalau hari ini kamu sedih, anggap saja aku sedang mengirim pelukan kelinci paling empuk untukmu. Kalau kamu bahagia, aku ikut melompat-lompat senang! 💗',

        'Terakhir, ada satu rahasia kecil... kamu itu spesial. Jadi jangan terlalu keras kepada dirimu sendiri, ya?',

        'Nah, tugasku selesai! Sekarang aku mau makan wortel sambil menjaga surat ini. Sampai jumpa, Gaby! 🥕💙'

    ],

    signoff: 'Hop hop, penuh sayang! 🐰♡'

};


// MENGAMBIL ELEMEN HTML

const modal = document.getElementById('letterModal');
const titleEl = document.getElementById('letterTitle');
const eyebrowEl = document.getElementById('letterEyebrow');
const contentEl = document.getElementById('letterContent');
const decorationEl = document.getElementById('letterDecoration');

const surpriseArea = document.getElementById('surpriseArea');
const revealPhoto = document.getElementById('revealPhoto');
const imageWrap = document.getElementById('surpriseImageWrap');
const surpriseImage = document.getElementById('surpriseImage');

const startHug = document.getElementById('startHug');
const hugScene = document.getElementById('hugScene');


// MEMBUKA SURAT

function openLetter(letter) {

    titleEl.textContent = letter.title;
    eyebrowEl.textContent = letter.eyebrow;

    decorationEl.textContent = letter.bunny ? '🐰' : '♡';

    contentEl.replaceChildren();

    letter.paragraphs.forEach((text, index) => {

        const p = document.createElement('p');

        p.textContent = text;

        p.style.animationDelay =
            `${Math.min(index * 0.12, 0.48)}s`;

        contentEl.appendChild(p);

    });

    const signoff = document.createElement('p');

    signoff.className = 'letter-signoff';
    signoff.textContent = letter.signoff;

    contentEl.appendChild(signoff);

    surpriseArea.hidden = false;

    // Foto hanya muncul di surat foto.

    revealPhoto.hidden = !!letter.bunny;
    revealPhoto.disabled = false;
    revealPhoto.textContent = 'Lihat foto kecil 💗';

    imageWrap.hidden = true;

    // Tombol pelukan hanya muncul di surat kelinci.

    startHug.hidden = !letter.bunny;

    if (letter.photo) {
        surpriseImage.src = letter.photo;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    document.getElementById('closeModal').focus();

}


// MENUTUP SURAT

function closeLetter() {

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

}


// KLIK EMPAT FOTO

document.querySelectorAll('[data-letter]').forEach(card => {

    card.addEventListener('click', () => {

        const index = Number(card.dataset.letter);

        openLetter(letters[index]);

    });

});


// KLIK SURAT KELINCI

document.getElementById('bunnyLetterButton')
    .addEventListener('click', () => {

        openLetter(bunnyLetter);

    });


// TOMBOL TUTUP SURAT

document.getElementById('closeModal')
    .addEventListener('click', closeLetter);

modal.querySelector('.modal-backdrop')
    .addEventListener('click', closeLetter);


// MEMUNCULKAN FOTO KEJUTAN

revealPhoto.addEventListener('click', () => {

    imageWrap.hidden = false;

    revealPhoto.textContent = 'Foto kecil untukmu 💗';

    revealPhoto.disabled = true;

});


// MEMULAI ANIMASI PELUKAN

startHug.addEventListener('click', () => {

    closeLetter();

    hugScene.classList.add('show');

    hugScene.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    createHugHearts();

});


// MENUTUP ANIMASI PELUKAN

document.getElementById('closeHug')
    .addEventListener('click', () => {

        hugScene.classList.remove('show');

        hugScene.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

    });


// TOMBOL ESC UNTUK MENUTUP

document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {

        closeLetter();

        hugScene.classList.remove('show');

        hugScene.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

    }

});


// HATI YANG BERTERBANGAN

function createHugHearts() {

    const holder = document.getElementById('hugHearts');

    holder.replaceChildren();

    for (let i = 0; i < 19; i++) {

        const heart = document.createElement('span');

        heart.className = 'floating-heart';

        heart.textContent = ['♡', '♥', '✦', '💕'][i % 4];

        heart.style.left = `${8 + Math.random() * 84}%`;

        heart.style.animationDelay =
            `${2.2 + Math.random() * 3.4}s`;

        heart.style.fontSize =
            `${14 + Math.random() * 18}px`;

        holder.appendChild(heart);

    }

}


// ANIMASI BINTANG DAN METEOR

const starCanvas = document.getElementById('stars');
const starCtx = starCanvas.getContext('2d');

const meteorCanvas = document.getElementById('meteors');
const meteorCtx = meteorCanvas.getContext('2d');

let stars = [];
let meteors = [];

let width = 0;
let height = 0;
let lastMeteor = 0;


// MENYESUAIKAN UKURAN LAYAR

function resizeSpace() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    [starCanvas, meteorCanvas].forEach(canvas => {

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        canvas.getContext('2d')
            .setTransform(dpr, 0, 0, dpr, 0, 0);

    });

    const jumlahBintang = Math.min(
        180,
        Math.floor(width * height / 6500)
    );

    stars = Array.from({ length: jumlahBintang }, () => ({

        x: Math.random() * width,
        y: Math.random() * height,

        r: Math.random() * 1.5 + 0.25,
        a: Math.random() * 0.7 + 0.15,

        speed: Math.random() * 0.018 + 0.004,
        phase: Math.random() * Math.PI * 2

    }));

}


// MEMBUAT METEOR

function addMeteor() {

    const fromLeft = Math.random() > 0.5;

    meteors.push({

        x: fromLeft ? Math.random() * width * 0.8 : width + 30,

        y: Math.random() * height * 0.42 - 20,

        vx: fromLeft
            ? -(4 + Math.random() * 3)
            : -(5 + Math.random() * 4),

        vy: 2 + Math.random() * 2.5,

        life: 0,
        max: 45 + Math.random() * 35,

        length: 70 + Math.random() * 90

    });

}


// MENJALANKAN ANIMASI LATAR

function animateSpace(time) {

    starCtx.clearRect(0, 0, width, height);

    // BINTANG BERKEDIP

    stars.forEach(star => {

        const glow =
            0.45 + Math.sin(time * star.speed + star.phase) * 0.4;

        starCtx.beginPath();

        starCtx.arc(
            star.x,
            star.y,
            star.r,
            0,
            Math.PI * 2
        );

        starCtx.fillStyle =
            `rgba(210,220,255,${Math.max(0.08, glow * star.a)})`;

        starCtx.fill();

        if (star.r > 1.1) {

            starCtx.beginPath();

            starCtx.arc(
                star.x,
                star.y,
                star.r * 2.8,
                0,
                Math.PI * 2
            );

            starCtx.fillStyle =
                `rgba(140,160,255,${glow * 0.08})`;

            starCtx.fill();

        }

    });


    // METEOR

    meteorCtx.clearRect(0, 0, width, height);

    if (time - lastMeteor > 2400 + Math.random() * 2300) {

        addMeteor();

        lastMeteor = time;

    }

    meteors = meteors.filter(meteor =>
        meteor.life < meteor.max &&
        meteor.x > -meteor.length &&
        meteor.y < height + meteor.length
    );


    meteors.forEach(meteor => {

        meteor.x += meteor.vx;
        meteor.y += meteor.vy;

        meteor.life++;

        const alpha =
            Math.sin(Math.PI * meteor.life / meteor.max) * 0.8;

        const gradient = meteorCtx.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x - meteor.vx * meteor.length / 6,
            meteor.y - meteor.vy * meteor.length / 6
        );

        gradient.addColorStop(
            0,
            `rgba(255,245,255,${alpha})`
        );

        gradient.addColorStop(
            1,
            'rgba(160,140,255,0)'
        );

        meteorCtx.strokeStyle = gradient;
        meteorCtx.lineWidth = 1.7;

        meteorCtx.beginPath();

        meteorCtx.moveTo(meteor.x, meteor.y);

        meteorCtx.lineTo(
            meteor.x - meteor.vx * meteor.length / 6,
            meteor.y - meteor.vy * meteor.length / 6
        );

        meteorCtx.stroke();

        meteorCtx.beginPath();

        meteorCtx.arc(
            meteor.x,
            meteor.y,
            1.7,
            0,
            Math.PI * 2
        );

        meteorCtx.fillStyle =
            `rgba(255,255,255,${alpha})`;

        meteorCtx.fill();

    });

    requestAnimationFrame(animateSpace);

}


// MULAI ANIMASI

window.addEventListener('resize', resizeSpace);

resizeSpace();

requestAnimationFrame(animateSpace);
