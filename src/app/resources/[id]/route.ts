import { Database } from "@/Database";
import { BackendResource } from "@/dao";
import { NextRequest, NextResponse } from "next/server";

type GetResourceRequest = {
  id: string;
};

const db = new Database();
export async function GET(
  request: NextRequest,
  { params }: { params: GetResourceRequest }
): Promise<NextResponse<BackendResource | null>> {
  const { id } = params;
  if (!id)
    return NextResponse.json(null, {
      status: 400,
      statusText: `param "id" was not provided.`,
    });
  return NextResponse.json(await db.getResourceById(id));
}
