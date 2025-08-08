"use client";

import AnimatedContent from "./AnimatedContent";
import TiltedCard from "./TiltedCard";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/imam-mahmuda-73588b355", 
    imageSrc: "/linkedin-logo.png", 
    altText: "LinkedIn Profile",
    captionText: "LinkedIn"
  },
  {
    href: "https://github.com/Imammahmuda1804", 
    imageSrc: "/github-logo.png",
    altText: "GitHub Profile",
    captionText: "GitHub"
  },
  {
    href: "https://www.instagram.com/iam__mad18/",
    imageSrc: "/instagram-logo.png",
    altText: "Instagram Profile",
    captionText: "Instagram"
  },
];

const ConnectSection = () => {
  return (
    <section className="relative w-full bg-black text-white py-24 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedContent>
          <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-lg text-gray-400 mb-16">Temukan saya di platform berikut.</p>
        </AnimatedContent>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {socialLinks.map((social, index) => (
            <AnimatedContent 
              key={index}
              distance={100} 
              delay={0.2 * index}
            >
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                <TiltedCard
                  imageSrc={social.imageSrc}
                  altText={social.altText}
                  captionText={social.captionText}
                  containerHeight="150px"
                  containerWidth="150px"
                  imageHeight="80px"
                  imageWidth="80px"
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