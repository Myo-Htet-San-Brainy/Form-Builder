"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { idToLink } from "./utils";
import { removeQuizById, retrieveQuizLinks } from "./utils/browserUtils";
import CopyLink from "./components/CopyLink";

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
        {storedValue.length <= 0 ? (
          <p>nothing to show</p>
        ) : (
          storedValue.map((quizLink) => (
            <CopyLink
              quizId={quizLink.id}
              key={quizLink.id}
              link={idToLink(quizLink.id)}
              title={quizLink.title}
              onDelete={(quizId) => {
                removeQuizById(quizId);
                setStoredValue(retrieveQuizLinks());
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
