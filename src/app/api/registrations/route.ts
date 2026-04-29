import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db";
import Registration from "@/models/Registration";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    const newRegistration = await Registration.create({
      ...body,
      userId: (session.user as any).id,
      status: "Pending"
    });

    return NextResponse.json(newRegistration, { status: 201 });
  } catch (error) {
    console.error("Failed to register:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any)?.role;
    const isAdmin = role === "Super Admin" || role === "Adviser";

    await dbConnect();
    
    let registrations;
    if (isAdmin) {
      // Admins see everything
      registrations = await Registration.find().sort({ createdAt: -1 });
    } else {
      // Regular users see only their own
      registrations = await Registration.find({ userId: (session.user as any).id }).sort({ createdAt: -1 });
    }
    
    return NextResponse.json(registrations, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}
