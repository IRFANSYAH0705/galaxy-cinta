import * as THREE from
    'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';


/* ==========================
   PENGATURAN AWAL
========================== */

const sceneElement = document.getElementById("scene");
const loading = document.getElementById("loading");

const viewer = document.getElementById("photo-viewer");
const largePhoto = document.getElementById("large-photo");
const closeViewer = document.getElementById("close-viewer");
const photoCaption = document.getElementById("photo-caption");


/* ==========================
   MEMBUAT SCENE 3D
========================== */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x05030b);

scene.fog = new THREE.FogExp2(
    0x05030b,
    0.018
);


const camera = new THREE.PerspectiveCamera(
    48,
    window.innerWidth / window.innerHeight,
    0.1,
    180
);

camera.position.set(0, 1.8, 20);


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 1.8)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.15;

sceneElement.appendChild(renderer.domElement);


/* ==========================
   CAHAYA GALAKSI
========================== */

scene.add(
    new THREE.AmbientLight(0xffffff, 1.4)
);


const purpleLight = new THREE.PointLight(
    0x9e54ff,
    95,
    45
);

purpleLight.position.set(0, 1, 0);

scene.add(purpleLight);


const pinkLight = new THREE.PointLight(
    0xe45bca,
    38,
    35
);

pinkLight.position.set(-5, -1, -3);

scene.add(pinkLight);


const blueLight = new THREE.PointLight(
    0x615cff,
    28,
    35
);

blueLight.position.set(5, 2, 3);

scene.add(blueLight);


/* ==========================
   MEMBUAT BINTANG
========================== */

function makeStars(count) {

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        const radius = 18 + Math.random() * 48;

        const theta = Math.random() * Math.PI * 2;

        const phi = Math.acos(
            2 * Math.random() - 1
        );

        positions[i * 3] =
            radius * Math.sin(phi) * Math.cos(theta);

        positions[i * 3 + 1] =
            radius * Math.cos(phi);

        positions[i * 3 + 2] =
            radius * Math.sin(phi) * Math.sin(theta);

    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0xf6eaff,
        size: 0.075,
        transparent: true,
        opacity: 0.82,
        sizeAttenuation: true,
        depthWrite: false
    });

    const points = new THREE.Points(
        geometry,
        material
    );

    scene.add(points);

    return points;

}


const starField = makeStars(2200);


/* ==========================
   CAHAYA PUSARAN
========================== */

function makeGlowTexture() {

    const canvas = document.createElement("canvas");

    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        128, 128, 2,
        128, 128, 128
    );

    gradient.addColorStop(
        0,
        "rgba(196,105,255,0.34)"
    );

    gradient.addColorStop(
        0.25,
        "rgba(128,60,214,0.19)"
    );

    gradient.addColorStop(
        0.6,
        "rgba(73,35,130,0.07)"
    );

    gradient.addColorStop(
        1,
        "rgba(20,5,40,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0, 0,
        canvas.width,
        canvas.height
    );

    return new THREE.CanvasTexture(canvas);

}


const glowTexture = makeGlowTexture();


/* ==========================
   NEBULA UNGU
========================== */

for (let i = 0; i < 7; i++) {

    const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            opacity: 0.5
        })
    );

    const angle =
        (i / 7) * Math.PI * 2;

    glow.position.set(
        Math.cos(angle) * 4.2,
        Math.sin(angle) * 1.3,
        -2 - Math.random() * 3
    );

    glow.scale.set(
        9 + Math.random() * 5,
        6 + Math.random() * 4,
        1
    );

    scene.add(glow);

}


/* ==========================
   INTI GALAKSI
========================== */

const core = new THREE.Mesh(
    new THREE.SphereGeometry(
        0.55,
        32,
        32
    ),

    new THREE.MeshBasicMaterial({
        color: 0xe3a2ff,
        transparent: true,
        opacity: 0.82
    })
);

scene.add(core);


const coreGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xc16bff,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })
);

coreGlow.scale.set(8, 8, 1);

scene.add(coreGlow);


