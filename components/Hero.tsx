"use client";

import Image from "next/image";
import React from "react";
import { Icons } from "./Icons";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
  return (
    <section className="w-full min-h-max flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-10 md:py-12 lg:py-16 relative overflow-hidden">
      <ScrollReveal variant="fade-up">
        <section className="w-full min-h-max flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-10 md:py-12 lg:py-16 relative overflow-hidden">
        {/* Crown Icon - Top */}
        <div className="mb-2">
          <Image
            src="/images/crown.png"
            alt="Crown Icon"
            width={40}
            height={24}
            objectFit="contain"
          />
        </div>

        {/* Greeting Text */}
        <h2 className="text-xl font-normal mb-8 md:mb-10 flex items-center justify-center gap-2">
          <span className="">👋🏾</span>
          <span>Hi, I&apos;m Ɛvans!</span>
        </h2>

        {/* Main Heading Container */}
        <div className="w-full max-w-[1280px] relative mb-8 md:mb-12">
          {/* Star Icon - Left */}
          <div className="absolute left-10 lg:left-66 max-md:-bottom-36 lg:top-[95%] -translate-y-1/2 -translate-x-8 md:-translate-x-16 lg:-translate-x-24 lg:scale-155 block">
            <div className="w-16 h-16 lg:w-28 lg:h-28 relative">
              <Image
                src="/images/star-twinkle.png"
                alt="Star Icon"
                width={79}
                height={79}
                objectFit="contain"
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-6xl max-w-[95%] lg:max-w-[80%] mx-auto lg:text-[64px] lg:leading-[150%] font-extrabold text-center leading-tight md:leading-tight ">
            <span className="block">
              Cloud & Platform Engineer Who Turns Complexity Into Resilient Systems
            </span>
          </h1>

          {/* Profile Image - Right */}
          <div className="absolute right-10 max-md:scale-75 lg:right-66 max-md:-bottom-40 lg:top-[67%] -translate-y-1/2 translate-x-8 md:translate-x-16 lg:translate-x-24 block lg:scale-115">
            <Image
              src="/images/image-tag2.png"
              alt="Evans Profile"
              width={79}
              height={66}
              objectFit="contain"
            />
          </div>
        </div>

        {/* Subheading Text */}
        <p className="text-sm md:text-lg lg:text-xl text-center max-w-full max-md:-mt-5  lg:max-w-[40%] leading-[150%] mb-8 md:mb-10 lg:mb-12 text-gray-600">
          I build production-grade infrastructure — orchestrating containers,
          automating deployments, and architecting cloud platforms that{" "}
          <span className="font-semibold">scale</span> and{" "}
          <span className="font-semibold">endure.</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={() => {
            window.open(
              "https://mail.google.com/mail/?view=cm&fs=1&to=evansosei0707@gmail.com",
              "Compose Email",
              "width=800,height=600,resizable=yes,scrollbars=yes,status=yes"
            );
          }}
          className="bg-brand-500 hover:bg-brand-600 cursor-pointer text-black font-medium border-[1.5px] border-black text-base md:text-lg px-4 md:px-10 py-2 md:py-3 rounded-full flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          <Icons.MailIcon className="w-6 h-6 md:w-8 md:h-8 stroke-[1.2] stroke-black [&_path]:text-black fill-gray-200 text-center [&_svg]:overflow-visible" />
          Send me a mail
        </button>
        </section>
      </ScrollReveal>

      {/* Mobile decorative elements */}
      {/* <div className="md:hidden absolute top-20 left-4 w-12 h-12 opacity-50">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M40 10L45 35L40 40L35 35L40 10Z"
            stroke="#FF8800"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M70 40L45 45L40 40L45 35L70 40Z"
            stroke="#FF8800"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M40 70L35 45L40 40L45 45L40 70Z"
            stroke="#FF8800"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M10 40L35 35L40 40L35 45L10 40Z"
            stroke="#FF8800"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="40" cy="40" r="6" fill="#FF8800" />
        </svg>
      </div>

      <div className="md:hidden absolute top-20 right-4 w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 text-xl font-bold">
          K
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
