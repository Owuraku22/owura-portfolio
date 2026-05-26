"use client";

import { Icons } from "@/components/Icons";
import Image from "next/image";
import React, { useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";

interface Solution {
    problemBlock: {
        title: string;
        description: string;
    };
    solutionBlock: {
        title: string;
        description: string;
    };
    imagesBlock: Array<{
        asset: {
            _id: string;
            url: string;
        };
    }>;
}

interface SolutionDesign {
    description: string;
    solutions: Solution[];
}

interface WorkSolutionDesignProps {
    solutionDesign: SolutionDesign;
    projectSlug?: string;
}

const WorkSolutionDesign = ({ solutionDesign, projectSlug }: WorkSolutionDesignProps) => {
    const [lightboxState, setLightboxState] = useState<{
        isOpen: boolean;
        images: Array<{ url: string; alt: string }>;
        initialIndex: number;
    }>({
        isOpen: false,
        images: [],
        initialIndex: 0,
    });

    const handleImageClick = (solutionIndex: number, imageIndex: number) => {
        const solution = solutionDesign.solutions[solutionIndex];
        const images = solution.imagesBlock.map((img, idx) => ({
            url: img.asset.url,
            alt: `${solution.solutionBlock.title} - Image ${idx + 1}`,
        }));

        setLightboxState({
            isOpen: true,
            images,
            initialIndex: imageIndex,
        });
    };

    const closeLightbox = () => {
        setLightboxState((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <>
            <ImageLightbox
                images={lightboxState.images}
                initialIndex={lightboxState.initialIndex}
                isOpen={lightboxState.isOpen}
                onClose={closeLightbox}
            />
            <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
                <div className="bg-gray-50 rounded-3xl border ">
                    <div className="flex items-center gap-3 mb-6 border-b py-2 sm:py-4 sm:px-5 px-3">
                        <Icons.WrenchIcon className="text-gray-700 fill-gray-300" />
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                            Solution Design
                        </h2>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed p-2 py-4 px-5 tracking-wide">
                        {solutionDesign.description}
                    </p>

                    <div className="space-y-6">
                        {solutionDesign.solutions.map((solution, index) => (
                            <div key={index} className="rounded-2xl overflow-hidden">
                                <div className="grid md:grid-cols-7 grid-cols-1 gap-6 p-6 ">
                                    {/* Left side - Text */}
                                    <div className="space-y-4 md:col-span-2">
                                        <div className="bg-[#A4A7AE] text-gray-25 rounded-xl p-4 border border-gray-600">
                                            <div className="flex items-start gap-3">
                                                <Icons.RemoveCircleHalfDotIcon className="text-gray-700 fill-gray-100" />
                                                <h3 className="text-lg sm:text-xl font-semibold">
                                                    {solution.problemBlock.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-25/90 text-lg sm:text-xl leading-relaxed p-2 tracking-wide">
                                                {solution.problemBlock.description}
                                            </p>
                                        </div>

                                        <div className="bg-gray-200 border-2 border-gray-400 rounded-2xl p-4">
                                            <h3 className="font-semibold text-gray-900 mb-4 text-lg sm:text-xl">
                                                {solution.solutionBlock.title}
                                            </h3>
                                            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed tracking-wide">
                                                {solution.solutionBlock.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right side - Phone mockups */}
                                    <div className="p-6 flex items-center justify-center gap-4 md:col-span-5 bg-gray-200 rounded-2xl border border-gray-300">
                                        {solution.imagesBlock.map((image, i) => (
                                            <div
                                                key={i}
                                                className={`w-full cursor-pointer group ${projectSlug === 'shaq-app' && index === 0
                                                    ? "max-w-auto max-h-[400px] flex justify-center gap-4 pl-lg"
                                                    : "max-w-[200px]"
                                                    }`}
                                                onClick={() => handleImageClick(index, i)}
                                            >
                                                <div className="relative w-full aspect-[9/19] transition-transform duration-200 group-hover:scale-105">
                                                    <Image
                                                        src={image.asset.url}
                                                        alt={`Solution mockup ${i + 1}`}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default WorkSolutionDesign;
