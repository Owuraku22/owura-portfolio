import React from "react";

interface WorkHeroProps {
  heroImage: string;
  title: string;
}

const WorkHero = ({ heroImage, title }: WorkHeroProps) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="rounded-t-4xl border border-gray-200 bg-white lg:h-[540px] h-[280px] overflow-hidden flex items-center justify-center p-4 md:p-8">
        <img
          src={heroImage}
          alt={`${title} architecture diagram`}
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default WorkHero;
