import Link from "next/link";

export default function Home() {
  return (
    <section className="z-50 absolute">
      <h1>init</h1>
      <div>
        <Link href="/dashboard" className="underline font-bold">
          Pergi ke dashboard
        </Link>
      </div>
    </section>
  );
}
