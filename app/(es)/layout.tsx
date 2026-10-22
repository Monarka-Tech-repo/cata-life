import "@/app/globals.css";
import { RootDocument, rootMetadata } from "@/components/root-document";

export const metadata = rootMetadata("es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
