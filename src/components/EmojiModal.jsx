

import React, { useState } from "react";
import Picker from "emoji-picker-react";

const EmojiModal = ({ onClose, onAdd }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [label, setLabel] = useState("");

  const handleEmojiClick = (emojiData) => {
    setChosenEmoji(emojiData.emoji);
  };

  const submit = () => {
    if (chosenEmoji && label.trim()) {
      onAdd(chosenEmoji, label.trim());
      onClose();
      setChosenEmoji(null);
      setLabel("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm relative">
        <h2 className="text-lg font-semibold mb-4 text-center">Add Custom Reaction</h2>
        <Picker onEmojiClick={handleEmojiClick} />
        {chosenEmoji && (
          <>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl">{chosenEmoji}</span>
              <input
                type="text"
                placeholder="Label (e.g., Respect)"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              onClick={submit}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Add Reaction
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default EmojiModal;