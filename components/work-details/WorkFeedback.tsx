"use client";

import { Icons } from "@/components/Icons";
import Image from "next/image";
import React, { useState } from "react";
import CommentModal from "../CommentModal";

interface WorkFeedbackProps {
    caseStudyId: string;
}

const WorkFeedback: React.FC<WorkFeedbackProps> = ({ caseStudyId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
                <div className="bg-gray-300 border border-gray-500 rounded-3xl px-6 py-4 sm:py-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 rounded-full flex items-center justify-center flex-shrink-0">
                            <Image
                                src="/images/know-anything.png"
                                alt="know-anything"
                                className="w-full h-full object-cover"
                                width={50}
                                height={50}
                            />
                        </div>
                        <p
                            className="text-gray-700 text-lg sm:text-xl font-medium"
                            style={{ fontFamily: "Comic Sans MS, cursive" }}>
                            Have anything to say about this case study?
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-brand-faded/60 hover:bg-brand-400/40 border border-brand-400 text-brand-400 cursor-pointer font-medium  capitalize text-base md:text-lg px-8 md:px-10 py-2 md:py-2 rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                        <Icons.MessageAddIcon className="text-center text-brand-400" />
                        Leave a comment
                    </button>
                </div>
            </section>

            <CommentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                caseStudyId={caseStudyId}
            />
        </>
    );
};

export default WorkFeedback;
