"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    variant?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up";
    delay?: number;
    className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    variant = "fade-up",
    delay = 0,
    className = "",
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px",
            }
        );

        observer.observe(element);

        // Check if element is already in viewport on mount
        const rect = element.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (isInViewport) {
            // Add is-visible class immediately for elements already in view
            setTimeout(() => {
                element.classList.add("is-visible");
            }, delay);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [delay]);

    return (
        <div
            ref={elementRef}
            className={`fx-reveal fx-${variant} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
