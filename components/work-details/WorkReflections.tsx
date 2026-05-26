import React from "react";
import { FiBookOpen, FiRotateCcw, FiStar } from "react-icons/fi";

interface Reflections {
  wouldDoDifferently: string[];
  keyTakeaways: string[];
}

const WorkReflections = ({ reflections }: { reflections: Reflections }) => {
  return (
    <section id="reflections" className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
          <FiBookOpen className="text-brand-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Reflections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <FiRotateCcw className="text-amber-500 text-base" />
              <p className="text-sm font-semibold text-gray-700">Would Do Differently</p>
            </div>
            <ul className="space-y-4">
              {reflections.wouldDoDifferently.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-xs font-mono font-bold text-amber-500 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <FiStar className="text-brand-500 text-base" />
              <p className="text-sm font-semibold text-gray-700">Key Takeaways</p>
            </div>
            <ul className="space-y-4">
              {reflections.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-xs font-mono font-bold text-brand-500 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkReflections;
