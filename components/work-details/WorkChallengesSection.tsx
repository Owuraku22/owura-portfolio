import React from "react";
import { FiShield, FiAlertOctagon, FiCheckSquare } from "react-icons/fi";

interface Challenge {
  title: string;
  description: string;
  solution: string;
}

const WorkChallengesSection = ({ challenges }: { challenges: Challenge[] }) => {
  return (
    <section id="challenges" className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
          <FiShield className="text-brand-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Challenges & Solutions</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {challenges.map((challenge, i) => (
            <div key={i} className="p-6 md:p-8">
              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-5">
                <span className="text-xs font-mono text-brand-500 bg-brand-faded px-2 py-0.5 rounded mr-3">
                  #{i + 1}
                </span>
                {challenge.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Problem block */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FiAlertOctagon className="text-amber-500 text-base shrink-0" />
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                      The Problem
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                {/* Solution block */}
                <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FiCheckSquare className="text-green-600 text-base shrink-0" />
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                      The Fix
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {challenge.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkChallengesSection;
