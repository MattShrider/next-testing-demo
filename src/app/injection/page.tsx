import { mockUser, registry } from "@/config";
import { BackendDao } from "@/dao";
import { cookies } from "next/dist/client/components/headers";
import Link from "next/link";

type ResourcePageProps = {
  backendDao: BackendDao;
};

// While next.js actually renders this component, we can extract all of
// the dependencies on it and the network outside of the actual component.
//
// Then our unit tests can be provided different implementations of these things
// that do not break jest.
export default async function ResourcesPage() {
  // You would pass these in as credentials to the registry function below
  // instead of using a hard-coded credential.
  //
  // This could be swapped out for authorizor secrets from the environment
  // variables if doing server-to-server requests.
  const _userCookie = cookies().get("user");

  return (
    <ResourcePageImplemenation backendDao={registry(mockUser).backendDao} />
  );
}

// The downside of this approach, is it forces you to be careful about where
// you call the network in your components. Any components within this
// component would require prop-drilling of their mock implemenations.
export async function ResourcePageImplemenation({
  backendDao,
}: ResourcePageProps) {
  const result = await backendDao.getResources();

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
