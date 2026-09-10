# 📋 PLAN — Refaktor & Pengembangan Web Profile Imam Mahmuda

> **Status**: ✅ Selesai  
> **Dibuat**: 2026-09-10  
> **Framework**: Next.js 14 (App Router) + React + Tailwind CSS v4  
> **Dibaca oleh**: Antigravity, Claude Code, OpenCode, Codex, atau agen lainnya

---

## 📌 Panduan untuk Agent

- Centang item dengan mengubah `[ ]` menjadi `[x]`
- Tandai sedang dikerjakan dengan `[~]`
- Jika ada sub-task, selesaikan dari atas ke bawah
- **Jangan skip fase** — setiap fase bergantung pada fase sebelumnya
- File data utama setelah refaktor: `data/portfolio.js`
- Halaman CRUD ada di route: `app/admin/page.js`
- Data runtime disimpan di `localStorage` (key: `"portfolio_data"`) dengan fallback ke `data/portfolio.js`

---

## 🗂️ Ringkasan Fase

| # | Fase | Deskripsi | Status |
|---|------|-----------|--------|
| 1 | **Audit & Bersihkan** | Hapus file sampah, audit referensi yang rusak | `[x]` |
| 2 | **Refaktor Codebase** | Perbaiki masalah nyata di komponen dan konfigurasi | `[x]` |
| 3 | **Centralisasi Data** | Pindahkan semua data hardcode ke `data/portfolio.js` | `[x]` |
| 4 | **Perbarui Data CV** | Sinkronkan data dengan CV terbaru | `[x]` |
| 5 | **Halaman Admin CRUD** | Buat halaman `/admin` untuk mengelola data portofolio | `[x]` |
| 6 | **Fitur: Tombol Kunjungi Web** | Tampilkan tombol di card proyek jika ada URL | `[x]` |
| 7 | **Fitur: Multi-Foto Proyek** | Kartu proyek mendukung banyak foto (mini-carousel) | `[x]` |
| 8 | **Verifikasi & Polish** | Test build, responsive, bug fixing | `[x]` |

---

## ✅ FASE 1 — Audit & Bersihkan Proyek

> Tujuan: Hapus file tidak relevan dan perbaiki referensi yang rusak **sebelum** refaktor dimulai.

### File yang Harus Dihapus
- [ ] **1.1** Hapus `components/search.htm` — cache Google Search, tidak ada hubungannya dengan proyek
- [ ] **1.2** Hapus `components/card.glb` — duplikat; yang dipakai adalah `public/card.glb`
- [ ] **1.3** Hapus `components/cv-imam-mahmuda.pdf` — duplikat; yang dipakai adalah `public/cv-imam-mahmuda.pdf`
- [ ] **1.4** Hapus `components/download.png` — tidak direferensikan di mana pun
- [ ] **1.5** Hapus `components/lanyard.png` — duplikat; yang dipakai adalah `public/lanyard.png`
- [ ] **1.6** Hapus `public/card2.glb` — tidak direferensikan di kode mana pun

### Masalah Referensi yang Harus Diperbaiki
- [ ] **1.7** Tambahkan file `public/nextjs-logo.png` — direferensikan di `app/page.js` baris 22 (`/nextjs-logo.png`) tapi **filenya tidak ada** di `public/`
- [ ] **1.8** Verifikasi `public/foto-profil.png` ada — user sudah ubah dari `.jpg` ke `.png` di `page.js`, pastikan file `.png`-nya benar-benar ada

### Audit Setelah Cleanup
- [ ] **1.9** Jalankan `npm run dev` dan pastikan tidak ada error 404 untuk aset apapun

---

## ✅ FASE 2 — Refaktor Codebase

> Tujuan: Perbaiki masalah nyata yang ditemukan saat membaca kode. Tidak semua hal perlu diubah — fokus pada yang bermasalah.

