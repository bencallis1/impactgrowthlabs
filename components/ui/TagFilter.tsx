"use client";

interface Props {
  tags: string[];
  activeTag: string | null;
  onChange: (tag: string | null) => void;
  /** Label for the "show everything" pill. Defaults to "All" */
  allLabel?: string;
}

export function TagFilter({ tags, activeTag, onChange, allLabel = "All" }: Props) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {/* "All" pill */}
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
          activeTag === null
            ? "bg-[#1A3A2E] text-white border-[#1A3A2E]"
            : "bg-white text-[#0F1A14]/60 border-gray-200 hover:border-[#52B788] hover:text-[#1A3A2E]"
        }`}
      >
        {allLabel}
      </button>

      {/* Tag pills */}
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(activeTag === tag ? null : tag)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
            activeTag === tag
              ? "bg-[#52B788] text-white border-[#52B788]"
              : "bg-white text-[#0F1A14]/60 border-gray-200 hover:border-[#52B788] hover:text-[#1A3A2E]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
