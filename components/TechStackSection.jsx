"use client";

import AnimatedContent from "./AnimatedContent";
import PixelCard from "./PixelCard";
const techStack = [
  { image: "/html-logo.png", variant: "blue" },
  { image: "/tailwind-logo.png", variant: "blue" },
  { image: "/react-logo.png", variant: "blue" },
  { image: "/php-logo.png", variant: "blue" },
  { image: "/laravel-logo.png", variant: "blue" },
  { image: "/figma-logo.png", variant: "blur" },
];

const TechStackSection = () => {
  return (
    <section className="relative w-full bg-black text-white py-24 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedContent>
          <h2 className="text-4xl font-bold mb-16">Saya Berpengalaman Dengan Techstack</h2>
        </AnimatedContent>
        
        <div className="flex flex-wrap items-center justify-center gap-8">
          {techStack.map((tech, index) => (
            <AnimatedContent 
              key={index}
              distance={100} 
              delay={0.1 * index}
            >
              <PixelCard variant={tech.variant}>
                <div className="absolute inset-0 grid place-items-center">
                  <img 
                    src={tech.image} 
                    alt="Tech Logo" 
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