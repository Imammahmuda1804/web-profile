"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import AnimatedContent from "./AnimatedContent";
import SpotlightCard from "./SpotlightCard";
import SmartImage from "./SmartImage";
import {
  FaReact,
  FaFigma,
  FaLaravel,
  FaGithub,
} from "react-icons/fa6";
import { SiTailwindcss, SiNextdotjs, SiFilament } from "react-icons/si";
import { getPortfolioData } from "@/lib/portfolioStore";
import { projects as defaultProjects } from "@/data/portfolio";

// ponytail: icon map — add entries when new techIcons appear in data
const ICON_MAP = {
  react: FaReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  laravel: FaLaravel,
  figma: FaFigma,
  filament: SiFilament,
};

function ImageModal({ images, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const closeBtnRef = useRef(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Preview foto proyek"
    >
      <div
        className="relative max-w-4xl w-full mx-auto flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Tutup preview foto"
          className="absolute -top-12 right-0 text-white text-3xl hover:text-cyan-400 transition-colors z-10 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
        >
          ✕
        </button>

        {/* Image */}
        <div className="w-full flex justify-center items-center">
          <SmartImage
            src={images[current]}
            alt={`Preview foto ke-${current + 1}`}
            className="w-full max-h-[75vh] object-contain rounded-xl"
          />
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Foto sebelumnya"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-cyan-900/60 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Foto selanjutnya"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-cyan-900/60 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              ›
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4" role="tablist" aria-label="Pilih foto">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Lihat foto ${i + 1}`}
                aria-selected={i === current}
                role="tab"
                className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  i === current ? "bg-cyan-400 scale-125" : "bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <p className="text-center text-gray-300 text-sm mt-2 font-medium">
          {current + 1} / {images.length}
        </p>
      </div>
    </div>,
    document.body
  );
}

function ProjectImages({ images, projectTitle }) {
  const [modal, setModal] = useState(null);
  if (!images || images.length === 0) return null;

  return (
    <>
      <button
        type="button"
        className="relative mb-4 cursor-pointer group w-full text-left rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400"
        onClick={() => setModal(0)}
        aria-label={`Buka preview foto untuk ${projectTitle}`}
      >
        <SmartImage
          src={images[0]}
          alt={`Foto proyek ${projectTitle}`}
          className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium border border-white/10">
            +{images.length - 1} foto
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-colors" />
      </button>
      {modal !== null && (
        <ImageModal images={images} initialIndex={modal} onClose={() => setModal(null)} />
      )}
    </>
  );
}

const ProjectsSection = () => {
  const [projectsList, setProjectsList] = useState(defaultProjects);
  useEffect(() => {
    getPortfolioData().then((d) => setProjectsList(d.projects));
  }, []);

  return (
    <section className="relative w-full bg-black text-white py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedContent>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Proyek Saya</h2>
        </AnimatedContent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <AnimatedContent key={project.id || index} distance={100} delay={0.2 * index}>
              <SpotlightCard className="h-full">
                <div className="flex flex-col h-full">
                  <ProjectImages images={project.images} projectTitle={project.title} />
                  <div className="flex flex-col grow text-left p-2">
                    <h3 className="text-xl font-bold mb-2 text-cyan-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed grow">
                      {project.description}
                    </p>

                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 bg-cyan-400 text-black font-semibold py-2 px-4 rounded-full hover:bg-cyan-300 transition-colors text-center text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                      >
                        Kunjungi Web
                      </a>
                    )}

                    <div className="flex items-center gap-x-4 mt-4 pt-2 border-t border-gray-800">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-2xl text-gray-400 hover:text-cyan-400 transition-colors focus:outline-none focus:text-cyan-400"
                          aria-label={`GitHub source code untuk ${project.title}`}
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.techIcons &&
                        project.techIcons.map((iconKey, i) => {
                          const Icon = ICON_MAP[iconKey];
                          return Icon ? (
                            <span key={i} className="text-2xl text-gray-400" title={iconKey} aria-hidden="true">
                              <Icon />
                            </span>
                          ) : null;
                        })}
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
