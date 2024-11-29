import LoadingProvider from "@/components/loadingProvider";
import Link from "next/link";

export default function Home() {
  return (
    <LoadingProvider>
      <section>
        <h1>init</h1>
        <Link href="/dashboard">Dashboard admin</Link>
      </section>
    </LoadingProvider>
  );
}
