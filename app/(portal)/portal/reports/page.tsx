import type { Metadata } from "next";
import { getPortalDocuments } from "@/lib/contentful";
import { DocumentList } from "@/components/portal/DocumentList";

export const metadata: Metadata = { title: "Reports | Investor Portal" };

export default async function ReportsPage() {
  const documents = await getPortalDocuments();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#1A3A2E] mb-1">Reports & Documents</h1>
        <p className="text-sm text-[#0F1A14]/50">
          Quarterly reports, impact reports, and fund documents
        </p>
      </div>

      {documents.length === 0 ? (
        <p className="text-[#0F1A14]/50">No documents available.</p>
      ) : (
        <DocumentList documents={documents} />
      )}
    </div>
  );
}
