import { Icons } from "@/components/Icons";
import Link from "next/link";
import React from "react";

interface NextProject {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
}

const WorkNextProject: React.FC<{ nextProject: NextProject | null }> = ({ nextProject }) => {
  if (!nextProject) return null;

  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 pb-16">
      <Link href={`/${nextProject.id}`}>
        <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden h-[500px] md:h-[600px] flex flex-col hover:border-brand-400 transition-all duration-300 cursor-pointer group">
          <div className="p-6 sm:p-8 shrink-0">
            <div className="flex items-center gap-4">
              <button className="w-14 h-12 sm:w-18 sm:h-16 bg-brand-400/20 rounded-full border border-brand-400 flex items-center justify-center group-hover:bg-brand-100/30 transition-transform duration-300 group-hover:translate-x-2">
                <Icons.MoveLeftIcon className="text-center text-brand-400 -rotate-180" />
              </button>
              <div>
                <p className="text-base font-medium text-gray-400 mb-1">Next Project</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {nextProject.title}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">{nextProject.category}</p>
              </div>
            </div>
          </div>

          <div className="w-full relative flex-1 bg-white">
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-8">
              <img
                src={nextProject.thumbnail}
                alt={nextProject.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default WorkNextProject;
