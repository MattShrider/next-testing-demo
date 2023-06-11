import { BackendResource } from "@/dao";

const resources: BackendResource[] = [
  {
    id: "1",
    label: "One from the db",
  },
  {
    id: "2",
    label: "Two from the db",
  },
  {
    id: "3",
    label: "Three from the db",
  },
];

// In a real system you wouldn't have this. The BackendDao just hits your
// actual database.
export class Database {
  constructor(/* connection info */) {}

  async getResources(): Promise<BackendResource[]> {
    return resources;
  }

  async getResourceById(id: string): Promise<BackendResource | null> {
    return resources.find((r) => r.id === id) ?? null;
  }
}
