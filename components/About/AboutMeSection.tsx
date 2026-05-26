/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "motion/react";

/* ----------------------------- Types ----------------------------- */

type ProfileStackStyle = {
  rotate: number;
  translateY: number;
  scale: number;
  zIndex: number;
  opacity: number;
};

interface Book {
  title: string;
  author: string;
  textColor: string;
  bgColor: string;
  thumbnailUrl: string;
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  jobType: string;
}

/* ----------------------------- Static Data ----------------------------- */

const PROFILE_IMAGES: string[] = [
  "/images/users/about_photo_1.jpeg",
  "/images/users/gallery1.jpg",
  "/images/users/gallery2.jpg",
];

const BIO_PARAGRAPHS = [
  "I'm a backend developer and software engineer with 3+ years of experience building scalable web applications and APIs. I work primarily with Laravel, Frappe, and Python, with a focus on clean architecture, performance, and security.",
  "At Ghana School of Law, I build systems that digitize records and streamline learning workflows, including role-based access and robust data models. I enjoy collaborating in agile teams and shipping reliable backend features that help products grow.",
];

const LOCATION = "Ghana";

const IS_AVAILABLE = true;

const LIBRARY: Book[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    textColor: "#ffffff",
    bgColor: "#111827",
    thumbnailUrl: "/images/Books/ddia.svg",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    textColor: "#ffffff",
    bgColor: "#0c4b33",
    thumbnailUrl: "/images/Books/clean-architecture.svg",
  },
  {
    title: "System Design Interview",
    author: "Alex Xu",
    textColor: "#ffffff",
    bgColor: "#1f2937",
    thumbnailUrl: "/images/Books/system-design-interview.svg",
  },
  {
    title: "Database Internals",
    author: "Alex Petrov",
    textColor: "#ffffff",
    bgColor: "#1d4ed8",
    thumbnailUrl: "/images/Books/database-internals.svg",
  },
];

const EXPERIENCE: Experience[] = [
  {
    company: "Ghana School of Law",
    role: "Backend Developer",
    startDate: "2025-11-01",
    isCurrentJob: true,
    jobType: "Full-time",
  },
  {
    company: "Vacancies In Ghana",
    role: "Backend Developer",
    startDate: "2025-09-01",
    endDate: "2025-12-01",
    isCurrentJob: false,
    jobType: "Full-time",
  },
  {
    company: "Shaq Express",
    role: "Backend Developer",
    startDate: "2024-10-01",
    endDate: "2025-09-01",
    isCurrentJob: false,
    jobType: "Full-time",
  },
];

/* ----------------------- Helper Functions ------------------------ */

const getStackStyle = (pos: number): ProfileStackStyle => {
  const base: Record<number, ProfileStackStyle> = {
    0: { rotate: 0, translateY: 0, scale: 1, zIndex: 40, opacity: 0 },
    1: { rotate: 8, translateY: -15, scale: 0.95, zIndex: 30, opacity: 0.7 },
    2: { rotate: 12, translateY: -25, scale: 0.92, zIndex: 20, opacity: 0.7 },
    3: { rotate: -8, translateY: -15, scale: 0.95, zIndex: 10, opacity: 0.7 },
    4: { rotate: -12, translateY: -25, scale: 0.92, zIndex: 5, opacity: 0.7 },
  };

  return base[pos] ?? base[4];
};

const calculateYearsOfExperience = (): number => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

const formatPeriod = (experience: Experience): string => {
  const startYear = new Date(experience.startDate).getFullYear();
  const endYear = experience.isCurrentJob
    ? "Now"
    : experience.endDate
      ? new Date(experience.endDate).getFullYear()
      : "";
  return `${startYear} - ${endYear}`;
};

/* ------------------------- Main Component ------------------------- */

const AboutMeSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);


  const profileImages = PROFILE_IMAGES;
  const yearsOfExperience = calculateYearsOfExperience();

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + profileImages.length) % profileImages.length,
    );

  const toggleFavouriteSong = () => setIsPlaying((prev) => !prev);

  return (
    <div className="max-w-[1280px] justify-center">
      {/* -------------------- ABOUT SECTION -------------------- */}
      <section className="max-w-full w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-0 md:gap-auto">
          {/* LEFT — BIO */}
          <div className="bg-gray-100 border border-gray-300 rounded-3xl p-6">
            <h1 className="text-xl lg:text-4xl text-gray-900 font-bold mb-4 font-shantell">
              I&apos;m Owura Kwaku Safo,
            </h1>

            <div className="space-y-4 mb-8 md:mb-12">
              {BIO_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="text-gray-500 text-base md:text-lg leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-row gap-1 md:gap-6 justify-around">
              <InfoGroup
                label="Experience"
                value={`${yearsOfExperience}+ years in Tech`}
              />
              <InfoGroup label="Location" value={LOCATION} />
              <div>
                <p className="text-gray-500 text-sm md:text-base mb-2">
                  Availability
                </p>
                <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 border-1 max-md:max-w-[100px] border-gray-500 rounded-full">
                  <div className="relative border w-max p-0.5 h-max rounded-full border-[#05C215]">
                    <div
                      className={`md:w-2 md:h-2 h-1 w-1 rounded-full z-10 ${
                        IS_AVAILABLE ? "bg-[#05C215]" : "bg-gray-400"
                      }`}
                    />
                    {/* Ripple effect - only show when available */}
                    {IS_AVAILABLE && (
                      <>
                        <span className="absolute inset-0 rounded-full bg-[#05C215] animate-ping opacity-75"></span>
                        <span className="absolute inset-0 rounded-full  animate-pulse opacity-50"></span>
                      </>
                    )}
                  </div>
                  <span className="text-gray-600 whitespace-nowrap text-xs md:text-sm font-medium">
                    {IS_AVAILABLE ? "Open to work" : "Not available"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — IMAGE STACK */}
          <ImageStack
            images={profileImages}
            currentIndex={currentImageIndex}
            prev={prevImage}
            next={nextImage}
          />
        </div>
      </section>

      {/* ------------------- BOOKS / SONG / TWEET ------------------- */}
      <MediaSection
        library={LIBRARY}
        isPlaying={isPlaying}
        togglePlay={toggleFavouriteSong}
      />

      {/* ------------------------ EXPERIENCE ------------------------ */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-5xl font-semibold text-gray-500 mb-4 lg:mb-8 font-shantell">
          Experience
        </h2>
        <div className="space-y-4">
          {EXPERIENCE.map((job, index) => (
            <JobItem key={index} job={job} />
          ))}
        </div>
      </section>

      {/* ---------------------- CERTIFICATIONS ---------------------- */}
      {/* <CertificationsSection /> */}

      <h2 className="text-[32px] md:text-[96px] font-semibold text-gray-300 mb-4 text-center mt-8 lg:mb-8 font-shantell">
        Thanks for Reading
      </h2>
    </div>
  );
};

/* ---------------------- Small Reusable UI ----------------------- */

const InfoGroup: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <p className="text-gray-500 text-sm md:text-base mb-2">{label}</p>
    <p className="text-gray-500 text-base whitespace-nowrap md:text-2xl font-semibold">
      {value}
    </p>
  </div>
);

const JobItem: React.FC<{ job: Experience }> = ({ job }) => (
  <div className="flex items-start justify-between py-4 w-full border-b border-gray-300 last:border-0">
    <div className=" flex flex-col items-start gap-2">
      <h4 className="text-gray-400 text-base whitespace-nowrap lg:text-[36px] font-semibold">
        {job.company}
      </h4>
      <p className="text-gray-400  text-sm lg:text-2xl">{formatPeriod(job)}</p>
    </div>
    <div className=" flex flex-col items-end gap-2">
      <p className="text-gray-400 text-base  text-right lg:text-4xl">
        {job.role}
      </p>
      <p className="text-gray-400 text-base  text-right lg:text-2xl">
        {job.jobType}
      </p>
    </div>
  </div>
);

