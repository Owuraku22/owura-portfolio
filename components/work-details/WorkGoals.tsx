import React from "react";
import { FiTarget, FiCheckCircle, FiSlash } from "react-icons/fi";

interface Goals {
  technical: string[];
  constraints: string[];
}

const WorkGoals = ({ goals }: { goals: Goals }) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
          <FiTarget className="text-brand-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Goals & Requirements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <FiCheckCircle className="text-green-500 text-base" />
              <p className="text-sm font-semibold text-gray-700">Technical Goals</p>
            </div>
            <ul className="space-y-3">
              {goals.technical.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <FiSlash className="text-amber-500 text-base" />
              <p className="text-sm font-semibold text-gray-700">Constraints</p>
            </div>
            <ul className="space-y-3">
              {goals.constraints.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
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

export default WorkGoals;
