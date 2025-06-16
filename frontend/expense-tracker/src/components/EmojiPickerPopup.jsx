import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    // This is the key part: use emojiData.emoji
    onSelect(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative">
      {/* Trigger */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-xl overflow-hidden">
          {icon ? (
            <span className="text-3xl">{icon}</span> // Renders the emoji text
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="absolute top-20 left-0 z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-full absolute -top-3 -right-3 shadow hover:bg-gray-100 z-50"
          >
            <LuX />
          </button>

          <div className="bg-white shadow-lg rounded-md overflow-hidden max-h-[400px] overflow-y-auto">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
