// ========================================
// BINTANG-BINTANG DI LATAR GALAKSI
// ========================================

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let animationFrame;
let width = 0;
let height = 0;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(
    Math.floor((width * height) / 3000),
    350
  );

  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.7 + 0.2,
    speed: Math.random() * 0.25 + 0.04,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  for (const star of stars) {
    star.phase += 0.018;
    star.y -= star.speed;

    if (star.y < -2) {
      star.y = height + 2;
      star.x = Math.random() * width;
    }

    const alpha =
      star.alpha * (0.65 + 0.35 * Math.sin(star.phase));

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(183, 221, 255, ${alpha})`;
    ctx.fill();

    if (star.radius > 1.25) {
      ctx.beginPath();
      ctx.moveTo(star.x - 4, star.y);
      ctx.lineTo(star.x + 4, star.y);
      ctx.moveTo(star.x, star.y - 4);
      ctx.lineTo(star.x, star.y + 4);
      ctx.strokeStyle = `rgba(127, 197, 255, ${alpha * 0.35})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }

  animationFrame = requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();

window.addEventListener("resize", resizeCanvas);

// ========================================
// ISI 4 SURAT UNTUK 4 FOTO GABY
// ========================================

const letters = [
  {
    title: "Untuk Gaby, bintangku 💙",
    decoration: "💌",
    eyebrow: "MY FIRST LITTLE LETTER",
    paragraphs: [
      "Hai, Gaby sayang. 💙",
      "Aku cuma ingin bilang kalau senyummu itu punya cara sederhana untuk bikin hari terasa lebih indah. Bahkan ketika hariku biasa saja, melihat kamu tersenyum bisa membuat suasana hatiku jadi lebih baik.",
      "Aku harap kamu selalu punya alasan untuk bahagia, selalu dikelilingi hal-hal baik, dan tidak pernah lupa betapa berharganya dirimu.",
      "Kalau suatu hari kamu sedang capek, semoga kamu ingat bahwa kamu pantas mendapatkan ketenangan, perhatian, dan kasih sayang.",
      "Terus tersenyum ya, Gaby. Senyummu itu manis sekali. 💗"
    ],
    signature: "Dengan sayang, untukmu ♡",
    photo: "gaby1.jpeg",
    surprise: true
  },
  {
    title: "Kamu itu istimewa 🌷",
    decoration: "🌷",
    eyebrow: "MY SECOND LITTLE LETTER",
    paragraphs: [
      "Hai, Gaby cantik. 🩷",
      "Ada banyak hal indah di dunia ini, tetapi setiap orang punya keistimewaannya sendiri. Dan buatku, kamu punya cara tersendiri untuk membuat seseorang merasa senang hanya dengan menjadi dirimu sendiri.",
      "Aku suka caramu menjadi kamu. Kamu tidak harus selalu sempurna, tidak harus selalu terlihat kuat, dan tidak perlu selalu menyenangkan semua orang.",
      "Jangan lupa untuk menyayangi dirimu sendiri juga, ya. Kamu layak mendapatkan kebahagiaan yang tulus.",
      "Semoga hari-harimu dipenuhi senyum kecil dan kejutan manis. ✨"
    ],
    signature: "Peluk hangat dari jauh 💗",
    photo: "gaby2.jpeg",
    surprise: true
  },
  {
    title: "Untuk bintang kecilku ✨",
    decoration: "⭐",
    eyebrow: "MY THIRD LITTLE LETTER",
    paragraphs: [
      "Gaby, ada sesuatu yang ingin aku sampaikan. 💙",
      "Aku mungkin tidak selalu pandai merangkai kata-kata romantis. Kadang aku juga bingung bagaimana cara mengungkapkan perasaan dengan tepat.",
      "Tapi aku ingin kamu tahu bahwa perhatian kecil pun bisa berarti banyak. Aku ingin melihatmu bahagia, mendengarkan ceritamu, dan ikut tersenyum ketika ada hal baik yang terjadi padamu.",
      "Kalau hari ini terasa berat, istirahatlah sebentar. Kamu tidak harus menyelesaikan semuanya sekaligus.",
      "Semoga besok membawa lebih banyak hal baik untukmu, Gaby. 🌙"
    ],
    signature: "Semoga kamu selalu bahagia ♡",
    photo: "gaby3.jpeg",
    surprise: true
  },
  {
    title: "Surat paling spesial 💗",
    decoration: "💖",
    eyebrow: "MY FOURTH LITTLE LETTER",
    paragraphs: [
      "Untuk Gaby yang manis. 💌",
      "Kalau aku bisa memberikan satu harapan untukmu, aku ingin kamu selalu merasa dihargai, disayangi, dan diterima sebagai dirimu sendiri.",
      "Aku harap kamu bertemu banyak hal baik dalam perjalananmu. Semoga impianmu satu per satu menemukan jalannya, dan semoga kamu tidak kehilangan semangat ketika sesuatu belum berjalan sesuai keinginanmu.",
      "Terima kasih sudah menjadi dirimu sendiri. Kamu punya keistimewaan yang tidak harus dibandingkan dengan siapa pun.",
      "Simpan surat kecil ini sebagai pengingat bahwa ada seseorang yang ingin melihatmu tersenyum. 💙"
    ],
    signature: "Kamu berharga, Gaby. ♡",
    photo: "gaby4.jpeg",
    surprise: true
  }
];