### 2.1 — `app/layout.js` (Ada Masalah Nyata)
- [ ] **2.1.1** Hapus `{}` kosong di dalam tag `<html>` (baris 15 — `{}\n<body>`) — ini akan menyebabkan hydration warning
- [ ] **2.1.2** Ubah `lang="en"` menjadi `lang="id"` karena konten website berbahasa Indonesia
- [ ] **2.1.3** Update `metadata`: ubah `title` dan `description` menjadi lebih deskriptif (misal: "Portfolio Imam Mahmuda — Web Developer")
- [ ] **2.1.4** Font di `globals.css` masih pakai `Arial, Helvetica, sans-serif` sebagai fallback padahal sudah ada Inter. Selaraskan atau pertimbangkan tambah font Outfit dari `next/font/google`

### 2.2 — `components/Navbar.jsx` (Ada Masalah Nyata)
- [ ] **2.2.1** Isi logo/brand di Navbar kosong (baris 38 — `<Link to="home">` tapi tidak ada teks/konten di dalamnya). Isi dengan nama "Imam Mahmuda" atau inisial

### 2.3 — `components/Carousel.jsx` (Ada Masalah)
- [ ] **2.3.1** Baris 184 menggunakan `useTransform` di dalam `.map()` — ini melanggar **Rules of Hooks** (`eslint-disable-next-line react-hooks/rules-of-hooks` hanya menyembunyikan warning, bukan memperbaikinya). Ini harus direfaktor agar hook dipanggil di level komponen, bukan di dalam loop

### 2.4 — `components/RippleGrid1.jsx` (Tidak Dipakai di Halaman Manapun)
- [ ] **2.4.1** Verifikasi apakah `RippleGrid1.jsx` dan `RippleGrid.css` dipakai di halaman mana pun dengan `grep -r "RippleGrid"` di seluruh proyek
- [ ] **2.4.2** Jika tidak dipakai, hapus kedua file tersebut. Jika dipakai, biarkan

### 2.5 — `next.config.mjs` (Sudah Baik, Perlu Verifikasi)
- [ ] **2.5.1** Konfigurasi `file-loader` untuk `.glb` sudah ada dan benar. Namun `public/rapier_wasm3d_bg.wasm` sudah ada di folder `public/` sehingga tidak perlu konfigurasi webpack tambahan. Verifikasi bahwa `.wasm` berfungsi dengan baik saat `npm run dev`

### 2.6 — `app/globals.css` (Perlu Dibersihkan)
- [ ] **2.6.1** CSS font masih pakai `font-family: Arial` tapi `layout.js` menggunakan `Inter` dari `next/font`. Ada inkonsistensi — selaraskan agar menggunakan CSS variable dari `next/font`

### 2.7 — Komponen Yang Sudah Baik (Jangan Diubah)
> Komponen berikut sudah memiliki `"use client"` dan berfungsi benar. **Tidak perlu disentuh** kecuali ada bug spesifik:
> - `Lanyard.jsx`, `LanyardCanvas.jsx` (dynamic import + ssr:false sudah benar)
> - `AnimatedContent.jsx` (GSAP + ScrollTrigger sudah benar)
> - `AnimatedTitle.jsx` (Framer Motion sudah benar)
> - `RotatingText.jsx` (sudah benar)
> - `GlareHover.jsx`, `Magnet.jsx`, `SpotlightCard.jsx`, `TiltedCard.jsx`, `PixelCard.jsx` (semua sudah `"use client"` dan berfungsi)

---

## ✅ FASE 3 — Centralisasi Data ke `data/portfolio.js`

> Tujuan: Semua data portofolio yang tersebar di berbagai komponen dipindahkan ke satu file terpusat.

### Data yang Perlu Dipindahkan
Saat ini data tersebar di:
- `app/page.js` → `experiencesData`, `historyItems`, `techStackImages`, `roles`
- `components/ProjectsSection.jsx` → `projects` array
- `components/TechStackSection.jsx` → `techStack` array
- `components/ConnectSection.jsx` → `socialLinks` array

