import { defaultHead } from "next/head";

export type ServerError = {
  response: unknown;
  statusCode: number;
  message: string;
};

export type ValidResponse<T> = {
  ok: T;
  err: null;
};

export type InvalidResponse = {
  ok: null;
  err: ServerError;
};

export type Response<T> = ValidResponse<T> | InvalidResponse;

/**
 * A Data Access Object which is meant to fetch data from another server.
 * See {@link ./BackendDao/BackendDao.ts} for a concrete example.
 */
export abstract class Dao {
  constructor(
    protected baseUrl: string,
    protected bearerToken: string | null
  ) {}

  protected async http<RESPONSE>(
    method: string,
    path: string,
    params: Record<string, string> = {},
    body: BodyInit | null = null,
    contentType = "application/json"
  ): Promise<Response<RESPONSE>> {
    const url = new URL(path, this.baseUrl);

    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );

    const defaultHeaders = {
      "Content-Type": contentType,
    };

    return fetch(
      new Request(url, {
        method,
        credentials: "same-origin",
        headers: this.bearerToken
          ? {
              ...defaultHeaders,
              Authorization: `Bearer ${this.bearerToken}`,
            }
          : defaultHeaders,
        body,
      })
    )
      .then(async (response) => {
        if (!response.ok) {
          return {
            err: {
              response: await response.json(),
              statusCode: response.status,
              message: response.statusText,
            },
            ok: null,
          } as InvalidResponse;
        }

        return {
          err: null,
          ok: await response.json(),
        } as ValidResponse<RESPONSE>;
      })
      .catch((rejected) => {
        return {
          ok: null,
          err: {
            statusCode: rejected.statusCode ?? 0,
            response: rejected,
          },
        } as InvalidResponse;
      });
  }
}