/* ==========================
   DEBU BINTANG BERBENTUK SPIRAL
========================== */

const dustCount = 4600;

const dustPositions = new Float32Array(
    dustCount * 3
);

const dustColors = new Float32Array(
    dustCount * 3
);

const colorA = new THREE.Color(0xb47aff);
const colorB = new THREE.Color(0xffa5df);
const colorC = new THREE.Color(0x7e8cff);


for (let i = 0; i < dustCount; i++) {

    const arm = Math.floor(
        Math.random() * 4
    );

    const radius =
        0.7 + Math.pow(Math.random(), 0.72) * 10.5;

    const armAngle =
        arm * Math.PI * 0.5;

    const spiral =
        radius * 0.48;

    const spread =
        (Math.random() - 0.5) *
        (0.35 + radius * 0.09);

    const angle =
        armAngle + spiral + spread;


    dustPositions[i * 3] =
        Math.cos(angle) * radius;

    dustPositions[i * 3 + 1] =
        (Math.random() - 0.5) *
        (0.35 + radius * 0.075);

    dustPositions[i * 3 + 2] =
        Math.sin(angle) * radius * 0.58;


    let color;

    const pick = Math.random();

    if (pick < 0.55) {
        color = colorA;
    } else if (pick < 0.82) {
        color = colorB;
    } else {
        color = colorC;
    }

    const mixedColor = color.clone().lerp(
        new THREE.Color(0xffffff),
        Math.random() * 0.35
    );

    dustColors[i * 3] = mixedColor.r;
    dustColors[i * 3 + 1] = mixedColor.g;
    dustColors[i * 3 + 2] = mixedColor.b;

}


const dustGeometry = new THREE.BufferGeometry();

dustGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        dustPositions,
        3
    )
);

dustGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(
        dustColors,
        3
    )
);


const dustMaterial = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});


const galacticDust = new THREE.Points(
    dustGeometry,
    dustMaterial
);

scene.add(galacticDust);


/* ==========================
   FOTO GABY
========================== */

const photoPaths = [
    "./gaby1.jpeg",
    "./gaby2.jpeg",
    "./gaby3.jpeg",
    "./gaby4.jpeg"
];

const loader = new THREE.TextureLoader();

const photoTextures = [];

const photoMeshes = [];

const photoGroup = new THREE.Group();

scene.add(photoGroup);


/* Foto pengganti jika file tidak ditemukan */

function createFallbackTexture(index) {

    const canvas = document.createElement("canvas");

    canvas.width = 256;
    canvas.height = 340;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(
        0, 0,
        256, 340
    );

    gradient.addColorStop(0, "#6b3994");
    gradient.addColorStop(1, "#e17dbd");

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0, 0,
        256, 340
    );

    ctx.fillStyle = "white";

    ctx.textAlign = "center";

    ctx.font = "48px Georgia";

    ctx.fillText("♡", 128, 175);

    ctx.font = "17px Arial";

    ctx.fillText(
        "Foto " + (index + 1),
        128,
        220
    );

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;

}


/* Memuat semua foto */

const photoPromises = photoPaths.map(
    function (path, index) {

        return new Promise(function (resolve) {

            loader.load(

                path,

                function (texture) {

                    texture.colorSpace =
                        THREE.SRGBColorSpace;

                    texture.anisotropy =
                        renderer.capabilities.getMaxAnisotropy();

                    photoTextures[index] = texture;

                    resolve(texture);

                },

                undefined,

                function () {

                    console.warn(
                        "Foto tidak ditemukan: " + path
                    );

                    const fallback =
                        createFallbackTexture(index);

                    photoTextures[index] = fallback;

                    resolve(fallback);

                }

            );

        });

    }
);


/* ==========================
   MEMBUAT KARTU FOTO 3D
========================== */

