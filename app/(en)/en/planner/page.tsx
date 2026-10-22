import { PlannerPage, plannerMetadata } from "@/components/pages/app-pages";

export const metadata = plannerMetadata("en");

export default function Page() {
  return <PlannerPage locale="en" />;
}
