"use client";

import AnimatedContent from "./AnimatedContent";

const TimelineItem = ({ date, title, subtitle }) => {
  return (
    <div className="flex gap-x-4 md:gap-x-8">
      <div className="w-40 text-right flex-shrink-0">
        <p className="font-semibold text-gray-300">{date}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className="relative w-px bg-gray-700">
        <div className="absolute w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-gray-900 -left-[7.5px] top-0"></div>
      </div>
      <div className="flex-grow pb-12">
        <h3 className="font-semibold text-white text-lg">{title}</h3>
      </div>
    </div>
  );
};

const ExperienceTimeline = ({ experiences }) => {
  return (
    <section className="relative w-full bg-black text-white py-24 px-8">
      <div className="max-w-4xl mx-auto"> 
        <AnimatedContent>
          <h2 className="text-4xl font-bold text-center mb-16">Pengalaman Saya</h2>
        </AnimatedContent>
        <div className="flex items-center justify-center">
          <div className="relative">
            {experiences.map((exp, index) => (
              <AnimatedContent key={index} distance={50} delay={0.1 * index} direction="horizontal">
                <TimelineItem 
                  date={exp.date}
                  title={exp.title}
                  subtitle={exp.subtitle}
                />
              </AnimatedContent>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;