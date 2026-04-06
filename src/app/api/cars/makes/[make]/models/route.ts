import { NextRequest, NextResponse } from "next/server";
import { getModelsByMake } from "@/data/car-makes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ make: string }> }
) {
  const { make } = await params;
  const models = getModelsByMake(make);
  
  return NextResponse.json({ models });
}
