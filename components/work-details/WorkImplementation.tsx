import React from "react";
import { FiCode, FiTerminal } from "react-icons/fi";

interface CodeSnippet {
  language: string;
  label: string;
  code: string;
}

interface ImplementationLayer {
  title: string;
  description: string;
  points: string[];
  snippets?: CodeSnippet[];
}

const WorkImplementation = ({ layers }: { layers: ImplementationLayer[] }) => {
  return (
    <section id="implementation" className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
          <FiCode className="text-brand-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Implementation Breakdown</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {layers.map((layer, i) => (
            <div key={i} className="p-6 md:p-8">
              {/* Layer header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="mt-0.5 text-xs font-mono font-bold text-brand-500 bg-brand-faded px-2 py-1 rounded-md shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{layer.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{layer.description}</p>
                </div>
              </div>

              {/* Points */}
              <ul className="space-y-2 mb-5 pl-9">
                {layer.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Code snippets */}
              {layer.snippets && layer.snippets.length > 0 && (
                <div className="space-y-4 pl-9">
                  {layer.snippets.map((snippet, k) => (
                    <div key={k} className="rounded-2xl overflow-hidden border border-gray-800">
                      {/* snippet header */}
                      <div className="flex items-center gap-2 bg-gray-900 px-4 py-2.5 border-b border-gray-700">
                        <FiTerminal className="text-gray-400 text-sm" />
                        <span className="text-xs font-mono text-gray-400">{snippet.label}</span>
                        <span className="ml-auto text-xs font-mono text-gray-600 uppercase">{snippet.language}</span>
                      </div>
                      <pre className="bg-gray-950 text-gray-100 overflow-x-auto p-4 text-xs md:text-sm font-mono leading-relaxed">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkImplementation;
