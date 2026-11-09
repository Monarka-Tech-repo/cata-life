import { OpenInAppPage, openInAppMetadata } from "@/components/pages/app-pages";

export const metadata = openInAppMetadata("es");

export default function Page() {
  return <OpenInAppPage locale="es" />;
}
