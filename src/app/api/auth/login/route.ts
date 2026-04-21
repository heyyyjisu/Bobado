import User from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import mongo from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const JWT = process.env.JWT_SECRET;
    if (!JWT) {
      throw new Error("Failed to get token");
    }
    const body = await req.json();
    const email = body.email;
    const password = body.password;

    await mongo();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 401 });
    } else if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT);
      return NextResponse.json({ token });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Login failed" }, { status: 500 });
  }
}
