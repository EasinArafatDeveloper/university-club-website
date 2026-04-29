import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Authorization
    const roleRaw = (session?.user as any)?.role;
    if (!session || (roleRaw !== "Super Admin" && roleRaw !== "Adviser")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    const newEvent = await Event.create({
      ...body,
      image: body.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop", // Placeholder image
      status: "upcoming"
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
