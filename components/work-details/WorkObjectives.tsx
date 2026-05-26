import { Icons } from "@/components/Icons";
import React from "react";

interface Objective {
    title: string;
    description: string;
}

interface WorkObjectivesProps {
    objectives: Objective[];
}

const WorkObjectives = ({ objectives }: WorkObjectivesProps) => {
    return (
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="bg-gray-50 rounded-3xl border ">
                <div className="flex items-center gap-3 border-b py-2 sm:py-4 sm:px-5 px-3">
                    <Icons.TargetIcon className="text-gray-700 fill-gray-300" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Objectives we aim to achieve
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2 py-4 sm:px-5 px-3">
                    {objectives.map((objective, index) => (
                        <div
                            key={index}
                            className="bg-[#A4A7AE] text-gray-25 rounded-xl p-4 border border-gray-600">
                            <div className="flex items-start gap-3">
                                <Icons.RemoveCircleHalfDotIcon className="text-gray-700 fill-gray-100" />
                                <h3 className="text-md font-semibold">{objective.title}</h3>
                            </div>
                            <p className="text-gray-25/90 text-lg sm:text-xl leading-relaxed p-2 py-4 px-5 tracking-wide">
                                {objective.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkObjectives;