### Langkah
- [ ] **3.1** Buat file `data/portfolio.js` dengan struktur lengkap berikut:

```js
// data/portfolio.js
// SUMBER DATA TUNGGAL untuk seluruh proyek
// Dipakai sebagai seed/default untuk localStorage di admin panel

export const profile = {
  name: "Imam Mahmuda",
  email: "imammahmuda11@gmail.com",
  headline: "Web Developer & Software Engineer",
  about: "Saya adalah seorang Web Developer dengan semangat tinggi untuk menciptakan aplikasi web yang modern dan interaktif. Saya memiliki keahlian dalam tumpukan teknologi frontend dan backend, serta selalu antusias untuk mempelajari hal-hal baru di dunia teknologi.",
  photo: "/foto-profil.png",
  cvPath: "/cv-imam-mahmuda.pdf",
  roles: ["Web Developer", "Software Engineer", "Tech Enthusiast", "Open Source Contributor"],
};

export const education = [
  {
    id: 1,
    institution: "Politeknik Negeri Padang",
    period: "2022 - Sekarang",
    major: "Teknologi Rekayasa Perangkat Lunak",
    faculty: "Jurusan Teknologi Informasi",
    gpa: "3.23",
  },
  {
    id: 2,
    institution: "SMA Negeri 3 Padang",
    period: "2019 - 2022",
    major: "",
    faculty: "",
    gpa: "",
  },
];

export const experiences = [
  {
    id: 1,
    date: "Agustus 2025 - Sekarang",
    title: "Mahasiswa Intern",
    subtitle: "PT Inovindo Digital Media",
    description: "",
    type: "work", // "work" | "education" | "achievement"
  },
  {
    id: 2,
    date: "Februari - Juli 2024",
    title: "Berkontribusi dalam program PMM batch 4",
    subtitle: "Pertukaran Mahasiswa Merdeka Batch 4",
    description: "",
    type: "achievement",
  },
];

export const techStack = [
  { id: 1, name: "HTML", image: "/html-logo.png" },
  { id: 2, name: "Tailwind CSS", image: "/tailwind-logo.png" },
  { id: 3, name: "React", image: "/react-logo.png" },
  { id: 4, name: "PHP", image: "/php-logo.png" },
  { id: 5, name: "Laravel", image: "/laravel-logo.png" },
  { id: 6, name: "Figma", image: "/figma-logo.png" },
];

export const socialLinks = [
  {
    id: 1,
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/imam-mahmuda-73588b355",
    image: "/linkedin-logo.png",
  },
  {
    id: 2,
    name: "GitHub",
    href: "https://github.com/Imammahmuda1804",
    image: "/github-logo.png",
  },
  {
    id: 3,
    name: "Instagram",
    href: "https://www.instagram.com/iam__mad18/",
    image: "/instagram-logo.png",
  },
];

export const projects = [
  {
    id: 1,
    title: "Website Portofolio Pribadi",
    description: "Website yang sedang Anda lihat, dibangun dengan Next.js, Three.js, dan Framer Motion.",
    images: ["/proyek-1.png"],    // array — mendukung banyak foto (Fase 7)
    websiteUrl: "",               // isi jika ada link website live (Fase 6)
    githubUrl: "",
    techIcons: ["nextjs", "react", "tailwind"],
  },
  {
    id: 2,
    title: "Website Sidang TA",
    description: "Website untuk pengumpulan laporan pkl, pengajuan judul ta hingga bimbingan ta dan pendaftaran sidang ta. Dibangun menggunakan Laravel.",
    images: ["/proyek-2.png"],
    websiteUrl: "",
    githubUrl: "https://laravel.com/",
    techIcons: ["laravel"],
  },
  {
    id: 3,
    title: "Website KPR Rumah",
    description: "Website untuk pengajuan dan pembayaran kpr rumah. Dibangun menggunakan Laravel Filament sebagai admin panel dan Blade sebagai frontend, dilengkapi fitur payment gateway Midtrans.",
    images: ["/proyek-3.png"],
    websiteUrl: "",
    githubUrl: "https://github.com/Imammahmuda1804/kpr_rumah_Imam",
    techIcons: ["laravel", "filament"],
  },
  {
    id: 4,
    title: "Desain Cover Buku",
    description: "Desain cover buku menggunakan Figma.",
    images: ["/proyek-4.png"],
    websiteUrl: "https://www.figma.com/design/66ISX5JFZHpyM8wf4Yiw4A/Cover-buku?node-id=0-1&t=lq75qqLmTdMjSErC-1",
    githubUrl: "",
    techIcons: ["figma"],
  },
  {
    id: 5,
    title: "Desain Interface Aplikasi Toko Sembako",
    description: "Desain UI aplikasi toko sembako menggunakan Figma.",
    images: ["/proyek-5.png"],
    websiteUrl: "https://www.figma.com/design/XGR4zWtMazGfbY5SqWDVdD/Aplikasi-Toko-Sembako?node-id=88-2&t=LtmNKh7fVY84ohCb-1",
    githubUrl: "",
    techIcons: ["figma"],
  },
  {
    id: 6,
    title: "Cloning UI Aplikasi Mtix",
    description: "Meniru design UI aplikasi Mtix.",
    images: ["/proyek-6.png"],
    websiteUrl: "https://www.figma.com/design/3xYPvNzLsXIzJSacxvRZMV/Uts?node-id=0-1&t=XwhZSZ6wcMTpJwwC-1",
    githubUrl: "",
    techIcons: ["figma"],
  },
];

// Default data gabungan — dipakai sebagai seed untuk localStorage
export const defaultPortfolioData = {
  profile,
  education,
  experiences,
  techStack,
  socialLinks,
  projects,
};
```

