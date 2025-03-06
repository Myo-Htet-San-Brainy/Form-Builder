"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { idToLink, retrieveQuizLinks } from "./utils";
import CopyLink from "./components/CopyLink";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="px-5 py-5 flex justify-between gap-4">
        <h1 className="font-bold text-xl">Quiz Builder</h1>
        <button
          className=" btn bg-black text-white "
          onClick={() => router.push("/createQuiz")}
        >
          Create Quiz
        </button>
      </div>
      <div className="px-10 md:px-20 flex flex-col gap-4">
        {retrieveQuizLinks().length <= 0 ? (
          <p>nothing to show</p>
        ) : (
          retrieveQuizLinks().map((quizLink) => (
            <CopyLink
              key={quizLink.id}
              link={idToLink(quizLink.id)}
              title={quizLink.title}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
