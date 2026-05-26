"use client";

import React from "react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

interface Testimonial {
  _id: string;
  name: string;
  profession: string;
  imageUrl: string;
  title: string;
  description: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    _id: "1",
    name: "James Mensah",
    profession: "Software Engineer",
    imageUrl: "/images/users/james mensah.png",
    title: "Transformed our deployment pipeline overnight",
    description:
      "Evans came in and completely overhauled the way we ship code. Build times went from hours to minutes and the entire team stopped dreading deployments. His Terraform modules are so clean that even our devs who had never touched infrastructure could follow them.",
  },
  {
    _id: "2",
    name: "Malvin Taylor",
    profession: "Backend Developer",
    imageUrl: "/images/users/Malvin Taylor.png",
    title: "Zero secrets in our repos — finally",
    description:
      "Before Evans joined we had credentials scattered across .env files and GitHub. He set up Vault, rewrote all our deployments to pull secrets at runtime, and walked the whole team through it patiently. Sleeping better now knowing nothing sensitive is sitting in plain text anywhere.",
  },
  {
    _id: "3",
    name: "Jochebed Appiah",
    profession: "Product Manager",
    imageUrl: "/images/users/Jochebed Appiah.png",
    title: "Production stability we never had before",
    description:
      "Evans built observability into everything — dashboards, alerts, structured logs. For the first time we actually knew what was happening in production before users complained. He also set up automated daily backups that saved us when a database went sideways. Absolute lifesaver.",
  },
  {
    _id: "4",
    name: "Kwame Asante",
    profession: "CTO, Vacancies In Ghana",
    imageUrl: "/images/users/about_photo_2.png",
    title: "The kind of engineer you want owning your infrastructure",
    description:
      "Evans operates at a level well beyond his years. He designed and deployed our entire cloud architecture on AWS — networking, ECS, RDS, the works — using Terraform from day one. Disciplined, thorough, and never cuts corners on security. I'd work with him again without hesitation.",
  },
];

const TestimonialCard = ({
  testimonial,
  onClick,
}: {
  testimonial: Testimonial;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="shrink-0 w-[350px] md:w-[420px] bg-white rounded-2xl p-6 md:p-7 shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-10 h-10 md:w-[59px] md:h-[59px] rounded-full overflow-hidden bg-gray-200">
          <Image
            src={testimonial.imageUrl}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-base md:text-[22.5px] text-neutral-800">
            {testimonial.name}
          </h4>
          <p className="text-neutral-500 text-sm  md:text-xl">
            {testimonial.profession}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-neutral font-semibold text-base md:text-[22px] mb-4">
        {testimonial.title}
      </h3>

      {/* Content */}
      <p className="text-neutral-600 text-sm md:text-xl leading-relaxed">
        {testimonial.description}
      </p>
    </div>
  );
};

const TestimonialModal = ({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl min-w-[350px] md:min-w-[600px] bg-white rounded-2xl p-6 md:p-7 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-10 h-10 md:w-[59px] md:h-[59px] rounded-full overflow-hidden bg-gray-200">
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-base md:text-[22.5px] text-neutral-800">
              {testimonial.name}
            </h4>
            <p className="text-neutral-500 text-sm  md:text-xl">
              {testimonial.profession}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-neutral font-semibold text-base md:text-[22px] mb-4">
          {testimonial.title}
        </h3>

        {/* Content */}
        <p className="text-neutral-600 text-sm md:text-xl leading-relaxed">
          {testimonial.description}
        </p>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const testimonials = TESTIMONIALS;
  const [selectedTestimonial, setSelectedTestimonial] =
    React.useState<Testimonial | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  // Duplicate the testimonials array for seamless infinite scroll
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Handle mouse down - start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // Handle mouse leave - stop dragging
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle mouse up - stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse move - scroll while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle card click - only open modal if not dragging
  const handleCardClick = (testimonial: Testimonial) => {
    if (!isDragging) {
      setSelectedTestimonial(testimonial);
    }
  };

  return (
    <>
      <div className=" w-full px-4 md:px-6 mb-12 lg:px-8">
        <SectionHeader
          title="What my colleagues say about me"
          description="Real feedback and appreciation from people I've worked with."
        />
        <section className="w-full max-w-[1280px] rounded-3xl mx-auto relative  bg-[#222222] py-16 lg:py-24 overflow-hidden">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 lg:w-40 bg-linear-to-r from-black/80 to-transparent z-10 pointer-events-none"></div>

          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 lg:w-40 bg-linear-to-l from-black/80 to-transparent z-10 pointer-events-none"></div>

          <ScrollReveal variant="fade-up">
            <div className="text-center mb-8 px-4 lg:px-8 md:mb-10">
              <h2 className="text-gray-25 text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
                Testimonials from Peers & Co-workers
              </h2>
              <p className="text-gray-25 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                Real experiences from people I’ve worked with.
              </p>
            </div>
          </ScrollReveal>

          {/* Scrolling Container with Fade Edges */}
          <div className="relative">
            {/* Infinite Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="flex items-start gap-6 animate-scroll-left hover:animation-pause">
                {duplicatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial._id}-${index}`}
                    testimonial={testimonial}
                    onClick={() => handleCardClick(testimonial)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
        />
      )}
    </>
  );
};

export default TestimonialSection;
