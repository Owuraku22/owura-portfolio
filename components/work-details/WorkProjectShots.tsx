"use client";

import { Icons } from "@/components/Icons";
import Image from "next/image";
import React, { useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";

interface ProjectShot {
    title: string;
    images: Array<{
        asset: {
            _id: string;
            url: string;
        };
    }>;
}

interface WorkProjectShotsProps {
    projectShots: ProjectShot[];
}

const WorkProjectShots = ({ projectShots }: WorkProjectShotsProps) => {
    const [lightboxState, setLightboxState] = useState<{
        isOpen: boolean;
        images: Array<{ url: string; alt: string }>;
        initialIndex: number;
    }>({
        isOpen: false,
        images: [],
        initialIndex: 0,
    });

    const handleImageClick = (shotIndex: number, imageIndex: number) => {
        const shot = projectShots[shotIndex];
        const images = shot.images.map((img, idx) => ({
            url: img.asset.url,
            alt: `${shot.title} - Image ${idx + 1}`,
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
            {projectShots.map((shot, shotIndex) => (
                <section
                    key={shotIndex}
                    className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-4">
                    <div className="bg-gray-50 rounded-3xl border ">
                        <div className="flex items-center gap-3 mb-6 border-b py-2 sm:py-4 sm:px-5 px-3">
                            <Icons.AlignSelectionIcon className="text-gray-700 fill-gray-300" />
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                {shot.title}
                            </h2>
                        </div>

                        <div className="space-y-8 mx-4 pb-4">
                            {/* Display images in rows based on count */}
                            {shot.images.length > 4 ? (
                                <>
                                    {/* First row - 4 images */}
                                    <div className="bg-gray-200 rounded-2xl border p-4 sm:p-8">
                                        <div className="grid grid-cols-4 gap-4 sm:gap-6 justify-center items-center mx-auto">
                                            {shot.images.slice(0, 4).map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-center cursor-pointer group"
                                                    onClick={() => handleImageClick(shotIndex, index)}
                                                >
                                                    <div className="w-full max-w-[250px]">
                                                        <div className="relative w-full aspect-[9/19] transition-transform duration-200 group-hover:scale-105">
                                                            <Image
                                                                src={image.asset.url}
                                                                alt={`${shot.title} screen ${index + 1}`}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Second row - remaining images */}
                                    {shot.images.length > 4 && (
                                        <div className="bg-gray-200 rounded-2xl border p-4 sm:p-8">
                                            <div className="grid grid-cols-4 gap-4 sm:gap-6 justify-center items-center mx-auto">
                                                {shot.images.slice(4).map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-center cursor-pointer group"
                                                        onClick={() => handleImageClick(shotIndex, index + 4)}
                                                    >
                                                        <div className="w-full max-w-[250px]">
                                                            <div className="relative w-full aspect-[9/19] transition-transform duration-200 group-hover:scale-105">
                                                                <Image
                                                                    src={image.asset.url}
                                                                    alt={`${shot.title} screen ${index + 5}`}
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Single row for 4 or fewer images */
                                <div className="bg-gray-200 rounded-2xl border p-4 sm:p-8">
                                    <div className="grid grid-cols-4 gap-4 sm:gap-6 justify-center items-center mx-auto">
                                        {shot.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-center cursor-pointer group"
                                                onClick={() => handleImageClick(shotIndex, index)}
                                            >
                                                <div className="w-full max-w-[250px]">
                                                    <div className="relative w-full aspect-[9/19] transition-transform duration-200 group-hover:scale-105">
                                                        <Image
                                                            src={image.asset.url}
                                                            alt={`${shot.title} screen ${index + 1}`}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
};

export default WorkProjectShots;
