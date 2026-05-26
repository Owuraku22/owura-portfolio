import React from "react";
import { FiTrendingUp, FiArrowRight } from "react-icons/fi";

interface ImpactMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface ImpactProps {
  summary: string;
  metrics: ImpactMetric[];
  businessOutcome: string;
}

const WorkImpactResults = ({ impact }: { impact: ImpactProps }) => {
  return (
    <section id="impact" className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-gray-200 py-4 px-5">
          <FiTrendingUp className="text-brand-500 text-xl" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Results & Impact</h2>
        </div>

        {/* Summary */}
        <div className="px-6 md:px-8 py-6 border-b border-gray-200">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">{impact.summary}</p>
        </div>

        {/* Before / After metrics */}
        <div className="px-6 md:px-8 py-6 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Before → After</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {impact.metrics.map((m) => (
              <div
                key={m.metric}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {m.metric}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-500 line-through">
                    {m.before}
                  </span>
                  <FiArrowRight className="text-gray-300 shrink-0" />
                  <span className="text-sm font-bold text-gray-900">{m.after}</span>
                </div>
                <span className="mt-2 inline-block text-xs font-semibold text-brand-500 bg-brand-faded px-2.5 py-1 rounded-full">
                  {m.improvement}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Business outcome */}
        <div className="px-6 md:px-8 py-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Business Outcome
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {impact.businessOutcome}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkImpactResults;
