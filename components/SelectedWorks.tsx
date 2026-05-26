import Image from "next/image";
import { PiCaretDoubleRight } from "react-icons/pi";
import SectionHeader from "./SectionHeader";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { works } from "@/lib/works-data";

const WorkCard = ({ work, index }: { work: typeof works[0]; index: number }) => {
  const isEven = index % 2 === 0;
  const year = work.snapshot.duration.match(/\d{4}/)?.[0] ?? "";

  return (
    <div
      className={`flex border border-gray-400 rounded-[18px] lg:rounded-3xl flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-6 lg:gap-8 items-stretch mb-8 lg:mb-12`}
    >
      {/* Image */}
      <Link href={`/${work.id}`} className="w-full lg:w-[65%] relative group">
        <div className="rounded-[18px] lg:rounded-3xl p-2 md:p-4 overflow-hidden aspect-4/5 lg:aspect-8/6 bg-white flex items-center justify-center">
          <img
            src={work.thumbnail}
            alt={work.title}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div
        className={`w-full lg:w-[35%] flex flex-col justify-between ${
          isEven ? "lg:border-l" : "lg:border-r"
        } border-gray-400`}
      >
        <div>
          <div className="flex items-center border-b max-md:border-t border-gray-400 gap-2 p-5 mb-4">
            <Image
              src="/images/SVG-icons/work-title.svg"
              alt="Category Icon"
              width={28}
              height={28}
            />
            <span className="text-gray-900 text-xl font-semibold">{work.title}</span>
          </div>
          <p className="text-xl text-gray-600 lg:text-lg py-3 px-5 lg:p-5 leading-relaxed mb-6">
            {work.description}
          </p>
        </div>

        <div className="flex items-center border-t border-gray-400 py-3 px-4 w-full justify-between">
          <div className="flex items-center max-w-[70%] gap-3">
            <span className="text-gray-600 max-w-[50%] lg:max-w-40 truncate text-xl">
              {work.category}
            </span>
            <span className="w-2 h-2 bg-[#FF8C42] rounded-full" />
            <span className="text-gray-600 text-xl">{year}</span>
          </div>
          <Link
            href={`/${work.id}`}
            className="bg-brand-faded hover:bg-brand-500 transition-colors border cursor-pointer border-black text-black flex justify-center w-20 rounded-full p-4 group"
            aria-label={`View ${work.title} case study`}
          >
            <PiCaretDoubleRight className="text-2xl group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const SelectedWorks = () => {
  return (
    <section id="works" className="w-full py-16 lg:py-24 px-4 lg:px-8 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          title="Selected Works"
          description="Backend systems and products I've built — APIs, payments, and scalable platforms."
        />

        <div className="space-y-0 relative">
          {works.map((work, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={work.id}>
                {isEven && index === 0 && (
                  <div
                    className="absolute -top-10 md:-right-22 -right-12 size-18 md:size-24 bg-no-repeat"
                    style={{ backgroundImage: `url('/images/SVG-icons/union.svg')` }}
                  />
                )}
                <ScrollReveal variant="fade-up" delay={index * 150}>
                  <WorkCard work={work} index={index} />
                </ScrollReveal>
                {isEven && index === 0 && (
                  <div
                    className="absolute -bottom-10 md:-left-22 -left-16 md:size-24 size-16 -rotate-180 bg-no-repeat"
                    style={{ backgroundImage: `url('/images/SVG-icons/union.svg')` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