// ========================================
// ISI SURAT KHUSUS KELINCI
// ========================================

const bunnyLetter = {
  title: "Pesan Rahasia dari Kelinci 🐰",
  decoration: "🐰💌",
  eyebrow: "A TINY BUNNY HAS A MESSAGE",
  paragraphs: [
    "Psst... Gaby! Ada kelinci kecil yang mau ngomong sesuatu. 🐰",
    "Halo, Gaby! Aku kelinci penjaga surat cinta ini. Aku datang jauh-jauh membawa pesan kecil untuk kamu. Hihi! 💗",
    "Aku punya satu tugas penting: mengingatkan kamu supaya jangan lupa tersenyum, makan dengan baik, istirahat kalau lelah, dan menyayangi diri sendiri.",
    "Kalau hari ini kamu sedih, anggap saja aku sedang mengirim pelukan kelinci paling empuk untukmu. Kalau kamu bahagia, aku ikut melompat-lompat senang! 🐰💕",
    "Terakhir, ada satu rahasia kecil... kamu itu spesial, Gaby. Jadi jangan terlalu keras kepada dirimu sendiri, ya?",
    "Nah, tugasku selesai! Sekarang aku mau makan wortel sambil menjaga surat ini. Sampai jumpa, Gaby! 🥕💙"
  ],
  signature: "Hop hop, penuh sayang! 🐰♡",
  photo: null,
  surprise: false
};

// ========================================
// MENGATUR JENDELA SURAT
// ========================================

const modal = document.getElementById("letterModal");
const letterTitle = document.getElementById("letterTitle");
const letterDecoration = document.getElementById("letterDecoration");
const letterEyebrow = document.getElementById("letterEyebrow");
const letterContent = document.getElementById("letterContent");
const surpriseArea = document.getElementById("surpriseArea");
const revealPhotoButton = document.getElementById("revealPhoto");
const hiddenPhoto = document.getElementById("hiddenPhoto");
const surpriseImage = document.getElementById("surpriseImage");

const closeLetterButton = document.getElementById("closeLetter");
const closeLetterBottom = document.getElementById("closeLetterBottom");

let lastFocusedElement = null;
let activeLetter = null;

function openLetter(letter) {
  lastFocusedElement = document.activeElement;
  activeLetter = letter;

  letterTitle.textContent = letter.title;
  letterDecoration.textContent = letter.decoration;
  letterEyebrow.textContent = letter.eyebrow;

  letterContent.replaceChildren();

  letter.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    letterContent.appendChild(p);
  });

  const signature = document.createElement("p");
  signature.className = "letter-signature";
  signature.textContent = letter.signature;
  letterContent.appendChild(signature);

  // Foto disembunyikan setiap kali surat dibuka.
  hiddenPhoto.hidden = true;

  // Tombol kejutan hanya tersedia pada surat foto.
  surpriseArea.hidden = !letter.surprise;

  if (letter.surprise && letter.photo) {
    surpriseImage.src = letter.photo;
    revealPhotoButton.textContent = "Buka kejutan untukmu 💗";
    revealPhotoButton.hidden = false;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  closeLetterButton.focus();
}

function closeLetter() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  activeLetter = null;

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Setiap foto memiliki surat masing-masing.
document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    const index = Number(card.dataset.letter);
    const letter = letters[index];

    if (letter) {
      openLetter(letter);
    }
  });
});

// Surat khusus kelinci terpisah dari keempat surat foto.
document
  .getElementById("bunnyLetterButton")
  .addEventListener("click", () => {
    openLetter(bunnyLetter);
  });

// Foto hanya muncul setelah tombol kejutan ditekan.
revealPhotoButton.addEventListener("click", () => {
  if (!activeLetter || !activeLetter.photo) {
    return;
  }

  hiddenPhoto.hidden = false;
  revealPhotoButton.hidden = true;

  hiddenPhoto.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});

// Menutup surat.
closeLetterButton.addEventListener("click", closeLetter);
closeLetterBottom.addEventListener("click", closeLetter);

modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeLetter();
  }
});

// Tombol Escape juga bisa menutup surat.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeLetter();
  }
});
