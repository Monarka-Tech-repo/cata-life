import { OpenInAppPage, openInAppMetadata } from "@/components/pages/app-pages";

export const metadata = openInAppMetadata("en");

export default function Page() {
  return <OpenInAppPage locale="en" />;
}
