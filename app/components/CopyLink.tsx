import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

type CopyItemType = "link" | "id";

const CopyLink = ({
  quizId,
  link,
  onDelete,
  title,
}: {
  quizId: string;
  link: string;
  onDelete: (quizId: string) => void;
  title: string;
}) => {
  const [copied, setCopied] = useState<CopyItemType | null>(null);

  const handleCopyItem = async (item: string, type: CopyItemType) => {
    try {
      await navigator.clipboard.writeText(item);
      setCopied(type);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link or id", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
      {/* Link display area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {title}
        </label>
        <div className="mb-2 flex items-center border rounded-md">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-grow p-2 rounded-l-md bg-gray-100 text-sm truncate"
          />
          <button
            onClick={() => handleCopyItem(link, "link")}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-r-md"
          >
            {copied === "link" ? (
              <Check className="text-green-500" size={20} />
            ) : (
              <Copy size={20} className="text-blue-500" />
            )}
          </button>
        </div>
        <div className="flex items-center border rounded-md">
          <input
            type="text"
            value={quizId}
            readOnly
            className="flex-grow p-2 rounded-l-md bg-gray-100 text-sm truncate"
          />
          <button
            onClick={() => handleCopyItem(quizId, "id")}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-r-md"
          >
            {copied === "id" ? (
              <Check className="text-green-500" size={20} />
            ) : (
              <Copy size={20} className="text-blue-500" />
            )}
          </button>
        </div>
        <button
          className="mt-4 btn bg-black text-white w-32 h-7"
          onClick={() => onDelete(quizId)}
        >
          Delete Quiz
        </button>
      </div>
    </div>
  );
};

export default CopyLink;
