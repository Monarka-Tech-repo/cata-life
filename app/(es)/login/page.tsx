import { LoginPage, loginMetadata } from "@/components/pages/app-pages";

export const metadata = loginMetadata("es");

export default function Page() {
  return <LoginPage locale="es" />;
}