function createPhotoFrame(texture, index) {

    const group = new THREE.Group();

    const width =
        0.53 + Math.random() * 0.17;

    const height =
        width * 1.28;


    /* Bingkai putih */

    const border = new THREE.Mesh(

        new THREE.PlaneGeometry(
            width + 0.075,
            height + 0.075
        ),

        new THREE.MeshBasicMaterial({
            color: 0xfffaff,
            side: THREE.DoubleSide
        })

    );

    group.add(border);


    /* Foto */

    const photo = new THREE.Mesh(

        new THREE.PlaneGeometry(
            width,
            height
        ),

        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            toneMapped: false
        })

    );

    photo.position.z = 0.008;

    group.add(photo);


    /* Cahaya di sekitar foto */

    const glow = new THREE.Sprite(

        new THREE.SpriteMaterial({
            map: glowTexture,
            color: index % 2
                ? 0xf08bdc
                : 0xb58aff,

            transparent: true,
            opacity: 0.34,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })

    );

    glow.position.z = -0.08;

    glow.scale.set(
        width * 2.3,
        height * 2.1,
        1
    );

    group.add(glow);


    group.userData.photoIndex = index;

    group.userData.phase =
        Math.random() * Math.PI * 2;

    group.userData.rotationSpeed =
        (Math.random() - 0.5) * 0.0018;

    return group;

}


/* ==========================
   MENYUSUN GALAKSI FOTO
========================== */

function buildPhotoGalaxy() {

    photoGroup.clear();

    photoMeshes.length = 0;


    const totalCards =
        window.innerWidth < 600
            ? 112
            : 165;


    for (let i = 0; i < totalCards; i++) {

        /* Gunakan empat foto secara berulang */

        const photoIndex =
            i % photoTextures.length;

        const texture =
            photoTextures[photoIndex];

        const card = createPhotoFrame(
            texture,
            photoIndex
        );


        /* Empat lengan spiral */

        const arm = i % 4;

        const progress =
            i / totalCards;

        const radius =
            1.0 + Math.pow(progress, 0.82) * 8.6;

        const angle =
            arm * Math.PI * 0.5 +
            radius * 0.57 +
            (Math.random() - 0.5) * 0.52;


        const spread =
            (Math.random() - 0.5) *
            (0.7 + radius * 0.12);


        const x =
            Math.cos(angle) * radius + spread;

        const z =
            Math.sin(angle) * radius * 0.58 +
            (Math.random() - 0.5) * 1.1;

        const y =
            (Math.random() - 0.5) *
            (0.55 + radius * 0.19);


        card.position.set(x, y, z);


        /* Foto yang jauh dibuat lebih kecil */

        const scale =
            i < 4
                ? 1.15
                : 0.66 + Math.random() * 0.55;

        card.scale.setScalar(scale);


        /* Kemiringan setiap foto */

        card.rotation.set(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.48
        );


        card.userData.basePosition =
            card.position.clone();

        card.userData.baseY = y;

        card.userData.distance = radius;


        photoGroup.add(card);

        photoMeshes.push(card);

    }

}


/* Selesaikan loading foto */

Promise.all(photoPromises).then(function () {

    buildPhotoGalaxy();

    loading.classList.add("done");

    setTimeout(function () {
        loading.remove();
    }, 900);

});


/* ==========================
   INTERAKSI MOUSE DAN HP
========================== */

let pointerDown = false;

let pointerX = 0;

let pointerY = 0;

let targetRotationY = 0;

let targetRotationX = 0;

let draggingDistance = 0;


