import { Icons } from "@/components/Icons";
import React from "react";

interface Screen {
    type: string;
}

interface Onboarding {
    screens: Screen[];
}

interface WorkOnboardingProps {
    onboarding: Onboarding;
}

const WorkOnboarding = ({ onboarding }: WorkOnboardingProps) => {
    return (
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-4">
            <div className="bg-gray-50 rounded-3xl border ">
                <div className="flex items-center gap-3 mb-6 border-b py-2 sm:py-4 sm:px-5 px-3">
                    <Icons.AlignSelectionIcon className="text-gray-700 fill-gray-300" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Onboarding
                    </h2>
                </div>

                <div className="space-y-8 mx-4 pb-4">
                    {/* First row - 4 phones */}
                    <div className="bg-gray-200 rounded-2xl border p-6 sm:p-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {onboarding.screens.slice(0, 4).map((screen, index) => (
                                <div key={index} className="flex justify-center">
                                    <div className="w-full max-w-[200px]">
                                        <div className="relative aspect-9/19 bg-black rounded-[2.5rem] p-2.5 shadow-xl">
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-3xl z-10"></div>
                                            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                                                <img
                                                    src="/api/placeholder/200/420"
                                                    alt={`Onboarding screen ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second row - 2 phones */}
                    <div className="bg-gray-200 rounded-2xl border p-6 sm:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
                            {onboarding.screens.slice(4, 6).map((screen, index) => (
                                <div key={index} className="flex justify-center">
                                    <div className="w-full max-w-[240px]">
                                        <div className="relative aspect-9/19 bg-black rounded-[2.5rem] p-2.5 shadow-xl">
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-3xl z-10"></div>
                                            <div className="w-full h-full bg-white rounded-4xl overflow-hidden">
                                                <img
                                                    src="/api/placeholder/240/500"
                                                    alt={`Onboarding screen ${index + 5}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkOnboarding;
