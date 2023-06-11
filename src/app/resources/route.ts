import { NextRequest, NextResponse } from "next/server";
import { Database } from "../../Database";

const db = new Database();
export async function GET(_request: NextRequest) {
  return NextResponse.json(await db.getResources());
}
