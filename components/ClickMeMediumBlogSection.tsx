"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";

interface MediumPost {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
}

const FALLBACK_POSTS: MediumPost[] = [
    {
        title: "Certificates vs Projects: What Actually Makes a Cloud Engineer",
        link: "https://medium.com/@evansosei0707",
        thumbnail: "",
        pubDate: "",
        categories: ["Cloud", "AWS"],
    },
    {
        title: "AWS re:Invent 2025 Recap: The 5 Announcements That Actually Matter",
        link: "https://medium.com/@evansosei0707",
        thumbnail: "",
        pubDate: "",
        categories: ["AWS", "re:Invent"],
    },
    {
        title: "From Clicks to Code: Mastering Serverless with CloudFormation",
        link: "https://medium.com/@evansosei0707",
        thumbnail: "",
        pubDate: "",
        categories: ["CloudFormation", "Serverless"],
    },
    {
        title: "Building a Serverless Image Processor on AWS",
        link: "https://medium.com/@evansosei0707",
        thumbnail: "",
        pubDate: "",
        categories: ["Lambda", "S3"],
    },
    {
        title: "Making It Production-Ready: My AWS DevOps Journey",
        link: "https://medium.com/@evansosei0707",
        thumbnail: "",
        pubDate: "",
        categories: ["DevOps", "CloudFront"],
    },
];

const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "";
    }
};

const BlogCard = ({
    post,
    isOpen,
    index,
}: {
    post: MediumPost;
    isOpen: boolean;
    index: number;
}) => {
    const hasThumbnail = Boolean(post.thumbnail);

    return (
        <a
            href={isOpen ? post.link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !isOpen && e.preventDefault()}
            className="absolute left-1/2 top-[35%] flex h-[120px] w-[100px] sm:h-[140px] sm:w-[120px] md:h-[160px] md:w-[140px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-xl md:rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden group"
            style={{ textDecoration: "none" }}
        >
            {/* Thumbnail */}
            {hasThumbnail ? (
                <div
                    className="w-full h-[55%] bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${post.thumbnail})` }}
                />
            ) : (
                <div className="w-full h-[55%] bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0">
                    <img
                        src="/images/blog-images/medium_logo.png"
                        alt="Medium"
                        className="h-6 w-6 md:h-7 md:w-7 opacity-30"
                    />
                </div>
            )}

            {/* Text content */}
            <div className="flex-1 px-2 py-1.5 flex flex-col justify-between min-h-0">
                {/* Medium logo top-right */}
                <div className="flex items-start justify-between gap-1">
                    <p className="text-[6px] sm:text-[7px] md:text-[8px] font-semibold text-gray-800 leading-tight line-clamp-3 flex-1">
                        {post.title}
                    </p>
                    <img
                        src="/images/blog-images/medium_logo.png"
                        alt="Medium Logo"
                        className="h-3 w-3 md:h-4 md:w-4 object-contain flex-shrink-0 mt-0.5"
                    />
                </div>

                <div className="flex items-center justify-between mt-1">
                    {post.categories[0] && (
                        <span className="text-[5px] sm:text-[6px] md:text-[7px] bg-orange-100 text-orange-600 px-1 py-0.5 rounded-full font-medium truncate max-w-[70%]">
                            {post.categories[0]}
                        </span>
                    )}
                    {isOpen && (
                        <FiArrowUpRight className="text-gray-400 flex-shrink-0" style={{ fontSize: 8 }} />
                    )}
                </div>

                {post.pubDate && (
                    <p className="text-[5px] sm:text-[6px] text-gray-400 mt-0.5">
                        {formatDate(post.pubDate)}
                    </p>
                )}
            </div>
        </a>
    );
};

const ClickMeMediumBlogSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [posts, setPosts] = useState<MediumPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/medium-posts")
            .then((r) => r.json())
            .then((data) => {
                if (data.posts && data.posts.length > 0) {
                    setPosts(data.posts);
                } else {
                    setPosts(FALLBACK_POSTS);
                }
            })
            .catch(() => setPosts(FALLBACK_POSTS))
            .finally(() => setLoading(false));
    }, []);

    const displayPosts = loading
        ? Array(5).fill(null)
        : posts.length >= 5
            ? posts
            : [...posts, ...FALLBACK_POSTS].slice(0, 5);

    const handleFolderClick = () => {
        if (!isOpen) setIsOpen(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    const getAnimationState = () => {
        if (isOpen) return "open";
        if (isHovered) return "hover";
        return "closed";
    };

    const cardVariants = {
        closed: (index: number) => {
            if (index > 2) return { opacity: 0, y: 0, x: 0, scale: 0.9, zIndex: 0 };
            const rotate = (index - 1) * 5;
            const x = (index - 1) * 80;
            return {
                opacity: 1, y: 0, x, rotate, scale: 0.9,
                transition: { type: "spring" as const, stiffness: 300, damping: 30 },
            };
        },
        hover: (index: number) => {
            if (index > 2) return { opacity: 0, y: 0, zIndex: 0 };
            const rotate = (index - 1) * 5;
            const x = (index - 1) * 90;
            return {
                opacity: 1, y: -40, x, rotate, scale: 0.9,
                transition: { type: "spring" as const, stiffness: 400, damping: 20 },
            };
        },
        open: (index: number) => {
            let x, y, rotate;
            if (index < 3) {
                y = -850;
                x = (index - 1) * 380;
                rotate = (index - 1) * 15;
            } else {
                y = -400;
                x = (index === 3 ? -1 : 1) * 200;
                rotate = (index === 3 ? -10 : 10);
            }
            return {
                opacity: 1, y, x, rotate, scale: 2,
                transition: {
                    type: "spring" as const, stiffness: 200, damping: 20,
                    delay: index * 0.1,
                },
            };
        },
    };

    const folderVariants = {
        closed: { scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
        hover: { scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
        open: { scale: 0.5, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
    };

    return (
        <section className="relative flex min-h-[600px] md:h-[800px] w-full items-center px-4 md:px-6 justify-center overflow-hidden md:overflow-visible bg-transparent py-12 md:py-20">
            <div className="relative flex flex-col items-center w-full max-w-7xl">
                <div
                    className="relative w-[280px] h-[253px] sm:w-[350px] sm:h-[316px] md:w-[413px] md:h-[373px]"
                    onMouseEnter={() => !isOpen && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        className="absolute inset-0 cursor-pointer"
                        onClick={handleFolderClick}
                        initial="closed"
                        animate={getAnimationState()}
                        variants={folderVariants}
                        style={{ transformOrigin: "center bottom" }}
                    >
                        {/* Back Layer */}
                        <div className="w-full h-full">
                            <img
                                src="/images/blog-images/back_folder_layer.png"
                                alt="Folder Back"
                                className="absolute inset-0 z-0 h-full w-full object-contain"
                            />
                        </div>

                        {/* Blog Cards */}
                        {[0, 1, 2, 3, 4].map((index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={cardVariants}
                                initial="closed"
                                animate={getAnimationState()}
                                style={{ zIndex: isOpen ? 30 + index : 10 }}
                                className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
                            >
                                {loading || !displayPosts[index] ? (
                                    /* Skeleton */
                                    <div className="flex h-[120px] w-[100px] sm:h-[140px] sm:w-[120px] md:h-[160px] md:w-[140px] flex-col rounded-xl md:rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden">
                                        <div className="w-full h-[55%] bg-gray-100 animate-pulse" />
                                        <div className="flex-1 px-2 py-1.5 space-y-1.5">
                                            <div className="h-1.5 w-3/4 rounded bg-gray-200 animate-pulse" />
                                            <div className="h-1.5 w-1/2 rounded bg-gray-200 animate-pulse" />
                                        </div>
                                    </div>
                                ) : (
                                    <BlogCard
                                        post={displayPosts[index] as MediumPost}
                                        isOpen={isOpen}
                                        index={index}
                                    />
                                )}
                            </motion.div>
                        ))}

                        {/* Front Layer */}
                        <div className="w-full absolute bottom-0 h-[190px] sm:h-[237px] md:h-[280px] z-20">
                            <img
                                src="/images/blog-images/front_folder_layer.png"
                                alt="Folder Front"
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                            {isOpen && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    onClick={handleClose}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex h-[60px] w-[60px] sm:h-[72px] sm:w-[72px] md:h-[84px] md:w-[84px] items-center justify-center rounded-full bg-red-100 text-red-500 shadow-md hover:bg-red-200"
                                >
                                    <X className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11" />
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ClickMeMediumBlogSection;



