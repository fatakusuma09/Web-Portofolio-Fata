import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
    // Target output ke elemen dengan ID canvas-container
    const container = document.getElementById('canvas-container');

    if (!container) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();

    // 2. Setup PerspectiveCamera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 3. Setup WebGLRenderer dengan alpha (transparan) dan antialias (grafis halus)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Optimasi performa: batasi pixelRatio maksimal 1.5 agar render lebih ringan dan cepat
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 4. Setup Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Cahaya natural ke seluruh scene
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7); // Arah cahaya agar model terlihat bervolume
    scene.add(directionalLight);

    // 5. Load model menggunakan GLTFLoader
    const loader = new GLTFLoader();
    loader.load(
        '/models/fata3d.glb',
        (gltf) => {
            const model = gltf.scene;

            // 1. Menghitung ukuran asli model
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // 2. Auto-Scale: Sesuaikan ukuran model agar pas di layar (misal max dimensi 6)
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 6 / maxDim;
            model.scale.set(scale, scale, scale);

            // 3. Auto-Center: Posisikan model di tengah & ke bawah
            model.position.x = -center.x * scale;
            // Turunkan model lebih jauh ke bawah agar kepala/dada masuk frame dengan jelas
            model.position.y = (-center.y * scale) - (size.y * 0.4 * scale);
            model.position.z = -center.z * scale;

            scene.add(model);

            // Set pivot rotasi di area dada/wajah karakter
            controls.target.copy(model.position);
            controls.target.y += (size.y * 0.6 * scale); // Mengangkat titik fokus/pivot ke atas karakter
            controls.update();

            console.log("Model 3D berhasil dimuat dan disesuaikan ukurannya!");
        },
        (xhr) => {
            // Memberikan log persentase loading karena file 72MB butuh waktu
            console.log((xhr.loaded / xhr.total * 100) + '% model loaded');
        },
        (error) => {
            console.error('Gagal memuat model 3D:', error);
        }
    );

    // 6. Mobile Touch & Interactivity (OrbitControls)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Pergerakan lebih mulus
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // Mematikan pan agar saat swipe di HP posisi tidak tergeser keluar frame
    controls.enableZoom = false; // Matikan zoom 3D agar scroll touchpad bisa dipakai untuk scroll halaman web
    // controls.minDistance = 2; // (Tidak lagi dipakai karena zoom dimatikan)
    // controls.maxDistance = 10; // (Tidak lagi dipakai karena zoom dimatikan)

    // 7. Fungsi untuk menggeser Kamera agar Model berada di Kanan (Desktop)
    function adjustCameraOffset() {
        if (window.innerWidth > 768) {
            // Pada Desktop: Gunakan setViewOffset untuk menggeser seluruh proyeksi kamera
            // (Nilai -0.25 berarti menggeser pandangan 25% ke kiri, sehingga objek di origin terlihat di sebelah kanan menutupi latar biru)
            camera.setViewOffset(window.innerWidth, window.innerHeight, window.innerWidth * -0.2, 0, window.innerWidth, window.innerHeight);
            camera.position.x = 0;
        } else {
            // Pada Mobile: Kembalikan proyeksi ke tengah normal
            if (camera.clearViewOffset) {
                camera.clearViewOffset();
            }
            camera.position.x = 0;
        }
        // Jangan ubah controls.target di sini agar rotasi tetap berpusat sempurna pada model
        controls.update();
    }

    // Panggil saat load pertama
    adjustCameraOffset();

    // 8. Responsivitas Layar & Adaptif
    window.addEventListener('resize', () => {
        // Update aspek rasio kamera
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // Update ukuran renderer
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Update posisi model berdasarkan lebar layar
        adjustCameraOffset();
    });

    // 8. Animasi & Render Loop
    function animate() {
        requestAnimationFrame(animate);

        // Wajib dipanggil di dalam loop jika enableDamping = true
        controls.update();

        // Render scene
        renderer.render(scene, camera);
    }

    // Jalankan loop animasi
    animate();
});