- [ ] **3.2** Update `app/page.js`: import `profile`, `experiences`, `education`, `techStack` dari `data/portfolio.js`, hapus definisi data lokal
- [ ] **3.3** Update `components/ProjectsSection.jsx`: hapus array `projects` lokal, import dari `data/portfolio.js`
- [ ] **3.4** Update `components/TechStackSection.jsx`: hapus array `techStack` lokal, import dari `data/portfolio.js`
- [ ] **3.5** Update `components/ConnectSection.jsx`: hapus array `socialLinks` lokal, import dari `data/portfolio.js`

---

## ✅ FASE 4 — Perbarui Data Sesuai CV Terbaru

> Tujuan: Sinkronkan data di `data/portfolio.js` dengan isi CV `public/cv-imam-mahmuda.pdf`.

- [ ] **4.1** Baca CV (`public/cv-imam-mahmuda.pdf`) menggunakan tool yang tersedia
- [ ] **4.2** Bandingkan data CV dengan data yang sudah ada di `data/portfolio.js` (dari Fase 3)
- [ ] **4.3** Update `profile.about` jika ada deskripsi diri yang lebih akurat/terbaru di CV
- [ ] **4.4** Update `experiences` jika ada pengalaman baru atau data yang berbeda di CV
- [ ] **4.5** Update `education` jika ada data yang berbeda (IPK terbaru, dll.)
- [ ] **4.6** Update `techStack` jika ada teknologi baru di CV yang belum ada (misalnya Next.js belum ada logo-nya)
- [ ] **4.7** Update `projects` jika ada proyek baru di CV yang belum masuk ke daftar
- [ ] **4.8** Tambahkan logo Next.js ke `public/nextjs-logo.png` (sudah harus selesai di Fase 1.7 — konfirmasi ulang)

---

## ✅ FASE 5 — Halaman Admin CRUD (`/admin`)

> Tujuan: Buat halaman `/admin` untuk mengelola semua data portofolio. Data runtime tersimpan di `localStorage`, dengan `data/portfolio.js` sebagai seed/default.