/* ------------------------- IMAGE STACK -------------------------- */

interface StackProps {
  images: string[];
  currentIndex: number;
  prev: () => void;
  next: () => void;
}

const ImageStack: React.FC<StackProps> = ({
  images,
  currentIndex,
  prev,
  next,
}) => {
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);

  const handlePrev = () => {
    if (exitDir) return;
    setExitDir("left");
  };

  const handleNext = () => {
    if (exitDir) return;
    setExitDir("right");
  };

  const handleAnimationComplete = () => {
    // Always go to next image regardless of direction
    next();
    setExitDir(null);
  };

  return (
    <div className="relative flex items-center justify-center lg:pl-40 min-h-[450px] lg:min-h-[550px]">
      <div className="relative w-full max-w-[450px] h-[580px]">
        {/* Stacked Cards */}
        <div className="relative w-full h-full">
          {images.map((img, index) => {
            const pos = (index - currentIndex + images.length) % images.length;
            if (pos >= 5) return null;

            const style = getStackStyle(pos);
            const isFront = pos === 0;

            // If this is the front card and we are animating out
            const isExiting = isFront && exitDir !== null;

            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2"
                initial={false}
                animate={
                  isExiting
                    ? {
                        x: exitDir === "left" ? -500 : 500,
                        y: "-50%",
                        opacity: 0,
                        rotate: exitDir === "left" ? -45 : 45,
                        scale: style.scale,
                        zIndex: 50, // Keep on top while exiting
                      }
                    : {
                        x: "-50%",
                        y: `calc(-50% + ${style.translateY}px)`,
                        rotate: style.rotate,
                        scale: style.scale,
                        opacity: 1,
                        zIndex: style.zIndex,
                      }
                }
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  if (isExiting) {
                    handleAnimationComplete();
                  }
                }}
              >
                <div className="relative w-[320px] h-[400px]  lg:w-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <div
                    className="absolute top-0 left-0 h-full w-full bg-black z-10 transition-opacity duration-300"
                    style={{ opacity: style.opacity }}
                  ></div>
                  <Image
                    src={img}
                    alt="image"
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="absolute bottom-10 lg:bottom-4 left-1/2 -translate-x-1/2 flex w-full justify-between items-center gap-8 z-40">
          <CircleBtn
            icon={
              <span
                style={{ transform: "scaleX(-1)", display: "inline-block" }}
              >
                👉
              </span>
            }
            onClick={handlePrev}
            className="bg-[#B1E7B5] border-[#4ADE80] hover:bg-[#75FF75]"
          />
          <CircleBtn
            icon="👉"
            onClick={handleNext}
            className="bg-[#B1E7B5] border-[#4ADE80] hover:bg-[#75FF75]"
          />
        </div>
      </div>
    </div>
  );
};

