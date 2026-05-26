"use client";

import React, { useEffect, useRef, useState } from "react";

type MermaidDiagramProps = {
  code: string;
  className?: string;
};

let mermaidDiagramCounter = 0;

export default function MermaidDiagram({ code, className }: MermaidDiagramProps) {
  const localIdRef = useRef<number | null>(null);

  if (localIdRef.current === null) {
    mermaidDiagramCounter += 1;
    localIdRef.current = mermaidDiagramCounter;
  }

  const id = `mermaid-${localIdRef.current}`;

  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        setError(null);
        setSvg(null);

        const mod = await import("mermaid");
        const mermaid: any = (mod as any).default ?? mod;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "default",
        });

        const result = await mermaid.render(id, code.trim());

        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : typeof e === "string"
              ? e
              : "Failed to render diagram";

        console.error("Mermaid render error:", e);

        if (!cancelled) {
          setError(message);
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) {
    return (
      <div className={className}>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Mermaid render failed. Showing source instead.
          {error ? (
            <div className="mt-2 text-xs font-mono text-red-700 break-words">
              {error}
            </div>
          ) : null}
        </div>
        <pre className="mt-3 rounded-xl overflow-x-auto bg-gray-950 text-gray-100 p-4 text-xs md:text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={className}>
      {svg ? (
        <div
          className="rounded-xl bg-white p-3 overflow-x-auto"
          aria-label="Mermaid diagram"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
          Rendering diagram…
        </div>
      )}
    </div>
  );
}
