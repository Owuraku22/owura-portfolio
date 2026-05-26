import { Icons } from "@/components/Icons";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React from "react";

interface WorkResearchProcessProps {
    researchProcess: any[]; // Portable Text blocks
}

const WorkResearchProcess = ({
    researchProcess,
}: WorkResearchProcessProps) => {
    // Custom components for Portable Text styling
    const components: PortableTextComponents = {
        block: {
            normal: ({ children }) => (
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed tracking-wide mb-6">
                    {children}
                </p>
            ),
            h3: ({ children }) => (
                <h3 className="text-xl sm:text-2xl text-gray-600 font-semibold leading-relaxed tracking-wide mb-6 mt-8">
                    {children}
                </h3>
            ),
        },
        marks: {
            strong: ({ children }) => (
                <strong className="font-semibold text-gray-600">{children}</strong>
            ),
        },
    };

    return (
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="bg-gray-50 rounded-3xl border ">
                <div className="flex items-center gap-3 border-b py-2 sm:py-4 sm:px-5 px-3">
                    <Icons.SearchAreaIcon className="text-gray-700 fill-gray-300" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Research process
                    </h2>
                </div>

                <div className="p-2 py-4 px-5">
                    <PortableText value={researchProcess} components={components} />
                </div>
            </div>
        </section>
    );
};

export default WorkResearchProcess;