const CircleBtn: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}> = ({ icon, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-21 h-21 text-[32px] border-2 cursor-pointer rounded-full flex items-center justify-center
    transition-all duration-300 shadow-lg hover:scale-110 hover:rotate-12 ${className}`}
  >
    {icon}
  </button>
);

/* ------------------------ MEDIA CARDS --------------------------- */

const MediaSection: React.FC<{
  library: Book[];
  isPlaying: boolean;
  togglePlay: () => void;
}> = ({ library, isPlaying, togglePlay }) => (
  <section className="max-w-full w-full mx-auto py-12">
    <div className="grid grid-cols-1 lg:grid-cols-8 items-start gap-8">
      {/* Books */}
      <LibraryCard books={library} />

      {/* Song */}
      <SongCard isPlaying={isPlaying} togglePlay={togglePlay} />

      {/* Tweet */}
      <TweetCard />
    </div>
  </section>
);

/* ----------------------- LIBRARY CARD ------------------------ */

const AnimatedArrow = () => {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center rotate-90 lg:rotate-0">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: [0, 1, 0], x: [-10, 5, 20] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/SVG-icons/library-arrow-right.svg"
            alt="library icon"
            width={24}
            height={24}
          />
        </motion.div>
      ))}
    </div>
  );
};

const LibraryCard: React.FC<{ books: Book[] }> = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="bg-gray-100 h-auto lg:col-span-4 border border-gray-300 rounded-3xl pt-6 px-4 pb-1 p-2 overflow-hidden">
      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col md:flex-row gap-2 w-full mb-2">
        <div className="flex flex-col items-start gap-4 ">
          <h3 className="text-sm hidden lg:block font-medium font-shantell text-gray-500">
            Books & Courses
          </h3>
          <h3 className="text-sm lg:hidden font-medium font-shantell text-gray-500">
            Books & Courses
          </h3>
          {/* LEFT - SQUARE PREVIEW BOX */}
          <div className="flex-1 max-md:w-full min-w-[228px] max-md:min-h-[281px] md:h-[228px] rounded-[32px] bg-[linear-gradient(to_top,#E9EAEB,transparent)] lg:bg-[linear-gradient(to_left,#E9EAEB,transparent)] flex items-center justify-center overflow-hidden">
            {!selectedBook ? (
              <div className="flex w-full h-full flex-col-reverse lg:flex-col items-center justify-center gap-2 px-4">
                <div className=" flex items-center justify-center">
                  <AnimatedArrow />
                </div>
                <p className="text-gray-500 text-center text-xs leading-tight">
                  Click on books to preview
                </p>
              </div>
            ) : (
              <img
                src={selectedBook.thumbnailUrl}
                alt={selectedBook.title}
                className="lg:min-w-[228px] w-full h-[291px] lg:h-[228px] object-cover"
              />
            )}
          </div>
        </div>

        {/* RIGHT - BOOKSHELF WITH LEANING BOOKS */}
        <div className="flex-1 relative flex lg:w-[60%] items-end mb-1 justify-center h-64">
          <div className=" flex items-end gap-8 lg:gap-10 justify-end h-full w-full">
            {[...books].reverse().map((book, index) => {
              const positions = [
                { right: 180, rotate: 26 },
                { right: 120, rotate: 18 },
                { right: 60, rotate: 9 },
                { right: 0, rotate: 0 },
              ];

              return (
                <div
                  key={index}
                  onClick={() => setSelectedBook(book)}
                  className={`
                    cursor-pointer 
                    w-[58px] h-[220px] lg:h-[233px]
                    rounded-md shadow-lg
                    origin-bottom
                    transition-all duration-300
                    hover:brightness-110
                    border-2 border-black/10
                  `}
                  style={{
                    right: `${positions[index]?.right || 0}px`,
                    transform: `rotate(${positions[index]?.rotate || 0}deg)`,
                    zIndex: books.length - index,
                    backgroundColor: book.bgColor,
                    color: book.textColor,
                  }}
                >
                  <div className="h-full w-full flex items-center  justify-center  p-1">
                    <div
                      className="flex flex-col items-start gap-0.5 whitespace-nowrap text-center leading-tight"
                      style={{
                        transform: "rotate(-90deg)",
                        width: "220px",
                      }}
                    >
                      <span className="text-base font-semibold truncate w-[186px] text-left">
                        {book.title}
                      </span>
                      <span className="text-xs font-medium">
                        {" "}
                        -by {book.author}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOOK INFO BELOW */}
      <div className="bg-gray-200 w-full flex justify-between items-center px-4  py-1 rounded-tl-2xl rounded-tr-2xl">
        <p className="text-gray-500 text-sm font-medium mb-0.5">
          {selectedBook ? selectedBook.title : "Book Title"}
        </p>
        <p className="text-gray-500 font-medium text-xs">
          {selectedBook ? `—by ${selectedBook.author}` : "-Author"}
        </p>
      </div>
    </div>
  );
};

const SongCard: React.FC<{ isPlaying: boolean; togglePlay: () => void }> = ({
  isPlaying,
  togglePlay,
}) => {
  return (
    <div className="relative lg:col-span-2 h-full">
      <SongCardContent
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        theme="light"
      />
      <motion.div
        className="absolute inset-0 z-10"
        initial={false}
        animate={{
          clipPath: isPlaying
            ? "circle(150% at calc(100% - 3.5rem) 3.5rem)"
            : "circle(0% at calc(100% - 3.5rem) 3.5rem)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: isPlaying ? "auto" : "none" }}
      >
        <SongCardContent
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          theme="dark"
        />
      </motion.div>
    </div>
  );
};

const SongCardContent: React.FC<{
  isPlaying: boolean;
  togglePlay: () => void;
  theme: "light" | "dark";
}> = ({ isPlaying, togglePlay, theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`relative border h-auto rounded-3xl py-4  px-4 transition-colors duration-300 ${
        isDark ? "bg-black border-gray-800" : "bg-gray-100 border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-start mb-4">
        <h3
          className={`text-sm font-medium font-shantell ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Favourite Song
        </h3>
      </div>

      {/* Spotify Logo */}
      <div className="absolute p-3 top-5 right-5 bg-black rounded-xl flex items-center justify-center">
        <Image
          src="/images/spotify-logo.png"
          alt="spotify logo"
          width={40}
          height={40}
        />
      </div>

      {/* Album Art */}
      <div
        className="relative h-[130px] w-[130px] mb-4 shadow-orange-800 rounded-2xl overflow-hidden"
        style={{ boxShadow: "16px 16px 40px rgba(110, 72, 41, 0.65)" }}
      >
        {isPlaying && isDark ? (
          <video
            src="/videos/can_you_feel_it.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            controls
          />
        ) : (
          <img
            src="/images/can_you_feel_it.jpg"
            alt="Can You Feel It cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Song Info */}
      <div className="mb-4">
        <h4
          className={`text-base font-semibold ${
            isDark ? "text-white" : "text-gray-700"
          }`}
        >
          Can You Feel It
        </h4>
        <p
          className={`font-medium text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          The Jacksons
        </p>
      </div>

      {/* Controls */}
      <div
        className={`flex items-center border py-2 rounded-full max-w-[95%] px-4 lg:px-8 mx-auto justify-between ${
          isDark ? "border-gray-800" : "border-gray-300"
        }`}
      >
        <Image
          src="/images/SVG-icons/playlist.svg"
          alt="playlist icon"
          width={24}
          height={24}
          className={isDark ? "invert" : ""}
        />

        <FaBackwardStep
          className={`text-2xl ${isDark ? "text-white" : "text-gray-700"}`}
        />
        <button
          onClick={togglePlay}
          className={`w-8 h-8 rounded-full text-base flex items-center justify-center ${
            isDark ? "bg-white text-black" : "bg-gray-700 text-white"
          }`}
        >
          {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
        </button>

        <FaForwardStep
          className={`text-2xl ${isDark ? "text-white" : "text-gray-700"}`}
        />
        <Image
          src="/images/SVG-icons/volume.svg"
          alt="volume icon"
          width={24}
          height={24}
          className={isDark ? "invert" : ""}
        />
      </div>
    </div>
  );
};

const TweetCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative lg:col-span-2 h-auto">
      <TweetCardContent
        theme="light"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      />
      <motion.div
        className="absolute inset-0 z-10"
        initial={false}
        animate={{
          clipPath: isHovered
            ? "circle(150% at calc(100% - 3.5rem) 3.5rem)"
            : "circle(0% at calc(100% - 3.5rem) 3.5rem)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      >
        <TweetCardContent
          theme="dark"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        />
      </motion.div>
    </div>
  );
};

const TweetCardContent: React.FC<{
  theme: "light" | "dark";
  onHoverStart: () => void;
  onHoverEnd: () => void;
}> = ({ theme, onHoverStart, onHoverEnd }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`relative h-full border rounded-3xl py-4 p-2 transition-colors duration-300 ${
        isDark ? "bg-[#0a66c2] border-gray-800" : "bg-gray-100 border-gray-300"
      }`}
    >
      <h3
        className={`text-sm font-medium font-shantell ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Find me on LinkedIn
      </h3>
      <div className="absolute p-3 top-0 right-0 rounded-xl flex items-center justify-center">
        <Image
          src="/images/linkedIn_logo.png"
          alt="X logo"
          width={80}
          height={80}
        />
      </div>

      <div className="mb-4 pt-3">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/images/linkedin_profile.png"
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <div>
            <p
              className={`font-semibold text-sm ${
                isDark ? "text-white" : "text-gray-700"
              }`}
            >
              Owura Kwaku Safo
            </p>
            <p
              className={`font-medium text-xs ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              @Backend Developer
            </p>
          </div>
        </div>

        <div>
          <p
            className={`leading-relaxed font-shantell text-sm mb-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <span>
              Good APIs feel invisible — stable, fast, and easy to integrate.
            </span>
            <br />
            <br />
            <span>
              Build the boring parts well, and everything else ships faster.
            </span>
          </p>
        </div>
      </div>
      <a
        href="https://www.linkedin.com/in/owura-kwaku-safo-8277b7336/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className={`w-full py-3 border flex px-4 lg:px-6 justify-between items-center rounded-full font-medium cursor-pointer transition-colors ${
          isDark
            ? "bg-[#1A1A1A] border-gray-700 hover:bg-[#252525]"
            : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        <p
          className={`text-md font-medium ${
            isDark ? "text-white" : "text-gray-700"
          }`}
        >
          Visit my profile
        </p>
        <div
          className={`flex items-center gap-3 border-2 rounded-full transition-all duration-300 group ${
            isDark
              ? "text-white border-white hover:bg-white hover:text-black"
              : "text-black border-black hover:bg-white"
          }`}
        >
          <FiArrowUpRight className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </a>
    </div>
  );
};

/* -------------------- CERTIFICATIONS SECTION -------------------- */

interface Certification {
  name: string;
  issuer: string;
  year: string;
  badgeImage: string;
  credlyUrl: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    year: "2025",
    badgeImage:
      "/images/certifications/aws-solutions-architect-associate-badge.png",
    credlyUrl:
      "https://www.credly.com/badges/1d5df440-33af-4b4a-9951-4d223c077f49/public_url",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    badgeImage: "/images/certifications/aws-cloud-practioner-cert-badge.png",
    credlyUrl:
      "https://www.credly.com/badges/1d5df440-33af-4b4a-9951-4d223c077f49/public_url",
  },
];

const CertCard: React.FC<{ cert: Certification }> = ({ cert }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={cert.credlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block"
    >
      <div
        className="bg-gray-100 border border-gray-300 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300"
        style={{
          borderColor: hovered ? "#ff8800" : "",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 16px 40px -12px rgba(255,136,0,0.2)" : "none",
        }}
      >
        <div
          className="relative mb-5 transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        >
          <Image
            src={cert.badgeImage}
            alt={cert.name}
            width={160}
            height={160}
            className="object-contain drop-shadow-md"
          />
        </div>

        <h3
          className="text-base md:text-xl font-semibold mb-1 transition-colors duration-300"
          style={{ color: hovered ? "#ff8800" : "#374151" }}
        >
          {cert.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          {cert.issuer} · {cert.year}
        </p>

        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-300"
          style={{
            background: hovered ? "#fff4e8" : "#f3f4f6",
            borderColor: hovered ? "#ff8800" : "#d1d5db",
            color: hovered ? "#e67a00" : "#6b7280",
          }}
        >
          View on Credly
          <FiArrowUpRight className="text-sm" />
        </span>
      </div>
    </a>
  );
};

const CertificationsSection: React.FC = () => (
  <section className="max-w-5xl mx-auto w-full px-4 py-12 md:py-20">
    <h2 className="text-2xl md:text-5xl font-semibold text-gray-500 mb-4 lg:mb-8 font-shantell">
      Certifications
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
      {CERTIFICATIONS.map((cert, index) => (
        <CertCard key={index} cert={cert} />
      ))}
    </div>
  </section>
);

export default AboutMeSection;
