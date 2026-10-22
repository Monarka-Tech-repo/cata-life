import { CommunityPage, communityMetadata } from "@/components/pages/app-pages";

export const metadata = communityMetadata("en");

export default function Page() {
  return <CommunityPage locale="en" />;
}
