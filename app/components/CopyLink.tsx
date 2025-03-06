import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const CopyLink = ({
  link,
  onClose,
  title,
}: {
  link: string;
  onClose?: () => void;
  title: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
      {/* Link display area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {title}
        </label>
        <div className="flex items-center border rounded-md">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-grow p-2 rounded-l-md bg-gray-100 text-sm truncate"
          />
          <button
            onClick={handleCopyLink}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-r-md"
          >
            {copied ? (
              <Check className="text-green-500" size={20} />
            ) : (
              <Copy size={20} className="text-blue-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyLink;
