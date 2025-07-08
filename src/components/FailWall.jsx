
import React, { useState, useRef } from "react";
import PostCard from "./PostCard";
import EmojiPicker from "emoji-picker-react";
import { CameraIcon, SmileIcon } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const predefinedReactions = [
  { emoji: "👍", label: "Relatable", bg: "bg-yellow-100", text: "text-yellow-700" },
  { emoji: "🧠", label: "Inspired", bg: "bg-indigo-100", text: "text-indigo-700" },
  { emoji: "😅", label: "Funny", bg: "bg-green-100", text: "text-green-700" },
  { emoji: "💖", label: "Support", bg: "bg-pink-100", text: "text-pink-700" },
];

const FailWall = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userReactions, setUserReactions] = useState({});
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const editorRef = useRef(null);

  const handlePost = () => {
    if (newPost.trim() || media) {
      const post = {
        id: Date.now(),
        name: "You",
        avatar: "https://i.pravatar.cc/150?u=you",
        content: newPost,
        timestamp: "Just now",
        reactions: {},
        comments: [],
        media,
        mediaType,
      };
      setPosts([post, ...posts]);
      setNewPost("");
      if (editorRef.current) editorRef.current.innerHTML = "";
      setMedia(null);
      setMediaType(null);
      setShowEmojiPicker(false);
      toast.success("🎉 Post submitted successfully!");
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setMedia(reader.result);
      setMediaType(file.type.startsWith("video") ? "video" : "image");
    };
    reader.readAsDataURL(file);
  };

  const handleReact = (postId, emoji) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const updatedReactions = {};
        predefinedReactions.forEach((r) => {
          if (r.emoji === emoji) {
            updatedReactions[emoji] = { count: 1, byUser: true };
          }
        });
        return { ...post, reactions: updatedReactions };
      })
    );
    setUserReactions((prev) => ({ ...prev, [postId]: emoji }));
  };

  const handleComment = (postId, updatedComments) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, comments: updatedComments } : post))
    );
  };

  const handleDelete = (postId) => {
    setShowDeleteConfirm(postId);
  };

  const confirmDelete = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    setShowDeleteConfirm(null);
    toast.warn("🗑️ Post deleted");
  };

  const cancelDelete = () => setShowDeleteConfirm(null);

  const handleEmojiClick = (emojiData) => {
    if (editorRef.current) {
      const emoji = emojiData.emoji;
      document.execCommand("insertText", false, emoji);
      setNewPost(editorRef.current.innerHTML);
    }
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
    setNewPost(editorRef.current.innerHTML);
    setActiveFormats((prev) => ({ ...prev, [command]: !prev[command] }));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="light" />
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">🚧 Fail Wall 🚧</h1>
        </div>

        <div className="mb-4 border rounded p-3 bg-white shadow">
          <div className="flex gap-2 mb-2">
            {['bold', 'italic', 'underline'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => formatText(cmd)}
                className={`border px-3 py-1 rounded ${cmd === 'bold' ? 'font-bold' : cmd === 'italic' ? 'italic' : 'underline'} ${activeFormats[cmd] ? 'bg-gray-300' : ''}`}
              >
                {cmd.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>

          <div
            contentEditable
            ref={editorRef}
            dir="ltr"
            className="w-full h-24 p-2 border rounded outline-none text-left overflow-y-auto"
            onInput={(e) => setNewPost(e.currentTarget.innerHTML)}
            style={{ direction: "ltr", unicodeBidi: "plaintext" }}
          ></div>

          {media && (
            <div className="mt-2">
              {mediaType === "video" ? (
                <video src={media} controls className="w-full rounded" />
              ) : (
                <img src={media} alt="preview" className="w-full rounded" />
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-4 items-center">
              <label className="cursor-pointer">
                <CameraIcon className="w-5 h-5 text-gray-600 hover:text-black" />
                <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="hidden" />
              </label>
              <SmileIcon
                className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </div>
            <button onClick={handlePost} className="bg-red-500 text-white px-6 py-1.5 rounded-full font-semibold hover:bg-red-600">
              🚀 Post
            </button>
          </div>

          {showEmojiPicker && (
            <div className="z-50 bg-white border rounded shadow-md mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} skinTonesDisabled height={300} width={300} />
            </div>
          )}
        </div>

        <div className="space-y-4">
          {posts.map((post) => {
            const userEmoji = userReactions[post.id];
            const reactionData = predefinedReactions.find((r) => r.emoji === userEmoji);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded shadow"
              >
                <PostCard post={post} onReact={handleReact} onComment={handleComment} onDelete={() => handleDelete(post.id)} />

                {showDeleteConfirm === post.id && (
                  <div className="mt-3 p-4 bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-red-600 text-xl">🗑️</span>
                        <div>
                          <h4 className="text-red-700 font-semibold text-lg">Confirm Deletion</h4>
                          <p className="text-sm text-red-600">Are you sure you want to permanently remove this post? This action cannot be undone.</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => confirmDelete(post.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-medium"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-4 py-1.5 rounded text-sm font-medium"
                        >
                          No, Keep It
                        </button>
                      </div>
                    </div>
                  </div>
                )}

               {reactionData && (
  <div className="mt-3">
    <button
      className={`px-3 py-1 rounded-full border ${reactionData.bg} ${reactionData.text} font-medium shadow-sm flex items-center gap-1`}
      disabled
    >
      <span>{reactionData.emoji}</span>
      <span>1</span>
      <span>{reactionData.label}</span>
    </button>
  </div>
)}


                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {predefinedReactions.map((r) => {
                    const userReactedEmoji = userReactions[post.id];
                    return (
                      <button
                        key={r.emoji}
                        onClick={() => handleReact(post.id, r.emoji)}
                        className={`px-3 py-1 rounded-full border ${r.bg} ${r.text} font-medium shadow-sm hover:shadow-md transition-all duration-200 ${
                          userReactedEmoji === r.emoji ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={userReactedEmoji === r.emoji}
                      >
                        {r.emoji} {r.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FailWall;
