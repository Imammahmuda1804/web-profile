// data/portfolio.js
// SUMBER DATA TUNGGAL untuk seluruh proyek
// Dipakai sebagai seed/default untuk database Supabase dan fallback

export const profile = {
  name: "Imam Mahmuda",
  email: "imammahmuda11@gmail.com",
  headline: "Fullstack Web Developer & Software Engineer",
  about: "Software Engineer yang berfokus pada pengembangan aplikasi web modern, tangguh, dan skalabel. Berpengalaman membangun sistem end-to-end dengan ekosistem Laravel (PHP), Next.js, dan React, serta mengintegrasikan RESTful API, arsitektur database relasional, dan payment gateway. Berkomitmen pada clean code, keandalan sistem, dan pengalaman pengguna yang optimal.",
  photo: "/foto-profil.png",
  cvPath: "/cv-imam-mahmuda.pdf",
  roles: [
    "Fullstack Web Developer",
    "Software Engineer",
    "Laravel & Next.js Specialist",
    "Backend & API Engineer",
  ],
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
    major: "MIPA",
    faculty: "",
    gpa: "",
  },
];

export const experiences = [
  {
    id: 1,
    date: "Agustus 2025 - Sekarang",
    title: "Web Developer Intern",
    subtitle: "PT Inovindo Digital Media",
    description: "Mengembangkan modul aplikasi web klien berbasis Laravel & Tailwind CSS, mengintegrasikan RESTful API untuk pemrosesan data real-time, serta berkolaborasi dalam tim pengembang menggunakan Git version control.",
    type: "work",
  },
  {
    id: 2,
    date: "Februari - Juli 2024",
    title: "Awardee Pertukaran Mahasiswa Merdeka (PMM 4)",
    subtitle: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
    description: "Terpilih dalam program mobilitas mahasiswa nasional berbasis seleksi kompetitif; memperdalam kompetensi rekayasa perangkat lunak, kepemimpinan tim, serta adaptabilitas kerja lintas institusi.",
    type: "achievement",
  },
];

export const techStack = [
  { id: 1, name: "HTML", image: "/html-logo.png" },
  { id: 2, name: "Tailwind CSS", image: "/tailwind-logo.png" },
  { id: 3, name: "React", image: "/react-logo.png" },
  { id: 4, name: "PHP", image: "/php-logo.png" },
  { id: 5, name: "Laravel", image: "/laravel-logo.png" },
  { id: 6, name: "Next.js", image: "/nextjs-logo.svg" },
  { id: 7, name: "Figma", image: "/figma-logo.png" },
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
    title: "Platform Pengajuan & Pembayaran KPR Rumah",
    description: "Aplikasi manajemen kredit perumahan (KPR) end-to-end. Dilengkapi fitur kalkulator simulasi angsuran, manajemen approval berkas, back-office panel menggunakan Laravel Filament, serta otomasi pembayaran via Midtrans Snap & Webhook.",
    images: ["/proyek-3.png"],
    websiteUrl: "",
    githubUrl: "https://github.com/Imammahmuda1804/kpr_rumah_Imam",
    techIcons: ["laravel", "filament"],
  },
  {
    id: 2,
    title: "Sistem Informasi Bimbingan & Sidang Tugas Akhir",
    description: "Platform akademik terintegrasi untuk alur skripsi mahasiswa: mulai dari pengumpulan laporan PKL, pengajuan judul riset, logbook bimbingan berkala dengan dosen pembimbing, hingga pendaftaran dan penjadwalan sidang berbasis multi-role.",
    images: ["/proyek-2.png"],
    websiteUrl: "",
    githubUrl: "",
    techIcons: ["laravel", "tailwind"],
  },
  {
    id: 3,
    title: "Website Portofolio Interaktif 3D",
    description: "Portofolio modern berkinerja tinggi dengan simulasi fisik 3D ID Card interaktif berbasis Three.js/React Three Fiber. Dibangun menggunakan Next.js 14 App Router, integrasi cloud database Supabase PostgreSQL, dan panel CMS admin mandiri.",
    images: ["/proyek-1.png"],
    websiteUrl: "",
    githubUrl: "https://github.com/Imammahmuda1804",
    techIcons: ["nextjs", "react", "tailwind"],
  },
  {
    id: 4,
    title: "UI/UX Sistem Kasir & Inventaris Toko Sembako",
    description: "Riset dan perancangan antarmuka sistem kasir (Point of Sale) serta manajemen stok barang. Mengedepankan efisiensi transaksi cepat, kontras visual tinggi, dan kemudahan pengoperasian untuk pengguna non-teknis.",
    images: ["/proyek-5.png"],
    websiteUrl: "https://www.figma.com/design/XGR4zWtMazGfbY5SqWDVdD/Aplikasi-Toko-Sembako?node-id=88-2&t=LtmNKh7fVY84ohCb-1",
    githubUrl: "",
    techIcons: ["figma"],
  },
  {
    id: 5,
    title: "Studi Kasus Redesign UI Aplikasi Mtix",
    description: "Eksplorasi perancangan ulang antarmuka aplikasi pemesanan tiket bioskop Mtix. Berfokus pada standardisasi design token, penataan layout pemilihan kursi interaktif, dan optimalisasi alur checkout mobile-first.",
    images: ["/proyek-6.png"],
    websiteUrl: "https://www.figma.com/design/3xYPvNzLsXIzJSacxvRZMV/Uts?node-id=0-1&t=XwhZSZ6wcMTpJwwC-1",
    githubUrl: "",
    techIcons: ["figma"],
  },
  {
    id: 6,
    title: "Desain Tipografi & Layout Editorial Buku",
    description: "Perancangan desain sampul buku berbasis grid layout presisi, eksplorasi hierarki tipografi modern, dan penyelarasan palet warna untuk kebutuhan publikasi akademik.",
    images: ["/proyek-4.png"],
    websiteUrl: "https://www.figma.com/design/66ISX5JFZHpyM8wf4Yiw4A/Cover-buku?node-id=0-1&t=lq75qqLmTdMjSErC-1",
    githubUrl: "",
    techIcons: ["figma"],
  },
];

// Default data gabungan — dipakai sebagai seed/fallback
export const defaultPortfolioData = {
  profile,
  education,
  experiences,
  techStack,
  socialLinks,
  projects,
};
