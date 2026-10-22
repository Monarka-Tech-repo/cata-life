import { SupportPage, supportMetadata } from "@/components/pages/support-page";

export const metadata = supportMetadata("en");

export default function Page() {
  return <SupportPage locale="en" />;
}
