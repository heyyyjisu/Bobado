import mongo from "@/lib/db";
import Todo from "@/models/todo.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const JWT = process.env.JWT_SECRET;
    if (!JWT) {
      throw new Error("Failed to get token");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ msg: "Token not found" }, { status: 401 });
    }
    const verified = jwt.verify(token, JWT);
    if (typeof verified === "string") {
      return NextResponse.json({ msg: "Invalid token" }, { status: 401 });
    }
    await mongo();

    const user = await User.findOne({ email: verified.email });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 401 });
    }
    const id = params.id;
    const todos = await Todo.findOneAndDelete({ _id: id, user: user._id });
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const JWT = process.env.JWT_SECRET;
    if (!JWT) {
      throw new Error("Failed to get token");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ msg: "Token not found" }, { status: 401 });
    }
    const verified = jwt.verify(token, JWT);
    if (typeof verified === "string") {
      return NextResponse.json({ msg: "Invalid token" }, { status: 401 });
    }
    await mongo();

    const user = await User.findOne({ email: verified.email });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 401 });
    }
    const id = params.id;
    const body = await req.json();
    const todos = await Todo.findOneAndUpdate(
      { _id: id, user: user._id },
      body,
    );
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
  }
}
