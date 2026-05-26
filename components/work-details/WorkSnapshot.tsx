import React from "react";
import { FiUser, FiClock, FiMapPin, FiZap, FiLayers } from "react-icons/fi";

interface Snapshot {
  role: string;
  duration: string;
  stack: string[];
  context: string;
  outcome: string;
}

const WorkSnapshot = ({ snapshot }: { snapshot: Snapshot }) => {
  const fields = [
    { Icon: FiUser, label: "My Role", value: snapshot.role },
    { Icon: FiClock, label: "Duration", value: snapshot.duration },
    { Icon: FiMapPin, label: "Context", value: snapshot.context },
    { Icon: FiZap, label: "Outcome", value: snapshot.outcome },
  ];

  return (
    <section id="snapshot" className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
          <FiLayers className="text-brand-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Project Snapshot</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-gray-200">
          {fields.map(({ Icon, label, value }) => (
            <div key={label} className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="text-brand-500 text-sm" />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-900 leading-snug">{value}</p>
            </div>
          ))}
        </div>

        <div className="px-5 md:px-6 py-5 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Stack</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {snapshot.stack.map((tool) => (
              <span
                key={tool}
                className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:border-brand-400 hover:text-brand-500 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSnapshot;