### 5.1 — Buat Helper Store (`lib/portfolioStore.js`)
- [ ] **5.1.1** Buat file `lib/portfolioStore.js` dengan fungsi-fungsi berikut:
  ```js
  // lib/portfolioStore.js
  import { defaultPortfolioData } from "@/data/portfolio";
  const STORAGE_KEY = "portfolio_data";
  
  export function getPortfolioData() {
    if (typeof window === "undefined") return defaultPortfolioData;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultPortfolioData;
  }
  
  export function savePortfolioData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  export function resetToDefault() {
    localStorage.removeItem(STORAGE_KEY);
  }
  ```

- [ ] **5.1.2** Update **semua komponen public** yang menampilkan data agar membaca dari `getPortfolioData()` saat runtime (bukan hanya import statis dari `data/portfolio.js`):
  - `components/ProjectsSection.jsx`
  - `components/TechStackSection.jsx`
  - `components/ConnectSection.jsx`
  - `app/page.js` (untuk profile, experiences, education)

### 5.2 — Buat Struktur Halaman Admin
- [ ] **5.2.1** Buat `app/admin/layout.js` — layout khusus admin dengan:
  - Header bertuliskan "⚙️ Admin Panel"
  - Tombol "← Lihat Portfolio" (link ke `/`)
  - Tombol "🔄 Reset ke Default" (panggil `resetToDefault()` lalu reload)
  - Styling dark mode yang berbeda dari halaman utama agar jelas ini beda halaman

- [ ] **5.2.2** Buat `app/admin/page.js` — halaman utama admin dengan navigasi tab:
  - Tab: **Profil** | **Pengalaman** | **Proyek** | **Tech Stack** | **Sosial**
  - Setiap tab merender komponen editor yang sesuai
  - Simpan otomatis ke localStorage setiap kali ada perubahan (atau ada tombol "Simpan")

### 5.3 — Buat Komponen Editor
- [ ] **5.3.1** Buat `components/admin/ProfileEditor.jsx` — form edit:
  - Nama, email, headline, deskripsi (about), URL foto profil, URL CV, array roles
  
- [ ] **5.3.2** Buat `components/admin/ExperienceEditor.jsx` — CRUD pengalaman:
  - List semua pengalaman dengan tombol Edit dan Hapus per item
  - Form tambah pengalaman baru (date, title, subtitle, description, type)
  - Drag-to-reorder opsional

- [ ] **5.3.3** Buat `components/admin/ProjectEditor.jsx` — CRUD proyek:
  - List semua proyek dengan tombol Edit dan Hapus per item
  - Form tambah/edit proyek: title, description, **array images** (Fase 7), websiteUrl (Fase 6), githubUrl, techIcons
  - Preview card proyek saat mengisi form

- [ ] **5.3.4** Buat `components/admin/TechStackEditor.jsx` — CRUD tech stack:
  - List semua tech dengan tombol Edit dan Hapus
  - Form tambah tech baru: name, image URL
  - Preview logo saat URL dimasukkan

- [ ] **5.3.5** Buat `components/admin/SocialEditor.jsx` — CRUD link sosial:
  - List semua link sosial dengan tombol Edit dan Hapus
  - Form tambah link baru: name, href, image URL

### 5.4 — Akses ke Halaman Admin
- [ ] **5.4.1** Tambahkan link kecil di bagian bawah halaman utama (footer atau paling bawah ConnectSection) sebagai akses ke `/admin`. Buat tidak terlalu mencolok (misal: teks kecil abu-abu "Admin")

---

## ✅ FASE 6 — Fitur Proyek: Tombol "Kunjungi Web"

> Tujuan: Card proyek menampilkan tombol "🌐 Kunjungi Web" hanya jika field `websiteUrl` diisi.

