import { NextResponse } from "next/server";
import { carMakes, getModelsByMake } from "@/data/car-makes";

export async function GET() {
  return NextResponse.json({
    makes: carMakes.map((m) => ({ id: m.id, name: m.name })),
  });
}
