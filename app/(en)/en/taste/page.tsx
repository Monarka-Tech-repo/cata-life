import { TastePage, tasteMetadata } from "@/components/pages/app-pages";

export const metadata = tasteMetadata("en");

export default function Page() {
  return <TastePage locale="en" />;
}
