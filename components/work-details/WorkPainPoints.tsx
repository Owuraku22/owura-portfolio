import { Icons } from "@/components/Icons";
import React from "react";

interface PainPoint {
    title: string;
    description: string;
    fullWidth?: boolean;
}

interface WorkPainPointsProps {
    painPoints: PainPoint[];
}

const WorkPainPoints = ({ painPoints }: WorkPainPointsProps) => {
    return (
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="bg-gray-50 rounded-3xl border ">
                <div className="flex items-center gap-3 mb-6 border-b py-2 sm:py-4 sm:px-5 px-3">
                    <Icons.ThreeDMoveIcon className="text-gray-700 fill-gray-300" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Identified pain points
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 sm:px-5 px-3">
                    {painPoints.map((point, index) => (
                        <div
                            key={index}
                            className={`bg-[#A4A7AE] text-gray-25 rounded-xl p-4 border border-gray-600 ${point.fullWidth ? "lg:col-span-2" : ""
                                }`}>
                            <div className="flex items-start gap-3">
                                <Icons.RemoveCircleHalfDotIcon className="text-gray-700 fill-gray-100" />
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {point.title}
                                </h3>
                            </div>
                            <p className="text-lg sm:text-xl text-white/90 leading-relaxed p-2 py-4 px-5 tracking-wide">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkPainPoints;
