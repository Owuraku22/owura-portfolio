"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Icons } from "@/components/Icons";

interface ImageData {
    url: string;
    alt: string;
}

interface ImageLightboxProps {
    images: ImageData[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const ImageLightbox = ({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchOffset, setTouchOffset] = useState(0);

    // Reset index when initialIndex changes
    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentIndex, images.length]);

    // Prevent body scroll when lightbox is open (cross-browser compatible)
    useEffect(() => {
        if (isOpen) {
            // Store original values
            const originalOverflow = document.body.style.overflow;
            const originalPosition = document.body.style.position;
            const originalTop = document.body.style.top;
            const originalWidth = document.body.style.width;

            // Get current scroll position
            const scrollY = window.scrollY;

            // Apply styles for all browsers
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';

            return () => {
                // Restore original styles first
                document.body.style.overflow = originalOverflow;
                document.body.style.position = originalPosition;
                document.body.style.top = originalTop;
                document.body.style.width = originalWidth;

                // Restore scroll position without animation
                if (scrollY > 0) {
                    window.scrollTo({
                        top: scrollY,
                        behavior: 'instant' as ScrollBehavior
                    });
                }
            };
        }
    }, [isOpen]);

    const goToNext = useCallback(() => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    }, [images.length, currentIndex]);

    const goToPrevious = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }, [currentIndex]);

    // Touch handlers for mobile swipe (optimized for performance)
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (touchStart === null) return;
        const currentTouch = e.touches[0].clientX;
        const diff = currentTouch - touchStart;
        setTouchOffset(diff);
    }, [touchStart]);

    const handleTouchEnd = useCallback(() => {
        if (touchStart === null) return;

        const threshold = 50; // pixels to trigger navigation
        if (touchOffset > threshold && currentIndex > 0) {
            goToPrevious();
        } else if (touchOffset < -threshold && currentIndex < images.length - 1) {
            goToNext();
        }

        setTouchStart(null);
        setTouchOffset(0);
    }, [touchStart, touchOffset, currentIndex, images.length, goToPrevious, goToNext]);





    if (!isOpen) return null;

    // Safety check: ensure we have images and valid index
    if (!images || images.length === 0) return null;
    if (currentIndex < 0 || currentIndex >= images.length) return null;

    const currentImage = images[currentIndex];
    if (!currentImage || !currentImage.url) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)', // Safari support
            }}
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
                aria-label="Close lightbox"
            >
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
                <span className="text-white font-medium">
                    {currentIndex + 1} / {images.length}
                </span>
            </div>

            {/* Previous button */}
            {images.length > 1 && currentIndex > 0 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goToPrevious();
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 shadow-lg"
                    aria-label="Previous image"
                >
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            )}

            {/* Next button */}
            {images.length > 1 && currentIndex < images.length - 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 shadow-lg"
                    aria-label="Next image"
                >
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            )}

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-0">
                <div
                    className="relative max-w-[80vw] max-h-[70vh] md:max-w-[90vw] md:max-h-[90vh] w-auto h-auto transition-transform duration-200 md:transition-none"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        transform: `translate3d(${touchOffset}px, 0, 0)`, // GPU acceleration
                        willChange: touchStart !== null ? 'transform' : 'auto', // Performance hint
                        WebkitTransform: `translate3d(${touchOffset}px, 0, 0)`, // Safari support
                    }}
                >
                    <Image
                        src={currentImage.url}
                        alt={currentImage.alt}
                        width={1200}
                        height={800}
                        className="object-contain select-none max-w-full max-h-full w-auto h-auto"
                        draggable={false}
                        priority
                        sizes="(max-width: 768px) 80vw, 90vw"
                        style={{
                            imageRendering: 'auto', // Better quality across browsers
                            WebkitUserSelect: 'none', // Safari
                            MozUserSelect: 'none', // Firefox
                            msUserSelect: 'none', // IE/Edge
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageLightbox;
