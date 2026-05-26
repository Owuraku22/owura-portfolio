import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaLinkedinIn, FaGithub } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { FiArrowUpRight } from "react-icons/fi"
import { DocumentAttachmentIcon } from "hugeicons-react"
import { Icons } from "./Icons"

interface SocialLink {
  id: number
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/owura-kwaku-safo-8277b7336/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    id: 2,
    name: "GitHub",
    href: "https://github.com/Owuraku22",
    icon: FaGithub,
    external: true,
  },
  {
    id: 3,
    name: "Email",
    href: "mailto:owurakwaku758@gmail.com",
    icon: HiOutlineMail,
    external: false,
  },
]

const Footer = () => {
  return (
    <footer className=" w-full max-w-[1280px] mx-auto mb-6 px-4 md:px-6 lg:px-8 xl:px-8 2xl:px-0">
      <section className="w-full bg-custom-gray text-white  rounded-3xl">
        {/* Main Footer Content */}
        <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          {/* Top Section - Logo and Navigation */}
          <div className="flex  md:items-center justify-between mb-2 md:mb-6">
            {/* Logo */}
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/owura_logo.png"
                  alt="Owura logo"
                  width={50}
                  height={50}
                />
                <span className="text-gray-25 text-2xl hidden md:block font-semibold font-shantell">
                  Owura Kwaku Safo
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8 md:gap-12 mb-8 md:mb-0">
              <Link
                href="/#works"
                className="text-gray-25 text-sm md:text-lg font-shantell hover:text-brand-500 transition-colors"
              >
                My Works
              </Link>
              <Link
                href="/about"
                className="text-gray-25 text-sm md:text-lg font-shantell hover:text-brand-500 transition-colors"
              >
                About Me
              </Link>
            </div>

            {/* Resume Button - Desktop Only */}
            <div className="hidden md:block">
              <Link
                href="/resume/Owura%20kwaku%20cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white border border-white rounded-full px-6 py-2.5 bg-[#2E2E2E] hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <span className="font-medium">My Resume</span>
                {Icons.MoveRightIcon({} as React.SVGProps<SVGSVGElement>, "hidden md:block self-center text-center group-hover:translate-x-2 text-white group-hover:text-black transition-transform")}
              </Link>
            </div>
            <Link
              href="/resume/Owura%20kwaku%20cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className=" flex md:hidden items-center text-sm text-gray-25 border w-11 h-9 cursor-pointer rounded-full px-3 md:px-6 py-3 border-gray-25  font-medium  gap-4"
            >
              {/* <CgArrowLongRightC size={30} className="hidden md:block" /> */}
              <DocumentAttachmentIcon className="block md:hidden" />
            </Link>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-25 mb-3 md:mb-7"></div>

          {/* Bottom Section - Social Links */}
          <div className="flex  items-center w-full overflow-hidden  justify-between">
            {/* Social Links */}
            <div className="flex flex-nowrap items-center gap-1 md:gap-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.id}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1 sm:gap-3 text-white border border-white rounded-full px-2 sm:px-2 md:px-2 py-1 sm:py-1 hover:bg-white hover:text-black transition-all duration-300 group"
                  >
                    <IconComponent className=" text-xs sm:text-lg md:text-xl" />
                    <span className="font-medium text-xs  sm:text-base md:text-lg">
                      {social.name}
                    </span>
                    <FiArrowUpRight className="text-sm md:text-xl group-hover:translate-x-1 border rounded-full group-hover:-translate-y-1 transition-transform" />
                  </Link>
                )
              })}
            </div>

            {/* Eyes Emoji/Icon */}
            <div className="flex  ">
              <div className="text-2xl md:text-5xl">👀</div>
            </div>
          </div>
        </div>

        {/* Copyright Section - Optional */}
        {/* <div className="border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <p className="text-gray-500 text-sm md:text-base text-center">
              © {new Date().getFullYear()} Kelvin Ntiri. All rights reserved.
            </p>
          </div>
        </div> */}
      </section>
    </footer>
  )
}

export default Footer
