import { mockUser, registry } from "@/config";
import Link from "next/link";

// @ts-expect-error
export default async function ResourcePage({ params }) {
  console.log("params", params);
  const result = await registry(mockUser).backendDao.getResourceById(params.id);

  if (result.err) {
    console.error(result.err);
    return <main>404 not found</main>;
  }

  return (
    <main>
      <p>
        For the id {result.ok.id}, the label is {result.ok.label}.
      </p>

      <Link href="/injection">Back to list</Link>
    </main>
  );
}
