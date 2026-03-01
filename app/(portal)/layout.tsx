import { PortalNav } from "@/components/portal/PortalNav";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F7FAF8]">
      <PortalNav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
