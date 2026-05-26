"use client";

import { useState, useEffect, useRef } from "react";

const ContextNavigation = () => {
  const [activeSection, setActiveSection] = useState("problem");

  const sections = [
    { id: "problem", label: "Problem" },
    { id: "architecture", label: "Architecture" },
    { id: "implementation", label: "Build" },
    { id: "challenges", label: "Challenges" },
    { id: "impact", label: "Impact" },
  ];

  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling.current) return;
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isManualScrolling.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);

      scrollTimeout.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4 pointer-events-none">
      <nav className="bg-white/70 backdrop-blur-md border border-neutral-200 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg pointer-events-auto w-fit">
        <ul className="flex items-center gap-1 md:gap-3">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm transition-all duration-300 ${
                  activeSection === section.id
                    ? "text-brand-500 font-semibold font-shantell"
                    : "text-gray-500 hover:text-gray-900 font-light"
                }`}
              >
                <span className="relative inline-block">
                  {section.label}
                  {activeSection === section.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ContextNavigation;
