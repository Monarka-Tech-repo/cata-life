import { LoginPage, loginMetadata } from "@/components/pages/app-pages";

export const metadata = loginMetadata("en");

export default function Page() {
  return <LoginPage locale="en" />;
}
