import mongo from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = body.name;
    const email = body.email;
    const password = body.password;
    const encrypted = await bcrypt.hash(password, 10);

    await mongo();

    const newUser = await User.create({
      name,
      email,
      password: encrypted,
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
  }
}
