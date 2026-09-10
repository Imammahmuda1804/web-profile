"use client";

import { useState, useEffect } from "react";
import AnimatedContent from "./AnimatedContent";
import PixelCard from "./PixelCard";
import { getPortfolioData } from "@/lib/portfolioStore";
import { techStack as defaultStack } from "@/data/portfolio";

const TechStackSection = () => {
  const [stack, setStack] = useState(defaultStack);
  useEffect(() => {
    getPortfolioData().then((d) => setStack(d.techStack));
  }, []);
  return (
    <section className="relative w-full bg-black text-white py-24 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedContent>
          <h2 className="text-4xl font-bold mb-16">Saya Berpengalaman Dengan Techstack</h2>
        </AnimatedContent>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {stack.map((tech, index) => (
            <AnimatedContent
              key={tech.id || index}
              distance={100}
              delay={0.1 * index}
            >
              <PixelCard variant="blue">
                <div className="absolute inset-0 grid place-items-center">
                  <img
                    src={tech.image}
                    alt={tech.name || "Tech Logo"}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </PixelCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;