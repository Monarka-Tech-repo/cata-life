import { JoinTablePage, joinTableMetadata } from "@/components/pages/app-pages";

export const metadata = joinTableMetadata("en");

export default function Page() {
  return <JoinTablePage locale="en" />;
}
