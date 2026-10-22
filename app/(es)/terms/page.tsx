import { LegalPage, legalMetadata } from "@/components/pages/legal-page";

export const metadata = legalMetadata("terms", "es");

export default function Page() {
  return <LegalPage doc="terms" locale="es" />;
}
