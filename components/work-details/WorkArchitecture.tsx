import React from "react";
import { FiGrid, FiCpu, FiMessageSquare } from "react-icons/fi";

interface ArchComponent {
  name: string;
  purpose: string;
}

interface ArchDecision {
  decision: string;
  rationale: string;
}

interface Architecture {
  diagram: string;
  overview: string;
  components: ArchComponent[];
  decisions: ArchDecision[];
}

const WorkArchitecture = ({ architecture }: { architecture: Architecture }) => {
  return (
    <section id="architecture" className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="space-y-5">
        {/* Header + overview */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
            <FiGrid className="text-brand-500 text-xl" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Architecture Design</h2>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">{architecture.overview}</p>
          </div>
        </div>

        {/* Diagram — full width, scrollable on small screens */}
        <div className="rounded-3xl border border-gray-200 overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <img
              src={architecture.diagram}
              alt="Architecture Diagram"
              className="w-full h-auto min-w-[640px]"
            />
          </div>
          <p className="text-xs text-gray-400 text-center py-3 border-t border-gray-100">
            Scroll horizontally on smaller screens to view full diagram
          </p>
        </div>

        {/* Components */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
            <FiCpu className="text-brand-500 text-xl" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Component Breakdown</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {architecture.components.map(({ name, purpose }) => (
              <div key={name} className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 px-6 py-4">
                <p className="text-sm font-semibold text-gray-900 md:col-span-1">{name}</p>
                <p className="text-sm text-gray-600 leading-relaxed md:col-span-2">{purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Decisions */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
            <FiMessageSquare className="text-brand-500 text-xl" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Key Design Decisions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {architecture.decisions.map(({ decision, rationale }) => (
              <div key={decision} className="p-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  <span className="text-brand-500 mr-2">→</span>
                  {decision}
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-4">{rationale}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkArchitecture;
