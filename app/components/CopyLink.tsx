import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const LinkSharePopup = ({
  link,
  onClose,
}: {
  link: string;
  onClose: () => void;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Link display area */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share Link
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
    </div>
  );
};

export default LinkSharePopup;
