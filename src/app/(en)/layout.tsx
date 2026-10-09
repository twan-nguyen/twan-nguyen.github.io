import { buildMetadata, RootShell, viewport } from "@/components/root-shell";

export { viewport };

export const metadata = buildMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
