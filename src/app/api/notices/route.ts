import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db";
import Notice from "@/models/Notice";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const notices = await Notice.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;

    if (!session || (role !== "Super Admin" && role !== "Adviser")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();
    
    const newNotice = await Notice.create({
      ...body,
      postedBy: session.user?.name || "Admin"
    });

    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    console.error("Failed to create notice:", error);
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}
