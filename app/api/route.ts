import { NextResponse, type NextRequest } from "next/server";
import client from "../lib/mongodb";
import { refineData } from "../utils";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    //refinement
    const quiz = refineData(body);

    const QuizDb = client.db("Quiz");
    const quizCollection = QuizDb.collection("quiz");

    const result = await quizCollection.insertOne(quiz);

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
    console.log("err inserting quiz", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
