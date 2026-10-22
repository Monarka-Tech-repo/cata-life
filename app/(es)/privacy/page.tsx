import { LegalPage, legalMetadata } from "@/components/pages/legal-page";

export const metadata = legalMetadata("privacy", "es");

export default function Page() {
  return <LegalPage doc="privacy" locale="es" />;
}
