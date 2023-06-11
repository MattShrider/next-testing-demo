import { mockUser, registry } from "@/config";
import Link from "next/link";

export default async function ResourcesPage() {
  const result = await registry(mockUser).backendDao.getResources();

  console.log("we have", result);
  if (result.err) return <main>Something went wrong</main>;

  return (
    <main>
      <label>Your results:</label>
      <ul>
        {result.ok.map((r) => (
          <li key={r.id}>
            <Link href={`/injection/${r.id}`}>Go to {r.label}</Link>
          </li>
        ))}
      </ul>
      <Link href="/">Home</Link>
    </main>
  );
}
