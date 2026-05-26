import { Icons } from "@/components/Icons";
import React from "react";

interface WorkChallengeProps {
    challenge: string;
    contextImage: string;
}

const WorkChallenge = ({ challenge, contextImage }: WorkChallengeProps) => {
    return (
        <>
            <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
                <div className="bg-gray-50 rounded-3xl border">
                    <div className="flex items-center gap-3 border-b py-2 sm:py-4 sm:px-5 px-3">
                        <Icons.ModernTvIssueIcon className="text-gray-700 fill-gray-300" />
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                            The Challenge
                        </h2>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed p-2 py-4 px-5 tracking-wide">
                        {challenge}
                    </p>
                </div>
            </section>

            <section className="max-w-[1280px] mx-auto lg:h-auto h-[415px] px-4 md:px-6">
                <div className="rounded-2xl overflow-hidden h-full">
                    <video
                        src={contextImage}
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>
        </>
    );
};

export default WorkChallenge;
