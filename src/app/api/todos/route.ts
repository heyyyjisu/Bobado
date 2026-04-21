import mongo from "@/lib/db";
import Todo from "@/models/todo.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import OpenAI from "openai";

type ParsedTodo = {
  text: string;
  category: string;
  recurring: boolean;
  deadline: Date | null;
};

export async function GET() {
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
    const todos = await Todo.find({ user: user._id });
    console.log(todos);
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    const body = await req.json();

    const client = new OpenAI({
      baseURL: "https://api.deepinfra.com/v1/openai",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are over 10 years of experienced secretary and personal assistant.",
        },
        {
          role: "user",
          content: `Examine this paragraph and extract each task: "${body.text}"

Categorize each task using these rules:
- "important": urgent or high priority, needs attention soon. Does NOT have a specific date.
- "canwait": low priority, no pressure, not urgent at all
- "deadline": has a specific date, day, or time attached. Look for words like "by", "before", "due", "on Monday", "at 3pm", "this Friday", "tonight", "tomorrow". If ANY time reference exists, it MUST be "deadline", never "important".
- "habit": recurring activity that happens regularly like daily, weekly, every morning, always, usually
- "uncategorized": does not fit any of the above

For deadline tasks, include the deadline in the text like "Submit report by Friday". 
For tasks with a deadline, extract the date into the deadline field as an ISO string. If no deadline, set it to null.
Set recurring to true only for habit tasks, false for everything else.
Summarize each task as a short action phrase, no more than 6 words.

Be careful and precise. When in doubt between important and deadline, always choose deadline if any time reference exists.

Return only a raw JSON array with no explanation, no markdown, no code blocks.
Each object must have these exact quoted keys: "text", "category", "recurring", "deadline".
The category value MUST be exactly one of these strings: "important", "canwait", "deadline", "habit", "uncategorized". No other values are allowed.`,
        },
      ],
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    });

    const aiRes = response.choices[0].message.content;
    if (!aiRes) {
      return NextResponse.json({ msg: "No AI result." }, { status: 500 });
    }

    let result: ParsedTodo[];
    try {
      result = JSON.parse(aiRes);
    } catch (error) {
      return NextResponse.json(
        { msg: "Could not parse tasks. Try a clearer sentence." },
        { status: 400 },
      );
    }

    const todosAdded = result.map((todo: ParsedTodo) => ({
      ...todo,
      user: user._id,
    }));

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const limitTodos = await Todo.countDocuments({
      user: user._id,
      date: { $gte: oneDayAgo },
    });
    if (limitTodos > 10) {
      return NextResponse.json({ msg: "Daily limit reached" }, { status: 400 });
    }

    const todos = await Todo.insertMany(todosAdded);
    console.log(todos);
    return NextResponse.json(todos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}
