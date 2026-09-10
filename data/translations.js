// data/translations.js
// ponytail: single translation dictionary + fallback for dynamic portfolio items

export const translations = {
  id: {
    nav: {
      home: "beranda",
      about: "tentang",
      experience: "pengalaman",
      portfolio: "portofolio",
    },
    hero: {
      greeting: "Halo, Saya",
    },
    about: {
      title: "Tentang Saya",
      cvButton: "Download CV",
      contactButton: "Hubungi Saya",
      majorPrefix: "Program Studi",
      deptPrefix: "Jurusan",
      gpaPrefix: "IPK",
    },
    experience: {
      title: "Pengalaman Saya",
    },
    projects: {
      title: "Proyek Saya",
      visitWeb: "Kunjungi Web",
      photoBadge: "foto",
    },
    tech: {
      title: "Saya Berpengalaman Dengan Techstack",
    },
    connect: {
      title: "Let's Connect",
      subtitle: "Temukan saya di platform berikut.",
      ariaLabel: "Hubungi via",
    },
    modal: {
      dialogTitle: "Preview foto proyek",
      close: "Tutup preview foto",
      prev: "Foto sebelumnya",
      next: "Foto selanjutnya",
      dotsAria: "Pilih foto",
      previewNumber: "Preview foto ke-",
    },
    themeToggle: {
      toLight: "Beralih ke mode terang",
      toDark: "Beralih ke mode gelap",
    },
    langToggle: {
      aria: "Ganti bahasa (ID / EN)",
    },
  },
  en: {
    nav: {
      home: "home",
      about: "about",
      experience: "experience",
      portfolio: "portfolio",
    },
    hero: {
      greeting: "Hello, I am",
    },
    about: {
      title: "About Me",
      cvButton: "Download CV",
      contactButton: "Contact Me",
      majorPrefix: "Study Program",
      deptPrefix: "Department of",
      gpaPrefix: "GPA",
    },
    experience: {
      title: "My Experience",
    },
    projects: {
      title: "My Projects",
      visitWeb: "Visit Website",
      photoBadge: "photos",
    },
    tech: {
      title: "Technologies I Work With",
    },
    connect: {
      title: "Let's Connect",
      subtitle: "Find me on the following platforms.",
      ariaLabel: "Connect via",
    },
    modal: {
      dialogTitle: "Project photo preview",
      close: "Close photo preview",
      prev: "Previous photo",
      next: "Next photo",
      dotsAria: "Select photo",
      previewNumber: "Photo preview #",
    },
    themeToggle: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    langToggle: {
      aria: "Switch language (ID / EN)",
    },
    portfolioFallback: {
      profile: {
        about:
          "Software Engineer focused on building modern, robust, and scalable web applications. Experienced in developing end-to-end systems with the Laravel (PHP), Next.js, and React ecosystems, integrating RESTful APIs, relational database architectures, and payment gateways. Committed to clean code, system reliability, and optimal user experience.",
        roles: [
          "Fullstack Web Developer",
          "Software Engineer",
          "Laravel & Next.js Specialist",
          "Backend & API Engineer",
        ],
      },
      education: {
        1: {
          period: "2022 - Present",
          major: "Software Engineering Technology",
          faculty: "Information Technology Department",
        },
        2: {
          period: "2019 - 2022",
          major: "Natural Sciences (MIPA)",
          faculty: "",
        },
      },
      experiences: {
        1: {
          date: "August 2025 - Present",
          title: "Web Developer Intern",
          description:
            "Developing client web application modules using Laravel & Tailwind CSS, integrating RESTful APIs for real-time data processing, and collaborating in a developer team via Git version control.",
        },
        2: {
          date: "February - July 2024",
          title: "Indonesian Student Mobility Awardee (PMM 4)",
          description:
            "Selected for a competitive national student mobility program; expanded software engineering skills, team leadership, and cross-institutional adaptability.",
        },
      },
      projects: {
        1: {
          title: "Housing Mortgage (KPR) Application & Payment Platform",
          description:
            "End-to-end housing mortgage management application. Features installment simulation calculator, document approval workflow, back-office panel with Laravel Filament, and automated payments via Midtrans Snap & Webhook.",
        },
        2: {
          title: "Academic Thesis Advising & Defense Management System",
          description:
            "Integrated academic platform for student thesis workflows: internship report submissions, research proposal topics, periodic advising logbooks, and multi-role defense scheduling.",
        },
        3: {
          title: "Interactive 3D Portfolio Website",
          description:
            "High-performance modern portfolio featuring an interactive 3D physics ID Card simulation built with Three.js/React Three Fiber. Built using Next.js 14 App Router, Supabase PostgreSQL, and custom CMS.",
        },
        4: {
          title: "Grocery Store Cashier & Inventory UI/UX System",
          description:
            "Research and UI design for a Point of Sale and inventory system. Emphasizes fast transaction speed, high visual contrast, and ease of use for non-technical users.",
        },
        5: {
          title: "Mtix Cinema App UI Redesign Case Study",
          description:
            "Exploration of redesigning the Mtix cinema booking interface. Focused on design token standardization, interactive seat selection layout, and mobile-first checkout flow optimization.",
        },
        6: {
          title: "Book Editorial Typography & Layout Design",
          description:
            "Book cover design using precision grid layout, modern typography hierarchy, and tailored color palette for academic publication.",
        },
      },
    },
  },
};

/**
 * Maps portfolio data to the active language with graceful fallback to Indonesian.
 */
export function getLocalizedData(data, lang) {
  if (!data || lang !== "en") return data;
  const en = translations.en.portfolioFallback;

  return {
    ...data,
    profile: {
      ...data.profile,
      about: data.profile?.about_en || en.profile?.about || data.profile?.about,
      roles: data.profile?.roles_en || en.profile?.roles || data.profile?.roles,
    },
    education: (data.education || []).map((edu) => {
      const fb = en.education?.[edu.id] || {};
      return {
        ...edu,
        period: edu.period_en || fb.period || edu.period,
        major: edu.major_en || fb.major || edu.major,
        faculty: edu.faculty_en || fb.faculty || edu.faculty,
      };
    }),
    experiences: (data.experiences || []).map((exp) => {
      const fb = en.experiences?.[exp.id] || {};
      return {
        ...exp,
        date: exp.date_en || fb.date || exp.date,
        title: exp.title_en || fb.title || exp.title,
        subtitle: exp.subtitle_en || fb.subtitle || exp.subtitle,
        description: exp.description_en || fb.description || exp.description,
      };
    }),
    projects: (data.projects || []).map((p) => {
      const fb = en.projects?.[p.id] || {};
      return {
        ...p,
        title: p.title_en || fb.title || p.title,
        description: p.description_en || fb.description || p.description,
      };
    }),
  };
}
