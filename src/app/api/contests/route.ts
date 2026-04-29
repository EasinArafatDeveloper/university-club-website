import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contest from "@/models/Contest";

export async function GET() {
  try {
    await dbConnect();
    const contests = await Contest.find().sort({ createdAt: -1 });
    return NextResponse.json(contests, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch contests:", error);
    return NextResponse.json({ error: "Failed to fetch contests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const newContest = await Contest.create(body);
    return NextResponse.json(newContest, { status: 201 });
  } catch (error) {
    console.error("Failed to create contest:", error);
    return NextResponse.json({ error: "Failed to create contest" }, { status: 500 });
  }
}