- [ ] **6.1** Field `websiteUrl` sudah ada di skema data `data/portfolio.js` (dari Fase 3) — konfirmasi ada
- [ ] **6.2** Update `components/ProjectsSection.jsx`:
  - Tambah kondisi render: jika `project.websiteUrl && project.websiteUrl !== ""` → tampilkan tombol
  - Styling tombol: `bg-cyan-400 text-black font-semibold py-2 px-4 rounded-full hover:bg-cyan-300 transition-colors`
  - Tombol membuka URL di tab baru (`target="_blank" rel="noopener noreferrer"`)
  - Posisikan di bawah deskripsi, di samping ikon-ikon teknologi
- [ ] **6.3** Update `components/admin/ProjectEditor.jsx` (dari Fase 5.3.3):
  - Pastikan field input `Website URL` ada di form dan tersimpan dengan benar

---

## ✅ FASE 7 — Fitur Proyek: Multi-Foto dengan Preview

> Tujuan: Setiap proyek dapat memiliki banyak foto. Di admin: input URL foto berganda. Di halaman utama: ditampilkan sebagai mini-carousel dalam card proyek.

### 7.1 — Input di Admin
- [ ] **7.1.1** Field `images` di `data/portfolio.js` sudah berupa array (dari Fase 3) — konfirmasi ada
- [ ] **7.1.2** Update `components/admin/ProjectEditor.jsx`:
  - Ubah input foto dari satu field menjadi daftar field dinamis
  - Tombol "+ Tambah Foto" untuk menambah baris URL baru
  - Tombol "×" di setiap baris untuk hapus foto tersebut
  - Tampilkan preview thumbnail kecil di samping setiap URL yang diisi

### 7.2 — Tampilan di Halaman Utama
- [ ] **7.2.1** Buat komponen baru `components/ProjectImageCarousel.jsx`:
  - Props: `images: string[]`
  - Jika `images.length === 1`: tampilkan gambar biasa (tidak perlu carousel)
  - Jika `images.length > 1`: tampilkan gambar pertama dengan navigasi titik (dot) di bawah
  - Klik dot → ganti foto aktif
  - Animasi fade atau slide saat ganti foto
  
- [ ] **7.2.2** Update `components/ProjectsSection.jsx`:
  - Ganti `<img src={project.image}>` (singular) dengan `<ProjectImageCarousel images={project.images} />`

---

## ✅ FASE 8 — Verifikasi & Polish

- [ ] **8.1** Jalankan `npm run build` — pastikan tidak ada error TypeScript, lint, atau build error
- [ ] **8.2** Cek halaman utama di browser: hero, about, experience, portfolio tampil benar
- [ ] **8.3** Cek halaman `/admin` berfungsi: semua tab, form CRUD, simpan ke localStorage
- [ ] **8.4** Ubah data di admin, kembali ke halaman utama, reload — data harus berubah sesuai input admin
- [ ] **8.5** Klik "Reset ke Default" di admin — data kembali ke nilai awal dari `data/portfolio.js`
- [ ] **8.6** Cek responsive di mobile (< 768px): hero, about, portfolio, admin
- [ ] **8.7** Cek Navbar: smooth scroll berfungsi, active class berpindah saat scroll, brand name terisi (Fase 2.2.1)
- [ ] **8.8** Cek tidak ada 404 untuk semua aset gambar (foto profil, logo, proyek)
- [ ] **8.9** Cek tidak ada console error/warning di browser DevTools
- [ ] **8.10** Cek fitur "Kunjungi Web" muncul di card yang punya `websiteUrl`, tidak muncul di card yang kosong
- [ ] **8.11** Cek multi-foto: jika ada proyek dengan >1 foto, carousel berfungsi dengan dot indicator

---

## 📁 Target Struktur File Akhir

