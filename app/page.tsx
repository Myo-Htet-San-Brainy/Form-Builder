"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { idToLink } from "./utils";
import { removeQuizById, retrieveQuizLinks } from "./utils/browserUtils";
import CopyLink from "./components/CopyLink";
import toast from "react-hot-toast";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [storedValue, setStoredValue] = useState<
    { id: string; title: string }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoredValue(retrieveQuizLinks());
    }
  }, []);

  async function handleQuizLinkDelete(quizId: string) {
    try {
      // Make the DELETE request to the API
      const response = await fetch(`/api/${quizId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response status is OK (200)
      if (response.ok) {
        const data = await response.json();
        console.log("Quiz deleted successfully:", data.deletedQuiz);

        // Update the local state/storage after successful deletion
        removeQuizById(quizId);
        setStoredValue(retrieveQuizLinks());

        // You might want to show a success message to the user

        toast.success("Quiz deleted successfully");

        return true;
      } else {
        // Handle non-successful status codes
        const errorData = await response.json();
        const errorMessage =
          errorData.error ||
          `Failed to delete quiz: ${response.status} ${response.statusText}`;
        console.error(errorMessage);

        // You might want to show an error message to the user
        toast.error(errorMessage);

        return false;
      }
    } catch (error) {
      // Handle network errors or other exceptions
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error deleting quiz:", errorMessage);

      // You might want to show an error message to the user
      toast.error(`Error deleting quiz: ${errorMessage}`);

      return false;
    }
  }

  return (
    <div className="min-h-screen">
      <Link href={"/"} className="px-5 py-5 flex justify-between gap-4">
        <h1 className="font-bold text-xl">Quiz Builder</h1>
        <button
          className=" btn bg-black text-white "
          onClick={() => router.push("/createQuiz")}
        >
          Create Quiz
        </button>
      </Link>
      <div className="px-10 md:px-20 flex flex-col gap-4">
        {storedValue.length <= 0 ? (
          <p>nothing to show</p>
        ) : (
          storedValue.map((quizLink) => (
            <CopyLink
              quizId={quizLink.id}
              key={quizLink.id}
              link={idToLink(quizLink.id)}
              title={quizLink.title}
              onDelete={handleQuizLinkDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
