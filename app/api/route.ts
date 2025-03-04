import { NextResponse, type NextRequest } from "next/server";
import client from "../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const QuizDb = client.db("Quiz");
    const quizCollection = QuizDb.collection("quiz");

    const result = await quizCollection.insertOne(body);

    if (!result.acknowledged) {
      return NextResponse.json(
        { error: "Insert operation was not successful" },
        { status: 500 } // Internal Server Error
      );
    }

    return NextResponse.json(
      { data: result },
      { status: 201 } // Created
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
