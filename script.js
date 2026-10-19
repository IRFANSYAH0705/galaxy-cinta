document.addEventListener("DOMContentLoaded", function () {

    const opening = document.getElementById("opening");
    const mainContent = document.getElementById("mainContent");
    const openWebsite = document.getElementById("openWebsite");

    const modal = document.getElementById("letterModal");
    const closeLetter = document.getElementById("closeLetter");

    const modalTitle = document.getElementById("modalTitle");
    const modalIcon = document.getElementById("modalIcon");
    const letterText = document.getElementById("letterText");

    const photoButton = document.getElementById("photoButton");
    const letterPhoto = document.getElementById("letterPhoto");
    const bunnyLetterButton = document.getElementById("bunnyLetterButton");
    const surpriseButton = document.getElementById("surpriseButton");

    const hugScene = document.getElementById("hugScene");
    const closeHug = document.getElementById("closeHug");
    const startHug = document.getElementById("startHug");
    const couple = document.getElementById("couple");
    const hugMessage = document.getElementById("hugMessage");

    let currentPhoto = "";
    let isBunnyLetter = false;

    const letters = [
        {
            title: "Surat Pertama 💌",
            icon: "🌷",
            text: `Hai, Gaby.

Ada hal sederhana tentang kamu yang kadang membuatku tersenyum sendiri.

Mungkin kamu tidak menyadarinya, tetapi kehadiranmu bisa membuat hari biasa terasa sedikit lebih menyenangkan.

Semoga hari-harimu selalu dipenuhi hal baik dan alasan untuk tersenyum.

Jaga diri baik-baik, ya. ♡`,
            photo: "gaby1.jpeg"
        },
        {
            title: "Surat Kedua 🌷",
            icon: "💗",
            text: `Hai, Gaby.

Menurutku, hal yang indah tidak selalu harus sesuatu yang besar.

Kadang cukup melihat seseorang tersenyum, mendengar ceritanya, atau mengetahui bahwa dia baik-baik saja.

Aku harap kamu selalu bertemu dengan banyak hal yang membuatmu bahagia.

Jangan lupa istirahat dan tetap semangat, ya. ♡`,
            photo: "gaby2.jpeg"
        },
        {
            title: "Surat Ketiga ⭐",
            icon: "✨",
            text: `Untuk Gaby.

Setiap orang punya keistimewaannya masing-masing.

Dan ada beberapa orang yang tanpa sadar bisa meninggalkan kesan baik hanya dengan menjadi dirinya sendiri.

Buatku, kamu termasuk salah satunya.

Semoga kamu selalu percaya bahwa dirimu berharga dan pantas mendapatkan hal-hal baik. ♡`,
            photo: "gaby3.jpeg"
        },
        {
            title: "Surat Keempat 💗",
            icon: "💌",
            text: `Hai, Gaby.

Kalau suatu hari kamu merasa lelah, semoga kamu ingat bahwa tidak apa-apa untuk berhenti sebentar dan beristirahat.

Kamu tidak harus selalu terlihat kuat setiap saat.

Aku berharap banyak kebahagiaan datang kepadamu, satu demi satu.

Semoga senyummu selalu punya alasan untuk kembali. ♡`,
            photo: "gaby4.jpeg"
        }
    ];

    function showModal(title, icon, text) {
        modalTitle.textContent = title;
        modalIcon.textContent = icon;
        letterText.textContent = text;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
        currentPhoto = "";
        isBunnyLetter = false;
        letterPhoto.hidden = true;
        photoButton.hidden = true;
        surpriseButton.hidden = true;
        letterPhoto.removeAttribute("src");
    }

    // TOMBOL PEMBUKA

    openWebsite.addEventListener("click", function () {
        opening.hidden = true;
        mainContent.hidden = false;
        window.scrollTo(0, 0);
    });

    // EMPAT SURAT FOTO

    document.querySelectorAll(".letter-card").forEach(function (card) {
        card.addEventListener("click", function () {

            const index = Number(card.dataset.letter);
            const letter = letters[index];

            if (!letter) return;

            currentPhoto = letter.photo;
            isBunnyLetter = false;

            photoButton.hidden = false;
            surpriseButton.hidden = true;
            letterPhoto.hidden = true;

            showModal(letter.title, letter.icon, letter.text);
        });
    });

    // TOMBOL FOTO

    photoButton.addEventListener("click", function () {
        if (!currentPhoto) return;

        letterPhoto.onerror = function () {
            letterPhoto.hidden = true;
            letterText.textContent +=
                "\n\nFoto belum bisa ditampilkan. Periksa nama file fotonya di GitHub.";
        };

        letterPhoto.onload = function () {
            letterPhoto.hidden = false;
        };

        letterPhoto.src = currentPhoto;
    });

    // SURAT KELINCI

    bunnyLetterButton.addEventListener("click", function () {

        currentPhoto = "";
        isBunnyLetter = true;

        photoButton.hidden = true;
        letterPhoto.hidden = true;
        surpriseButton.hidden = false;

        showModal(
            "Surat dari Kelinci 🐰",
            "🐰💌",
            `Hai, Gaby!

Aku kelinci kecil yang datang membawa pesan rahasia.

Aku cuma mau bilang kalau kamu harus sering tersenyum, makan dengan baik, dan jangan lupa istirahat.

Kalau hari ini terasa melelahkan, semoga besok terasa lebih ringan.

Oh iya, ada satu kejutan lagi yang sudah disiapkan untukmu.

Siap membukanya? ♡`
        );
    });

    // TOMBOL KEJUTAN

    surpriseButton.addEventListener("click", function () {
        closeModal();
        hugScene.hidden = false;

        couple.classList.remove("hugging");
        hugMessage.hidden = true;
        startHug.hidden = false;

        window.scrollTo(0, 0);
    });

    // ANIMASI PELUKAN

    startHug.addEventListener("click", function () {
        couple.classList.remove("hugging");

        // Memulai ulang animasi agar bisa diputar kembali.
        void couple.offsetWidth;

        couple.classList.add("hugging");
        startHug.hidden = true;

        setTimeout(function () {
            hugMessage.hidden = false;
        }, 1700);
    });

    // TUTUP SURAT

    closeLetter.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // TUTUP KEJUTAN

    closeHug.addEventListener("click", function () {
        hugScene.hidden = true;
        couple.classList.remove("hugging");
        document.body.style.overflow = "";
    });

    // TOMBOL ESCAPE

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (!modal.hidden) closeModal();

            if (!hugScene.hidden) {
                hugScene.hidden = true;
                couple.classList.remove("hugging");
            }
        }
    });


    // BINTANG DAN METEOR

    function createSpace(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let stars = [];
        let meteors = [];

        function resize() {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);

            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * ratio;
            canvas.height = height * ratio;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

            stars = [];

            const count = Math.min(
                180,
                Math.floor((width * height) / 5000)
            );

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.8 + 0.3,
                    alpha: Math.random(),
                    speed: Math.random() * 0.02 + 0.005
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            stars.forEach(function (star) {
                star.alpha += star.speed;

                const opacity =
                    0.3 + Math.abs(Math.sin(star.alpha)) * 0.7;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,245,255," + opacity + ")";
                ctx.fill();
            });

            if (Math.random() < 0.018) {
                meteors.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.55,
                    speed: Math.random() * 5 + 5,
                    length: Math.random() * 80 + 50
                });
            }

            meteors.forEach(function (meteor) {
                const gradient = ctx.createLinearGradient(
                    meteor.x,
                    meteor.y,
                    meteor.x - meteor.length,
                    meteor.y - meteor.length
                );

                gradient.addColorStop(0, "rgba(255,255,255,0.9)");
                gradient.addColorStop(1, "rgba(195,160,255,0)");

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.moveTo(meteor.x, meteor.y);
                ctx.lineTo(
                    meteor.x - meteor.length,
                    meteor.y - meteor.length
                );
                ctx.stroke();

                meteor.x += meteor.speed;
                meteor.y += meteor.speed * 0.65;
            });

            meteors = meteors.filter(function (meteor) {
                return meteor.x < width + 100 &&
                       meteor.y < height + 100;
            });

            requestAnimationFrame(draw);
        }

        resize();
        draw();

        window.addEventListener("resize", resize);
    }

    createSpace("space");
    createSpace("hugSpace");

});
