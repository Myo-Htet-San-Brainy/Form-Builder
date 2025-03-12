import { ObjectId } from "mongodb";
import client from "../../lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ quizId: string }>;
  }
) {
  try {
    const { quizId } = await params;

    // Validate quizId format before attempting conversion
    if (!ObjectId.isValid(quizId)) {
      return NextResponse.json(
        { error: "Invalid quiz ID format" },
        { status: 400 }
      );
    }

    const QuizDb = client.db("Quiz");
    const quizCollection = QuizDb.collection("quiz");

    // Convert quizId to ObjectId
    const quizIdToDelete = new ObjectId(quizId);
    const filter = { _id: quizIdToDelete };

    const result = await quizCollection.findOneAndDelete(filter);
    // await quizCollection.deleteMany({});

    // Check if quiz was found and deleted
    if (!result) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Return success response with deleted quiz data
    return NextResponse.json(
      {
        message: "Quiz deleted successfully",
        deletedQuiz: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
}
