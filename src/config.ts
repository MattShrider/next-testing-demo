import { BackendDaoImplementation } from "./dao";

export type User = {
  credentials: {
    token: string;
  };
};

// This should come from your auth system
export const mockUser: User = {
  credentials: {
    token: "foobar",
  },
};

export const registry = (user: User) =>
  ({
    backendDao: new BackendDaoImplementation(
      "http://0.0.0.0:3000",
      user.credentials.token
    ),
  } as const);
