"use client";
import { useState, useEffect, useMemo } from "react";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Magnet from "@/components/Magnet";
import AnimatedContent from "@/components/AnimatedContent";
import LanyardCanvas from "@/components/LanyardCanvas";
import RotatingText from "@/components/RotatingText";
import GlareHover from "@/components/GlareHover";
import Carousel from "@/components/Carousel";
import AnimatedTitle from "@/components/AnimatedTitle";
import { useInView } from "react-intersection-observer";
import { FaBriefcase } from "react-icons/fa6";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import ConnectSection from "@/components/ConnectSection";
import SmartImage from "@/components/SmartImage";
import { getPortfolioData } from "@/lib/portfolioStore";
import { defaultPortfolioData } from "@/data/portfolio";
import { useSite } from "@/context/SiteContext";
import { getLocalizedData } from "@/data/translations";

export default function Home() {
  const [data, setData] = useState(defaultPortfolioData);
  const { ref: heroRef, inView: isHeroVisible } = useInView({ threshold: 0.1 });
  const { lang, t } = useSite();

  useEffect(() => {
    getPortfolioData().then(setData);
  }, []);

  const localizedData = useMemo(() => getLocalizedData(data, lang), [data, lang]);
  const { profile, education, experiences, projects } = localizedData;

  const experiencesData = (experiences || []).map((exp) => ({
    date: exp.date,
    title: exp.title,
    subtitle: exp.subtitle,
    description: exp.description,
  }));

  const historyItems = (education || []).map((edu) => ({
    id: edu.id,
    icon: <FaBriefcase className="h-4 w-4 text-accent" />,
    title: edu.institution,
    description: edu.gpa
      ? `${edu.period}\n${edu.faculty ? edu.faculty + ", " : ""}${t.about.majorPrefix} ${edu.major} (${t.about.gpaPrefix} ${edu.gpa})`
      : edu.major
      ? `${edu.period}\n${t.about.deptPrefix} ${edu.major}`
      : edu.period,
  }));

  return (
    <main className="bg-background text-foreground transition-colors min-h-screen">
      <section
        id="home"
        ref={heroRef}
        className="h-screen w-full relative flex flex-col items-center justify-center text-foreground overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0">
          {isHeroVisible && <LanyardCanvas />}
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none select-none">
          <p className="text-sm md:text-lg text-accent font-semibold tracking-widest uppercase mb-2">
            {t.hero.greeting}
          </p>
          <AnimatedTitle
            text={profile.name}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 tracking-tight text-foreground drop-shadow-lg"
          />
          <div className="text-base sm:text-lg md:text-2xl text-muted h-8 flex items-center justify-center">
            <RotatingText
              texts={profile.roles}
              staggerDuration={0.02}
              rotationInterval={3000}
              mainClassName="justify-center"
            />
          </div>
        </div>
      </section>

      <section id="about" className="relative w-full bg-background text-foreground py-24 px-6 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="flex flex-col items-center justify-center gap-8">
              <AnimatedContent distance={100} delay={0}>
                <GlareHover
                  borderRadius="24px"
                  glareColor="var(--accent)"
                  borderColor="var(--accent)"
                  background="var(--card)"
                  width="min(300px, 85vw)"
                  height="min(400px, 115vw)"
                  className="shrink-0 shadow-2xl"
                >
                  <SmartImage
                    src={profile.photo}
                    alt={`Foto ${profile.name}`}
                    className="w-full h-full object-cover rounded-[24px]"
                  />
                </GlareHover>
              </AnimatedContent>
              <AnimatedContent distance={100} delay={0.2}>
                <div className="text-center max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">
                    {t.about.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted leading-relaxed">
                    {profile.about}
                  </p>
                </div>
              </AnimatedContent>
            </div>

            <div className="flex flex-col items-center justify-center gap-8">
              <AnimatedContent direction="horizontal" distance={100} delay={0.4}>
                <Carousel items={historyItems} baseWidth={320} />
              </AnimatedContent>

              <AnimatedContent distance={100} delay={0.6}>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Magnet padding={25} magnetStrength={4}>
                    <a
                      href={profile.cvPath}
                      download
                      className="inline-block bg-accent text-background font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg shadow-accent/20"
                    >
                      {t.about.cvButton}
                    </a>
                  </Magnet>
                  <Magnet padding={25} magnetStrength={4}>
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-block border-2 border-accent text-accent font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-accent/10 hover:scale-105"
                    >
                      {t.about.contactButton}
                    </a>
                  </Magnet>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      <div id="experience">
        <ExperienceTimeline experiences={experiencesData} />
      </div>
      <div id="portofolio">
        <ProjectsSection projects={projects} />
        <TechStackSection />
        <ConnectSection />
      </div>
    </main>
  );
}
