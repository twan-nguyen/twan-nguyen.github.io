import { buildMetadata, RootShell, viewport } from "@/components/root-shell";

export { viewport };

export const metadata = buildMetadata("vi");

export default function VietnameseLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="vi">{children}</RootShell>;
}
