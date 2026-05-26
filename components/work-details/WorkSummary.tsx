import { Icons } from "@/components/Icons";
import React from "react";

interface WorkSummaryProps {
  summary: string;
  readTime: string;
}

const WorkSummary = ({ summary, readTime }: WorkSummaryProps) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="rounded-b-4xl bg-[#A4A7AE] border border-t-0 border-gray-300 text-gray-25 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-2xl font-bold">Summary</h2>
            <div className="flex items-center gap-2 bg-gray-300 text-gray-800 px-3 sm:px-4 py-2 rounded-full text-sm font-medium">
              <Icons.TimeMachineIcon className="text-gray-700 fill-gray-300" />
              <span>({readTime})</span>
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkSummary;
