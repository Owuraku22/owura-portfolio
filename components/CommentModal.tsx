"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";
import Image from "next/image";

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    caseStudyId: string;
}

const RATING_OPTIONS = [
    { value: 1, label: "Poor" },
    { value: 2, label: "Ok" },
    { value: 3, label: "Good" },
    { value: 4, label: "Great" },
    { value: 5, label: "Excellent" },
];

const CommentModal: React.FC<CommentModalProps> = ({
    isOpen,
    onClose,
    caseStudyId,
}) => {
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showRatingDropdown, setShowRatingDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating || !comment.trim()) return;

        setIsSubmitting(true);

        // Simulate a short submission delay then show success
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleClose = () => {
        setRating(null);
        setComment("");
        setIsSuccess(false);
        setShowRatingDropdown(false);
        onClose();
    };

    const handleContinueReading = () => {
        handleClose();
    };

    const selectedRatingLabel = rating
        ? RATING_OPTIONS.find((opt) => opt.value === rating)?.label
        : null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Modal/Sheet */}
                    <motion.div
                        initial={
                            isMobile
                                ? { y: "100%" }
                                : { opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }
                        }
                        animate={
                            isMobile
                                ? { y: 0 }
                                : { opacity: 1, scale: 1, y: "-50%", x: "-50%" }
                        }
                        exit={
                            isMobile
                                ? { y: "100%" }
                                : { opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }
                        }
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`fixed z-50 bg-white  shadow-2xl ${isMobile
                            ? "bottom-0 left-0 right-0 rounded-t-3xl"
                            : "top-1/2 left-1/2 rounded-3xl w-full lg:min-w-[600px] max-w-md"
                            }`}
                        style={{
                            maxHeight: isMobile ? "80vh" : "85vh",
                        }}
                    >
                        <div className="overflow-y-auto h-full">
                            {!isSuccess ? (
                                <div className="p-6 md:p-8">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                            Leave a Comment
                                        </h2>
                                        <button
                                            onClick={handleClose}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Info Callout */}
                                    <div className="flex gap-3 mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-100 justify-center items-center">
                                        <Image src="/quote-icon.png" alt="Quote icon" width={24} height={24} className="pb-4 md:pb-0 h-full scale-150 mt-0.5" />
                                        <p className="text-base md:text-lg font-normal text-gray-500">
                                            &quot;Leaving a comment helps me improve on this case study.
                                            any little feedback would be much appreciated.&quot;
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Rating Section - Dropdown for both mobile and desktop */}
                                        <div>
                                            <label className="block text-base md:text-lg font-semibold text-gray-900 mb-3">
                                                Rate this case study
                                            </label>

                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowRatingDropdown(!showRatingDropdown)
                                                    }
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl text-left flex items-center justify-between hover:border-gray-300 transition-colors"
                                                >
                                                    <span
                                                        className={
                                                            rating ? "text-gray-900" : "text-gray-400"
                                                        }
                                                    >
                                                        {selectedRatingLabel || "Select ratings"}
                                                    </span>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-400 transition-transform ${showRatingDropdown ? "rotate-180" : ""
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>

                                                <AnimatePresence>
                                                    {showRatingDropdown && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg z-10"
                                                        >
                                                            {RATING_OPTIONS.map((option, index) => (
                                                                <button
                                                                    key={option.value}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setRating(option.value);
                                                                        setShowRatingDropdown(false);
                                                                    }}
                                                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${index !== RATING_OPTIONS.length - 1
                                                                        ? "border-b border-gray-100"
                                                                        : ""
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div
                                                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${rating === option.value
                                                                                ? "border-orange-500 bg-orange-500"
                                                                                : "border-gray-300"
                                                                                }`}
                                                                        >
                                                                            {rating === option.value && (
                                                                                <div className="w-2 h-2 bg-white rounded-full" />
                                                                            )}
                                                                        </div>
                                                                        <span className="text-gray-900 font-medium">
                                                                            {option.value}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-gray-500">
                                                                        {option.label}
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        {/* Comment Section */}
                                        <div>
                                            <label className="block text-base md:text-lg font-semibold text-gray-900 mb-3">
                                                Leave a comment
                                            </label>
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="What do you think about this case study?"
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-orange-400 transition-colors text-gray-900 placeholder:text-gray-400"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={!rating || !comment.trim() || isSubmitting}
                                            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white enabled:text-black enabled:border-black border font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
                                        >
                                            <Send className="w-5 h-5" />
                                            {isSubmitting ? "Submitting..." : "Submit"}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                /* Success State */
                                <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
                                    {/* Header */}
                                    <div className="w-full flex items-center justify-between mb-8">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                            Leave a Comment
                                        </h2>
                                        <button
                                            onClick={handleClose}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Success Content */}
                                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                                        {/* Emoji */}
                                        <div className="mb-6 relative flex justify-center">
                                            <Image src="/success-emoji.png" alt="Success" width={200} height={200} />
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-8">
                                            Thanks for your feedback.
                                        </h3>

                                        {/* Continue Button */}
                                        <button
                                            onClick={handleContinueReading}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Continue reading
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommentModal;
