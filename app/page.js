"use client";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Magnet from "@/components/Magnet";
import AnimatedContent from "@/components/AnimatedContent";
import LanyardCanvas from "@/components/LanyardCanvas";
import RotatingText from "@/components/RotatingText";
import GlareHover from "@/components/GlareHover";
import Carousel from "@/components/Carousel";
import AnimatedTitle from "@/components/AnimatedTitle";
import { useInView } from "react-intersection-observer";
import { FaSchool, FaBriefcase } from "react-icons/fa6";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import ConnectSection from "@/components/ConnectSection";
const experiencesData = [
  { date: "Agustus 2025 - Sekarang", title: "Mahasiswa Intern", subtitle: "Pt Inovindo Digital Media" },
  { date: "Februari - Juli 2024", title: "Berkontribusi dalam program pemerintah,PMM batch 4", subtitle: "Pertukaran Mahasiswa Merdeka Batch 4" },
 
];
const techStackImages = [
  "/react-logo.png",
  "/nextjs-logo.png",
  "/tailwind-logo.png",
  "/figma-logo.png",
  "/laravel-logo.png",
];
const roles = [
  "Web Developer",
  "Software Engineer",
  "Tech Enthusiast",
  "Open Source Contributor",
];

const historyItems = [
  {
    id: 1,
    icon: <FaBriefcase className="h-[16px] w-[16px] text-white" />,
    title: "Politeknik Negeri Padang",
    description:
      "2022 - Sekarang" + "\nJurusan Teknologi Informasi, Program Studi Teknologi Rekayasa Perangkat Lunak (Ipk 3.23)"
  },
  {
    id: 2,
    icon: <FaBriefcase className="h-[16px] w-[16px] text-white" />,
    title: "SMA Negeri 3 Padang",
    description:
      "2019 - 2022",
  },
];

export default function Home() {
  const { ref: heroRef, inView: isHeroVisible } = useInView({
    threshold: 0.1,
  });

  return (
    <main className="bg-black">
      <section
        id="home"
        ref={heroRef}
        className="h-screen w-full relative flex flex-col items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0">
          {isHeroVisible && <LanyardCanvas />}
        </div>
        <div className="relative z-10 text-center p-4">
          <AnimatedTitle
            text="Halo, Saya Imam Mahmuda"
            className="text-4xl md:text-6xl font-bold mb-4"
          />
          <div className="text-lg md:text-xl text-gray-300 h-8">
            <RotatingText
              texts={roles}
              staggerDuration={0.02}
              rotationInterval={3000}
            />
          </div>
        </div>
      </section>

      <section id="about" className="relative w-full bg-black text-white py-24 px-8 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

      <div className="flex flex-col items-center justify-center gap-8">
        <AnimatedContent distance={100} delay={0}>
          <GlareHover
            borderRadius="24px"
            glareColor="#00ffff"
            borderColor="#00ffff"
            width="300px"
            height="400px"
            className="flex-shrink-0 shadow-2xl"
          >
            <img
              src="/foto-profil.jpg"
              alt="Foto Imam Mahmuda"
              className="w-full h-full object-cover rounded-[24px]"
            />
          </GlareHover>
        </AnimatedContent>
        <AnimatedContent distance={100} delay={0.2}>
          <div className="text-center max-w-lg">
            <h2 className="text-4xl font-bold mb-6 text-cyan-400">
              Tentang Saya
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Saya adalah seorang Web Developer dengan semangat tinggi
              untuk menciptakan aplikasi web yang modern dan interaktif.
              Saya memiliki keahlian dalam tumpukan teknologi frontend dan
              backend, serta selalu antusias untuk mempelajari hal-hal
              baru di dunia teknologi.
            </p>
          </div>
        </AnimatedContent>
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <AnimatedContent direction="horizontal" distance={100} delay={0.4}>
            <Carousel items={historyItems} baseWidth={320} />
        </AnimatedContent>

        <AnimatedContent distance={100} delay={0.6}>
            <Magnet padding={30} magnetStrength={5}>
              <a
                href="/cv-imam-mahmuda.pdf"
                download
                className="inline-block bg-cyan-400 text-black font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105"
              >
                Download CV
              </a>
            </Magnet>
        </AnimatedContent>
      </div>
      
    </div>
  </div>
</section>
      <div id="experience">
      <ExperienceTimeline experiences={experiencesData} />
      </div>
      <div id="portofolio">
      <ProjectsSection />
      <TechStackSection />
      <ConnectSection />
      </div>
    </main>
  );
}
