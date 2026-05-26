"use client";

import { DocumentAttachmentIcon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CgArrowLongRightC } from "react-icons/cg";
import { Icons } from "./Icons";

const Navbar = () => {
  const pathname = usePathname();

  // For the "My Works" link, we assume it's active when on the homepage ("/")
  // For the "About" link, it's active when on "/about"
  const isActive = (path: string) => pathname === path;

  const activeStyle =
    "text-sm md:text-base font-shantell text-brand-500 font-bold";
  const inactiveStyle = "text-sm md:text-base text-gray-500 font-shantell";

  return (
    <>
      <div className="w-full fixed top-0 z-50 h-20 md:h-[109px] lg:pt-3 bg-gradient-to-b from-white via-white/90 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_80%,black_50,transparent_100%)] px-4 md:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between h-full">
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/evans_logo.png"
                alt="logo"
                width={70}
                height={70}
              />

              <div className="bg-[#079913]/10 rounded-full border border-[#079913]/20 h-6 text-[#079913] py-0 font-medium  px-2 flex justify-center items-center ml-4">
                <div className="relative border flex items-center justify-center w-max p-0.5 h-max rounded-full border-[#05C215]">
                  <div className="md:w-2 md:h-2 h-1 w-1 rounded-full z-10 bg-[#05C215]" />
                  {/* Ripple effect - only show when available */}
                  <>
                    <span className="absolute inset-0 rounded-full bg-[#05C215] animate-ping opacity-75"></span>
                    <span className="absolute inset-0 rounded-full  animate-pulse opacity-50"></span>
                  </>
                </div>
                <span className="pl-1">Available</span>
              </div>
            </Link>
          </div>
          <div className="flex md:hidden items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/evans_logo.png"
                alt="logo"
                width={50}
                height={50}
              />
              <div className="bg-[#079913]/10 rounded-full border border-[#079913]/20 h-6 text-[#079913] py-0 font-medium  px-2 flex justify-center items-center ml-1 md:ml-4">
                <div className="relative rounded-full border border-[#079913] h-2.5 w-2.5 flex justify-center items-center">
                  <span className="rounded-full bg-[#079913] h-1 w-1 z-10"></span>
                  {/* Ripple effect */}
                  <span className="absolute inset-0 rounded-full bg-[#079913] animate-ping opacity-75"></span>
                  <span className="absolute inset-0 rounded-full bg-[#079913] animate-pulse opacity-50"></span>
                </div>{" "}
                <span className="pl-1 text-xs">Available</span>
              </div>
            </Link>
          </div>

          <div className="flex lg:hidden items-center justify-center gap-4">
            <Link
              href="/#works"
              className={isActive("/") ? activeStyle : inactiveStyle}
            >
              My Works
            </Link>
            <Link
              href="/about"
              className={isActive("/about") ? activeStyle : inactiveStyle}
            >
              About
            </Link>
          </div>

          <div className=" flex items-center justify-end gap-6">
            <div className="  items-center justify-center gap-6 hidden lg:flex">
              <Link
                href="/#works"
                className={isActive("/") ? activeStyle : inactiveStyle}
              >
                My Works
              </Link>
              <Link
                href="/about"
                className={isActive("/about") ? activeStyle : inactiveStyle}
              >
                About
              </Link>
            </div>
            <Link
              href="https://docs.google.com/document/d/1YJOAEK3MSCs9tlnThm2Hf3f3LrUw3BYVJK_9IoI9lNo/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-center justify-center text-sm text-gray-500 border cursor-pointer rounded-full px-3 md:px-6 py-2 border-gray-500  font-medium  gap-4"
            >
              <p className="hidden md:block">My Resume</p>
              {Icons.MoveRightIcon(
                {},
                "hidden md:block self-center text-center",
              )}
              <DocumentAttachmentIcon className="block md:hidden" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
