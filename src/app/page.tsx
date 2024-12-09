import Link from "next/link";
import { getPosts } from "../../_action/postAction";
import Loading from "@/components/ui/loading";

export default async function Home() {
  const { data, errMsg } = await getPosts();
  if (errMsg) {
    console.log(errMsg);
  }
  console.log("====================================");
  console.log(JSON.stringify(data));
  console.log("====================================");
  const res = JSON.stringify(data);
  return (
    <section className="z-50 absolute">
      <Loading />
      <div className="fixed">
        <h1>{res}</h1>
        <h1>init</h1>
        <div>
          <Link href="/dashboard" className="underline font-bold">
            Pergi ke dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
