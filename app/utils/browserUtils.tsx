"use client";
// localstorage
export function addQuizLink({ id, title }: { id: string; title: string }) {
  // Get existing IDs (or initialize empty array if none exist)
  const existingILinks = JSON.parse(localStorage.getItem("quizLinks") || "[]");

  // Add new ID (if it doesn't already exist)
  if (!existingILinks.includes(id)) {
    existingILinks.push({ id, title });
    // Save back to localStorage
    localStorage.setItem("quizLinks", JSON.stringify(existingILinks));
  }
}

export function retrieveQuizLinks(): { id: string; title: string }[] {
  return JSON.parse(localStorage.getItem("quizLinks") ?? "[]");
}

export function removeQuizById(quizId: string) {
  let quizLinks = retrieveQuizLinks();
  quizLinks = quizLinks.filter((quizLink) => quizLink.id !== quizId);
  localStorage.setItem("quizLinks", JSON.stringify(quizLinks));
}
