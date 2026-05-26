import WorkHero from "@/components/work-details/WorkHero";
import WorkSummary from "@/components/work-details/WorkSummary";
import WorkSnapshot from "@/components/work-details/WorkSnapshot";
import WorkProblem from "@/components/work-details/WorkProblem";
import WorkGoals from "@/components/work-details/WorkGoals";
import WorkArchitecture from "@/components/work-details/WorkArchitecture";
import WorkImplementation from "@/components/work-details/WorkImplementation";
import WorkChallengesSection from "@/components/work-details/WorkChallengesSection";
import WorkImpactResults from "@/components/work-details/WorkImpactResults";
import WorkReflections from "@/components/work-details/WorkReflections";
import WorkNextProject from "@/components/work-details/WorkNextProject";
import CaseStudyHeader from "@/components/CaseStudyHeader";
import ContextNavigation from "@/components/work-details/ContextNavigation";
import { works, getWork, getNextWork } from "@/lib/works-data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return works.map((w) => ({ id: w.id }));
}

const CaseStudyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const work = getWork(id);

  if (!work) return notFound();

  const nextWork = getNextWork(id);

  return (
    <div className="min-h-screen pt-[12px]">
      {/* Back nav */}
      <CaseStudyHeader caseStudyId={work.id} />

      {/* Title */}
      <header className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-4">
          <span className="inline-block px-4 py-1 md:py-2 bg-[#E9EAEB] text-gray-700 rounded-full text-sm font-medium">
            {work.category}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-center text-gray-900">
          {work.title}
        </h1>
      </header>

      {/* 1 — Hero: architecture diagram */}
      <WorkHero heroImage={work.architecture.diagram} title={work.title} />

      {/* 2 — Summary banner */}
      <WorkSummary summary={work.summary} readTime={work.readTime} />

      {/* 3 — Project Snapshot */}
      <WorkSnapshot snapshot={work.snapshot} />

      {/* 4 — The Problem */}
      <WorkProblem problem={work.problem} />

      {/* 5 — Goals & Requirements */}
      <WorkGoals goals={work.goals} />

      {/* 6 — Architecture Design */}
      <WorkArchitecture architecture={work.architecture} />

      {/* 7 — Implementation Breakdown */}
      <WorkImplementation layers={work.implementation} />

      {/* 8 — Challenges & Solutions */}
      <WorkChallengesSection challenges={work.challenges} />

      {/* 9 — Results & Impact */}
      <WorkImpactResults impact={work.impact} />

      {/* 10 — Reflections */}
      <WorkReflections reflections={work.reflections} />

      {/* Next Project */}
      <WorkNextProject
        nextProject={{
          id: nextWork.id,
          title: nextWork.title,
          category: nextWork.category,
          thumbnail: nextWork.thumbnail,
        }}
      />

      <h2 className="text-[32px] md:text-[96px] font-semibold text-gray-300 mb-4 text-center mt-8 lg:mb-8 font-shantell">
        Thanks for Reading
      </h2>

      <ContextNavigation />
    </div>
  );
};

export default CaseStudyPage;
