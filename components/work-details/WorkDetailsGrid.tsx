import React from "react";

interface ProjectDetails {
  role: string;
  duration: string;
  projectField: string;
  client: string;
}

interface WorkDetailsGridProps {
  projectDetails: ProjectDetails;
}

const WorkDetailsGrid = ({ projectDetails }: WorkDetailsGridProps) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="bg-gray-50 rounded-3xl border">
        <div className="grid grid-cols-1 max-sm:odd:divide-y md:odd:divide-x  lg:grid-cols-4 gap-4 sm:gap-6 justify-between">
          <div className="p-4 sm:p-6">
            <div className="text-md font-semibold text-gray-900 mb-2">
              Role
            </div>
            <div className="text-lg sm:text-xl text-gray-600 tracking-wide">
              {projectDetails.role}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-md font-semibold text-gray-900 mb-2">
              Duration
            </div>
            <div className="text-lg sm:text-xl text-gray-600 tracking-wide">
              {projectDetails.duration}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-md font-semibold text-gray-900 mb-2">
              Project field
            </div>
            <div className="text-lg sm:text-xl text-gray-600 tracking-wide">
              {projectDetails.projectField}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-md font-semibold text-gray-900 mb-2">
              Client
            </div>
            <div className="text-lg sm:text-xl text-gray-600 tracking-wide">
              {projectDetails.client}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkDetailsGrid;
