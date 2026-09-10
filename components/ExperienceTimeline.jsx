"use client";

import AnimatedContent from "./AnimatedContent";

const TimelineItem = ({ date, title, subtitle, description }) => {
  return (
    <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 md:gap-x-8">
      {/* Date & Subtitle column */}
      <div className="md:w-44 text-left md:text-right shrink-0">
        <p className="font-semibold text-cyan-400 text-sm md:text-base">{date}</p>
        <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
      </div>

      {/* Timeline line & dot */}
      <div className="relative hidden md:block w-px bg-gray-700">
        <div className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-gray-950 -left-[6px] top-1"></div>
      </div>

      {/* Content column */}
      <div className="grow pb-8 md:pb-12 border-l-2 border-gray-800 md:border-l-0 pl-4 md:pl-0">
        <h3 className="font-semibold text-white text-base md:text-lg leading-snug">{title}</h3>
        {description && (
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
};

const ExperienceTimeline = ({ experiences }) => {
  return (
    <section className="relative w-full bg-black text-white py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedContent>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Pengalaman Saya</h2>
        </AnimatedContent>
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            {experiences.map((exp, index) => (
              <AnimatedContent key={index} distance={50} delay={0.1 * index} direction="horizontal">
                <TimelineItem
                  date={exp.date}
                  title={exp.title}
                  subtitle={exp.subtitle}
                  description={exp.description}
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
