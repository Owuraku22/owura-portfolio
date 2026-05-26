import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface Problem {
  context: string;
  pain: string;
  stakes: string;
}

const WorkProblem = ({ problem }: { problem: Problem }) => {
  const blocks = [
    { label: "Context", text: problem.context },
    { label: "The Pain", text: problem.pain },
    { label: "Why It Mattered", text: problem.stakes },
  ];

  return (
    <section id="problem" className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border border-gray-200">
        <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
          <FiAlertTriangle className="text-brand-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">The Problem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {blocks.map(({ label, text }) => (
            <div key={label} className="p-6 md:p-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{label}</p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProblem;
