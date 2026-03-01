import { FileText, Download, Calendar } from "lucide-react";
import type { PortalDocument } from "@/types/contentful";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

const categoryColors: Record<string, string> = {
  "Quarterly Report": "bg-blue-50 text-blue-700",
  "Impact Report": "bg-green-50 text-green-700",
  Legal: "bg-amber-50 text-amber-700",
  Financial: "bg-purple-50 text-purple-700",
};

export function DocumentList({ documents }: { documents: PortalDocument[] }) {
  return (
    <div className="space-y-3">
      {documents.map((doc) => {
        const colorClass =
          categoryColors[doc.fields.category] || "bg-gray-50 text-gray-700";
        const fileUrl = doc.fields.file?.fields?.file?.url ?? "#";
        const fileSize = doc.fields.file?.fields?.file?.details?.size ?? 0;

        return (
          <div
            key={doc.sys.id}
            className="rounded-xl bg-white border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="h-11 w-11 rounded-xl bg-[#F7FAF8] flex items-center justify-center text-[#52B788] shrink-0">
              <FileText size={22} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="font-semibold text-[#1A3A2E] text-sm truncate">
                  {doc.fields.title}
                </h4>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}
                >
                  {doc.fields.category}
                </span>
              </div>
              {doc.fields.description && (
                <p className="text-xs text-[#0F1A14]/50 mb-1 line-clamp-1">
                  {doc.fields.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-[#0F1A14]/40">
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {formatDate(doc.fields.publishedDate)}
                </span>
                {fileSize > 0 && (
                  <span>{formatSize(fileSize)}</span>
                )}
              </div>
            </div>

            <a
              href={fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-[#1A3A2E] px-3 py-2 text-xs font-medium text-[#1A3A2E] hover:bg-[#1A3A2E] hover:text-white transition-all"
            >
              <Download size={13} />
              Download
            </a>
          </div>
        );
      })}
    </div>
  );
}
