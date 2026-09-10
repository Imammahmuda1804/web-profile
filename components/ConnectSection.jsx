"use client";

import { useState, useEffect } from "react";
import AnimatedContent from "./AnimatedContent";
import TiltedCard from "./TiltedCard";
import { getPortfolioData } from "@/lib/portfolioStore";
import { socialLinks as defaultLinks } from "@/data/portfolio";

const ConnectSection = () => {
  const [links, setLinks] = useState(defaultLinks);

  useEffect(() => {
    getPortfolioData().then((d) => {
      if (d?.socialLinks && d.socialLinks.length > 0) {
        setLinks(d.socialLinks);
      }
    });
  }, []);

  return (
    <section id="connect" className="relative w-full bg-black text-white py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedContent>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-base md:text-lg text-gray-300 mb-16">Temukan saya di platform berikut.</p>
        </AnimatedContent>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {links.map((social, index) => (
            <AnimatedContent
              key={social.id || index}
              distance={60}
              delay={0.15 * index}
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Hubungi via ${social.name}`}
                className="inline-block rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <TiltedCard
                  imageSrc={social.image}
                  altText={social.name}
                  captionText={social.name}
                  containerHeight="150px"
                  containerWidth="150px"
                  imageHeight="80px"
                  imageWidth="80px"
                  showMobileWarning={false}
                />
              </a>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
