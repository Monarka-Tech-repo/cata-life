import { LegalPage, legalMetadata } from "@/components/pages/legal-page";

export const metadata = legalMetadata("terms", "en");

export default function Page() {
  return <LegalPage doc="terms" locale="en" />;
}
