import { Icons } from "@/components/Icons";
import React from "react";

interface KeyRole {
  icon: any;
  label: string;
}

interface WorkDoneProps {
  workDone: string[];
  keyRoles: KeyRole[];
}

const WorkDone = ({ workDone, keyRoles }: WorkDoneProps) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border">
        <div className="flex items-center gap-3 mb-6 border-b px-3 py-2 sm:px-6 sm:py-4">
          <Icons.WorkIcon className="text-gray-700 fill-gray-300" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            What I worked on
          </h2>
        </div>
        <ol className="space-y-3 mb-8 p-3 sm:py-4 sm:px-6">
          {workDone.map((item, index) => (
            <li key={index} className="text-lg sm:text-xl text-gray-600">
              {index + 1}. {item}
            </li>
          ))}
        </ol>

        <div className="border-t border-gray-300 pt-6 p-6 sm:p-6">
          <div className="text-base font-medium text-gray-900 mb-4">
            Key roles:
          </div>
          <div className="flex flex-wrap gap-3">
            {keyRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-200 px-4 py-1.5 rounded-full">
                  <Icon className="text-gray-700 fill-gray-300 scale-80" />
                  <span className="text-sm text-gray-700">{role.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkDone;
