import { TastePage, tasteMetadata } from "@/components/pages/app-pages";

export const metadata = tasteMetadata("es");

export default function Page() {
  return <TastePage locale="es" />;
}