renderer.domElement.addEventListener(
    "pointerdown",
    function (event) {

        pointerDown = true;

        pointerX = event.clientX;

        pointerY = event.clientY;

        draggingDistance = 0;

        renderer.domElement.setPointerCapture(
            event.pointerId
        );

    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function (event) {

        if (!pointerDown) {
            return;
        }

        const dx =
            event.clientX - pointerX;

        const dy =
            event.clientY - pointerY;


        pointerX = event.clientX;

        pointerY = event.clientY;


        draggingDistance +=
            Math.abs(dx) + Math.abs(dy);


        targetRotationY += dx * 0.003;

        targetRotationX += dy * 0.0015;


        targetRotationX = Math.max(
            -0.35,
            Math.min(0.35, targetRotationX)
        );

    }
);


function endPointer() {
    pointerDown = false;
}

renderer.domElement.addEventListener(
    "pointerup",
    endPointer
);

renderer.domElement.addEventListener(
    "pointercancel",
    endPointer
);


/* ==========================
   MEMBUKA FOTO
========================== */

const raycaster = new THREE.Raycaster();

const pointer = new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function (event) {

        if (draggingDistance > 8) {
            return;
        }

        const rect =
            renderer.domElement.getBoundingClientRect();


        pointer.x =
            ((event.clientX - rect.left) / rect.width) * 2 - 1;

        pointer.y =
            -((event.clientY - rect.top) / rect.height) * 2 + 1;


        raycaster.setFromCamera(
            pointer,
            camera
        );


        const hits = raycaster.intersectObjects(
            photoGroup.children,
            true
        );


        if (hits.length === 0) {
            return;
        }


        let object = hits[0].object;


        while (
            object.parent &&
            object.parent !== photoGroup
        ) {
            object = object.parent;
        }


        const index =
            object.userData.photoIndex ?? 0;


        largePhoto.src =
            photoPaths[index];

        largePhoto.onerror = function () {
            largePhoto.removeAttribute("src");
        };


        const captions = [
            "Senyum manis Gaby ♡",
            "A lovely memory ♥",
            "Untuk Gaby yang cantik ✨",
            "Only for you 💗"
        ];


        photoCaption.textContent =
            captions[index];


        viewer.classList.add("open");

    }
);


/* Tutup foto */

function closePhotoViewer() {

    viewer.classList.remove("open");

    largePhoto.removeAttribute("src");

}


closeViewer.addEventListener(
    "click",
    closePhotoViewer
);


viewer.addEventListener(
    "click",
    function (event) {

        if (event.target === viewer) {
            closePhotoViewer();
        }

    }
);


window.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closePhotoViewer();
        }

    }
);


/* ==========================
   ANIMASI GALAKSI
========================== */

const clock = new THREE.Clock();


function animate() {

    requestAnimationFrame(animate);

    const time =
        clock.getElapsedTime();


    /* Galaksi berputar perlahan */

    if (!pointerDown) {
        targetRotationY += 0.00065;
    }


    photoGroup.rotation.y +=
        (targetRotationY - photoGroup.rotation.y) * 0.035;

    photoGroup.rotation.x +=
        (targetRotationX - photoGroup.rotation.x) * 0.035;


    /* Gerakan debu bintang */

    galacticDust.rotation.y =
        time * 0.018;

    galacticDust.rotation.z =
        Math.sin(time * 0.12) * 0.035;


    /* Bintang latar belakang */

    starField.rotation.y =
        time * 0.003;

    starField.rotation.x =
        Math.sin(time * 0.1) * 0.015;


    /* Cahaya inti berdenyut */

    core.scale.setScalar(
        1 + Math.sin(time * 1.4) * 0.06
    );

    coreGlow.material.opacity =
        0.7 + Math.sin(time * 1.1) * 0.16;


    /* Foto bergerak sedikit agar terlihat hidup */

    photoMeshes.forEach(function (card) {

        const baseY =
            card.userData.baseY;

        card.position.y =
            baseY +
            Math.sin(
                time * 0.55 + card.userData.phase
            ) * 0.06;

        card.rotation.z +=
            card.userData.rotationSpeed * 0.15;

        const distance =
            card.position.length();

        card.children[2].material.opacity =
            Math.max(
                0.12,
                0.4 - distance * 0.018
            );

    });


    renderer.render(
        scene,
        camera
    );

}


animate();


/* ==========================
   RESPONSIVE
========================== */

function resize() {

    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    camera.aspect =
        width / height;


    camera.fov =
        width < 600 ? 55 : 48;


    camera.position.z =
        width < 600 ? 23 : 20;


    camera.updateProjectionMatrix();


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            width < 600 ? 1.5 : 1.8
        )
    );


    renderer.setSize(
        width,
        height
    );

}


window.addEventListener(
    "resize",
    resize
);