```
web-profile/
├── app/
│   ├── admin/
│   │   ├── layout.js              [BARU]
│   │   └── page.js                [BARU]
│   ├── globals.css                [MODIFIKASI - selaraskan font]
│   ├── layout.js                  [MODIFIKASI - hapus {}, lang=id, metadata]
│   └── page.js                    [MODIFIKASI - import dari data/portfolio.js]
├── components/
│   ├── admin/                     [BARU - folder]
│   │   ├── ProfileEditor.jsx
│   │   ├── ExperienceEditor.jsx
│   │   ├── ProjectEditor.jsx
│   │   ├── TechStackEditor.jsx
│   │   └── SocialEditor.jsx
│   ├── ProjectImageCarousel.jsx   [BARU]
│   ├── AnimatedContent.jsx        [TIDAK DIUBAH]
│   ├── AnimatedTitle.jsx          [TIDAK DIUBAH]
│   ├── Carousel.jsx               [MODIFIKASI - perbaiki Rules of Hooks]
│   ├── ConnectSection.jsx         [MODIFIKASI - import dari data/]
│   ├── ExperienceTimeline.jsx     [TIDAK DIUBAH]
│   ├── GlareHover.jsx             [TIDAK DIUBAH]
│   ├── Lanyard.jsx                [TIDAK DIUBAH]
│   ├── LanyardCanvas.jsx          [TIDAK DIUBAH]
│   ├── Magnet.jsx                 [TIDAK DIUBAH]
│   ├── Navbar.jsx                 [MODIFIKASI - isi brand name]
│   ├── PixelCard.jsx              [TIDAK DIUBAH]
│   ├── ProjectsSection.jsx        [MODIFIKASI - multi-foto + link web + import data]
│   ├── RotatingText.jsx           [TIDAK DIUBAH]
│   ├── SpotlightCard.jsx          [TIDAK DIUBAH]
│   ├── TechStackSection.jsx       [MODIFIKASI - import dari data/]
│   └── TiltedCard.jsx             [TIDAK DIUBAH]
├── data/
│   └── portfolio.js               [BARU - satu-satunya sumber data statis]
├── lib/
│   └── portfolioStore.js          [BARU - CRUD localStorage]
├── public/
│   ├── card.glb
│   ├── cv-imam-mahmuda.pdf
│   ├── foto-profil.png
│   ├── lanyard.png
│   ├── nextjs-logo.png            [PERLU DITAMBAHKAN - saat ini file tidak ada]
│   ├── rapier_wasm3d_bg.wasm
│   └── ... (aset lainnya)
├── PLAN.md                        [FILE INI]
├── next.config.mjs                [TIDAK DIUBAH - sudah benar]
└── package.json                   [TIDAK DIUBAH]
```

---

## 🗒️ Catatan Penting untuk Agent

1. **Urutan wajib berurutan**: Fase 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
2. **File duplikat** ada di `components/` yang bukan komponen React (card.glb, cv, lanyard.png, download.png) — hapus semua di Fase 1
3. **`RippleGrid1.jsx`** menggunakan library `ogl` (OGL renderer), bukan Three.js — ini terpisah dari `Lanyard.jsx`. Verifikasi penggunaannya sebelum menghapus
4. **`Carousel.jsx`** memiliki bug Rules of Hooks yang nyata (useTransform di dalam .map()) — **harus diperbaiki** di Fase 2
5. **Jangan ubah `Lanyard.jsx`** kecuali ada bug — kompleks dan sudah berfungsi baik
6. **Data di `localStorage`** dengan key `"portfolio_data"`. Format: JSON dari `defaultPortfolioData`
7. **Tidak ada autentikasi** di `/admin` — ini portfolio pribadi, tidak perlu login
8. **Foto proyek** tetap URL/path string (bukan file upload binary) — cocok untuk static site
9. **`next.config.mjs`** sudah dikonfigurasi dengan benar untuk `.glb` — tidak perlu diubah
10. **Navbar `react-scroll`** sudah berfungsi dengan baik untuk smooth scroll — jangan ganti ke implementasi lain
