"use client";

import { Icons } from "@/components/Icons";
import Link from "next/link";
import { useState } from "react";
import CommentModal from "@/components/CommentModal";

interface CaseStudyHeaderProps {
    caseStudyId: string;
}

const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({ caseStudyId }) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    return (
        <>
            <header className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 flex justify-between items-center">
                <Link
                    href="/"
                    className="border-brand-500 hover:bg-brand-400/50 text-brand-400 cursor-pointer font-medium capitalize border text-sm md:text-lg px-4 md:px-4 py-2 md:py-2 rounded-full flex items-center gap-3 transition-all duration-300 shadow-sm hover:shadow-xl transform hover:scale-105"
                >
                    <Icons.MoveLeftIcon className="text-center text-brand-400" />
                    Back
                </Link>
                <button
                    onClick={() => setIsCommentModalOpen(true)}
                    className="hover:bg-brand-400/50 text-brand-400 cursor-pointer font-medium capitalize text-sm md:text-lg px-4 md:px-4 py-2 md:py-2 rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                >
                    <Icons.MessageAddIcon className="text-center text-brand-400" />
                    Leave a comment
                </button>
            </header>

            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                caseStudyId={caseStudyId}
            />
        </>
    );
};

export default CaseStudyHeader;
