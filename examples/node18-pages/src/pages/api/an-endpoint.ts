import { NextApiRequest, NextApiResponse } from "next";

type TestParams = {
  id: string;
};

export type TestResponse = {
  id: string;
  label: string;
};

export type SomeApiResponse = {
  foo: string;
};

export type MyResponse = {
  id: string;
  label: string;
  metadata: string;
  metadataTwo: string;
};

export const MY_URL = "http://localhost:12345/api/test";
export const MY_SECOND_URL = "https://someOtherApi.com/-/graphs";

export default async function anEndpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // You should always validate your request body and parameters using
  // something like !npm Zod. This example does not validate schemas or responses.
  const { id } = req.query as TestParams;
  const { bearer } = req.cookies;

  if (!id) return res.status(404).send("missing id in request params");
  if (!bearer) return res.status(401).send("missing bearer token");

  const ourApiResponse: TestResponse = await fetch(MY_URL, {
    method: "POST",
    credentials: "include",
    headers: { Authorization: `bearer ${bearer}` },
  }).then((r) => r.json());

  const paramsResponse: SomeApiResponse = await fetch(
    `${MY_SECOND_URL}/${id}`
  ).then((r) => r.json());

  const thirdPartyApiResponse: SomeApiResponse = await fetch(
    `${MY_SECOND_URL}?id=${id}`
  ).then((r) => r.json());

  const retval: MyResponse = {
    id: ourApiResponse.id,
    label: ourApiResponse.label,
    metadata: thirdPartyApiResponse.foo,
    metadataTwo: paramsResponse.foo,
  };

  res.status(200).json(retval);
}
