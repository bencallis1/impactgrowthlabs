import type { Metadata } from "next";
import { getPortalNews } from "@/lib/contentful";
import { ExternalLink, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "News | Investor Portal" };

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const newsItems = await getPortalNews();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#1A3A2E] mb-1">Portfolio News</h1>
        <p className="text-sm text-[#0F1A14]/50">
          Latest updates from your portfolio companies
        </p>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <div
            key={item.sys.id}
            className="rounded-xl bg-white border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F7FAF8] text-[#2D6A4F] border border-[#52B788]/20">
                    {item.fields.company}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#0F1A14]/40">
                    <Calendar size={11} />
                    {formatDate(item.fields.publishedDate)}
                  </div>
                </div>
                <h3 className="font-semibold text-[#1A3A2E] mb-2">
                  {item.fields.title}
                </h3>
                <p className="text-sm text-[#0F1A14]/60 leading-relaxed">
                  {item.fields.summary}
                </p>
              </div>
              {item.fields.link && item.fields.link !== "#" && (
                <a
                  href={item.fields.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-[#1A3A2E] hover:bg-[#F7FAF8] transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
