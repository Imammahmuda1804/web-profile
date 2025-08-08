"use client";

import AnimatedContent from "./AnimatedContent";
import SpotlightCard from "./SpotlightCard";
import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaLaravel,
  FaGithub,
} from "react-icons/fa6";
import { SiTailwindcss, SiNextdotjs, SiFilament } from "react-icons/si";

const projects = [
  {
    title: "Website Portofolio Pribadi",
    description:
      "Website yang sedang Anda lihat, dibangun dengan Next.js, Three.js, dan Framer Motion.",
    image: "/proyek-1.png",
    icons: [
      { icon: <FaGithub />, link: "https://laravel.com/" },
      { icon: <SiNextdotjs /> },
      { icon: <FaReact /> },
      { icon: <SiTailwindcss /> },
    ],
  },
  {
    title: "Website Sidang TA",
    description:
      "Website untuk pengumpulan laporan pkl,pengajuan judul ta hingga bimmbingan ta dan pendaftaran sidang ta.Website ini dibangun menggunakan laravel",
    image: "/proyek-2.png",
    icons: [
      { icon: <FaGithub />, link: "https://laravel.com/" },
      { icon: <FaLaravel /> },
    ],
  },
  {
    title: "Website KPR Rumah",
    description:
      "Website untuk pengajuan dan pembayaran kpr rumah, Website ini dibangun menggunakan laravel fillament sebagai admin panel dan blade sebagai frontend dilengkapi dengan fitur payment gateway menggunakan midtrans",
    image: "/proyek-3.png",
    icons: [
      {
        icon: <FaGithub />,
        link: "https://github.com/Imammahmuda1804/kpr_rumah_Imam",
      },
      { icon: <FaLaravel /> },
      { icon: <SiFilament /> },
    ],
  },
  {
    title: "Desain Cover Buku",
    description: "Desain cover buku menggunakan figma.",
    image: "/proyek-4.png",
    icons: [
      {
        icon: <FaFigma />,
        link: "https://www.figma.com/design/66ISX5JFZHpyM8wf4Yiw4A/Cover-buku?node-id=0-1&t=lq75qqLmTdMjSErC-1",
      },
    ],
  },
  {
    title: "Desain Interface Aplikasi Toko Sembako",
    description: "Desain ui aplikasi toko sembako menggunakan figma.",
    image: "/proyek-5.png",
    icons: [
      {
        icon: <FaFigma />,
        link: "https://www.figma.com/design/XGR4zWtMazGfbY5SqWDVdD/Aplikasi-Toko-Sembako?node-id=88-2&t=LtmNKh7fVY84ohCb-1",
      },
    ],
  },
  {
    title: "Cloning UI Aplikasi Mtix",
    description: "Meniru design ui aplikasi mtix.",
    image: "/proyek-6.png",
    icons: [
      {
        icon: <FaFigma />,
        link: "https://www.figma.com/design/3xYPvNzLsXIzJSacxvRZMV/Uts?node-id=0-1&t=XwhZSZ6wcMTpJwwC-1",
      },
    ],
  },
];

const ProjectsSection = () => {
  return (
    <section className="relative w-full bg-black text-white py-24 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedContent>
          <h2 className="text-4xl font-bold mb-16">Proyek Saya</h2>
        </AnimatedContent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedContent key={index} distance={100} delay={0.2 * index}>
              <SpotlightCard className="h-full">
                <div className="flex flex-col h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <div className="flex flex-col flex-grow text-left p-2">
                    <h3 className="text-xl font-bold mb-2 text-cyan-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-x-4 mt-4">
                      {project.icons &&
                        project.icons.map((item, i) =>
                          item.link ? (
                            <a
                              key={i}
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-2xl text-gray-500 hover:text-cyan-400 transition-colors"
                              aria-label={`Link ke ${item.link}`}
                            >
                              {item.icon}
                            </a>
                          ) : (
                            <span key={i} className="text-2xl text-gray-500">
                              {item.icon}
                            </span>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
