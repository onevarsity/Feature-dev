// // import React, { useState } from "react";
// // import PostCard from "./PostCard";
// // import EmojiPicker from "emoji-picker-react";
// // import { CameraIcon, SmileIcon } from "lucide-react";
// // import { motion } from "framer-motion";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const predefinedReactions = [
// //   { emoji: "👍", label: "Relatable", bg: "bg-yellow-100", text: "text-yellow-700" },
// //   { emoji: "🧠", label: "Inspired", bg: "bg-indigo-100", text: "text-indigo-700" },
// //   { emoji: "😅", label: "Funny", bg: "bg-green-100", text: "text-green-700" },
// //   { emoji: "💖", label: "Support", bg: "bg-pink-100", text: "text-pink-700" },
// // ];

// // const FailWall = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [newPost, setNewPost] = useState("");
// //   const [media, setMedia] = useState(null);
// //   const [mediaType, setMediaType] = useState(null);
// //   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
// //   const [showInterviewForm, setShowInterviewForm] = useState(false);
// //   const [userReactions, setUserReactions] = useState({});

// //   const [interviewForm, setInterviewForm] = useState({
// //     name: "Ritwika Maity",
// //     avatar: "https://i.pravatar.cc/150?u=ritwika",
// //     interviewTitle: "",
// //     interviewJourney: "",
// //     interviewWhy: "",
// //     interviewPrep: "",
// //     interviewTip: "",
// //     interviewApp: "",
// //     interviewResume: "",
// //   });

// //   const handlePost = () => {
// //     if (newPost.trim() || media) {
// //       const post = {
// //         id: Date.now(),
// //         name: "You",
// //         avatar: "https://i.pravatar.cc/150?u=you",
// //         content: newPost,
// //         timestamp: "Just now",
// //         reactions: {},
// //         comments: [],
// //         media,
// //         mediaType,
// //       };
// //       setPosts([post, ...posts]);
// //       setNewPost("");
// //       setMedia(null);
// //       setMediaType(null);
// //       setShowEmojiPicker(false);
// //       toast.success("🎉 Post submitted successfully!");
// //     }
// //   };

// //   const handleMediaChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setMedia(reader.result);
// //       setMediaType(file.type.startsWith("video") ? "video" : "image");
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleInterviewSubmit = () => {
// //     const post = {
// //       id: Date.now(),
// //       name: interviewForm.name,
// //       avatar: interviewForm.avatar,
// //       timestamp: "Just now",
// //       isInterview: true,
// //       ...interviewForm,
// //       reactions: {},
// //       comments: [],
// //     };
// //     setPosts([post, ...posts]);
// //     setInterviewForm({
// //       name: "Ritwika Maity",
// //       avatar: "https://i.pravatar.cc/150?u=ritwika",
// //       interviewTitle: "",
// //       interviewJourney: "",
// //       interviewWhy: "",
// //       interviewPrep: "",
// //       interviewTip: "",
// //       interviewApp: "",
// //       interviewResume: "",
// //     });
// //     setShowInterviewForm(false);
// //     toast.success("✅ Interview Experience posted!");
// //   };

// //   const handleReact = (postId, emoji) => {
// //     if (userReactions[`${postId}-${emoji}`]) return;

// //     setPosts((prev) =>
// //       prev.map((post) => {
// //         if (post.id !== postId) return post;
// //         const prevCount = post.reactions?.[emoji]?.count || 0;
// //         return {
// //           ...post,
// //           reactions: {
// //             ...post.reactions,
// //             [emoji]: {
// //               count: prevCount + 1,
// //             },
// //           },
// //         };
// //       })
// //     );
// //     setUserReactions((prev) => ({ ...prev, [`${postId}-${emoji}`]: true }));
// //   };

// //   const handleComment = (postId, updatedComments) => {
// //     setPosts((prev) =>
// //       prev.map((post) => (post.id === postId ? { ...post, comments: updatedComments } : post))
// //     );
// //   };

// //   const handleEmojiClick = (emojiData) => {
// //     setNewPost((prev) => prev + emojiData.emoji);
// //   };

// //   return (
// //     <div className="bg-gray-100 min-h-screen py-6">
// //       <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="light" />
// //       <div className="max-w-2xl mx-auto p-4">
// //         <div className="flex justify-between items-center mb-6">
// //           <h1 className="text-4xl font-extrabold text-blue-600">🚧 Fail Wall 🚧</h1>
// //         </div>

// //         <div className="flex justify-center mb-4">
// //           <button
// //             className={`px-4 py-2 rounded-full text-white font-semibold shadow transition-all duration-300 ${
// //               showInterviewForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
// //             }`}
// //             onClick={() => setShowInterviewForm(!showInterviewForm)}
// //           >
// //             {showInterviewForm ? "Cancel Interview Post" : "Share Interview Experience"}
// //           </button>
// //         </div>

// //         {showInterviewForm && (
// //           <div className="bg-white p-4 rounded shadow mb-4 space-y-2">
// //             {[{ label: "Title", key: "interviewTitle" },
// //               { label: "Journey", key: "interviewJourney" },
// //               { label: "Why Selected/Rejected", key: "interviewWhy" },
// //               { label: "Preparation", key: "interviewPrep" },
// //               { label: "Tip", key: "interviewTip" },
// //               { label: "Application Process", key: "interviewApp" },
// //               { label: "Resume Tip", key: "interviewResume" }].map((field) => (
// //               <div key={field.key}>
// //                 <label className="font-medium">{field.label}</label>
// //                 <textarea
// //                   className="w-full border rounded p-2"
// //                   rows={2}
// //                   value={interviewForm[field.key]}
// //                   onChange={(e) =>
// //                     setInterviewForm({ ...interviewForm, [field.key]: e.target.value })
// //                   }
// //                 />
// //               </div>
// //             ))}

// //             <button
// //               onClick={handleInterviewSubmit}
// //               className="bg-green-600 text-white px-4 py-2 rounded w-full mt-2 hover:bg-green-700"
// //             >
// //               ✅ Submit Interview Experience
// //             </button>
// //           </div>
// //         )}

// //         <div className="mb-4 border rounded p-3 bg-white shadow">
// //           <textarea
// //             value={newPost}
// //             onChange={(e) => setNewPost(e.target.value)}
// //             placeholder="Share your fail moment..."
// //             className="w-full h-24 resize-none outline-none border p-2 rounded"
// //           />

// //           {media && (
// //             <div className="mt-2">
// //               {mediaType === "video" ? (
// //                 <video src={media} controls className="w-full rounded" />
// //               ) : (
// //                 <img src={media} alt="preview" className="w-full rounded" />
// //               )}
// //             </div>
// //           )}

// //           <div className="flex items-center justify-between mt-3">
// //             <div className="flex gap-4 items-center">
// //               <label className="cursor-pointer">
// //                 <CameraIcon className="w-5 h-5 text-gray-600 hover:text-black" />
// //                 <input
// //                   type="file"
// //                   accept="image/*,video/*"
// //                   onChange={handleMediaChange}
// //                   className="hidden"
// //                 />
// //               </label>
// //               <SmileIcon
// //                 className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
// //                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
// //               />
// //             </div>
// //             <button
// //               onClick={handlePost}
// //               className="bg-red-500 text-white px-6 py-1.5 rounded-full font-semibold hover:bg-red-600"
// //             >
// //               🚀 Post
// //             </button>
// //           </div>

// //           {showEmojiPicker && (
// //             <div className="z-50 bg-white border rounded shadow-md mt-2">
// //               <EmojiPicker
// //                 onEmojiClick={handleEmojiClick}
// //                 skinTonesDisabled
// //                 height={300}
// //                 width={300}
// //               />
// //             </div>
// //           )}
// //         </div>

// //         <div className="space-y-4">
// //           {posts.map((post) => (
// //             <motion.div
// //               key={post.id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.4 }}
// //               className="bg-white p-4 rounded shadow"
// //             >
// //               <PostCard
// //                 post={post}
// //                 onReact={handleReact}
// //                 onComment={handleComment}
// //               />
// //               <div className="mt-3 flex flex-wrap gap-2 text-sm">
// //                 {predefinedReactions.map((r) => (
// //                   <button
// //                     key={r.emoji}
// //                     onClick={() => handleReact(post.id, r.emoji)}
// //                     className={`px-3 py-1 rounded-full border ${r.bg} ${r.text} font-medium shadow-sm hover:shadow-md transition-all duration-200 ${
// //                       userReactions[`${post.id}-${r.emoji}`] ? "opacity-50 cursor-not-allowed" : ""
// //                     }`}
// //                   >
// //                     {r.emoji} {r.label}
// //                   </button>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FailWall;
// // ✅ FINAL FIXED: PostCard.jsx – Prevent like from modifying structure
// import React, { useState } from "react";
// import PostCard from "./PostCard";
// import EmojiPicker from "emoji-picker-react";
// import { CameraIcon, SmileIcon } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const predefinedReactions = [
//   { emoji: "👍", label: "Relatable", bg: "bg-yellow-100", text: "text-yellow-700" },
//   { emoji: "🧠", label: "Inspired", bg: "bg-indigo-100", text: "text-indigo-700" },
//   { emoji: "😅", label: "Funny", bg: "bg-green-100", text: "text-green-700" },
//   { emoji: "💖", label: "Support", bg: "bg-pink-100", text: "text-pink-700" },
// ];

// const FailWall = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [media, setMedia] = useState(null);
//   const [mediaType, setMediaType] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [userReactions, setUserReactions] = useState({});

//   const handlePost = () => {
//     if (newPost.trim() || media) {
//       const post = {
//         id: Date.now(),
//         name: "You",
//         avatar: "https://i.pravatar.cc/150?u=you",
//         content: newPost,
//         timestamp: "Just now",
//         reactions: {},
//         comments: [],
//         media,
//         mediaType,
//       };
//       setPosts([post, ...posts]);
//       setNewPost("");
//       setMedia(null);
//       setMediaType(null);
//       setShowEmojiPicker(false);
//       toast.success("🎉 Post submitted successfully!");
//     }
//   };

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setMedia(reader.result);
//       setMediaType(file.type.startsWith("video") ? "video" : "image");
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleReact = (postId, emoji) => {
//     const userKeyPrefix = `${postId}-`;
//     if (Object.keys(userReactions).some((key) => key.startsWith(userKeyPrefix))) return;

//     setPosts((prev) =>
//       prev.map((post) => {
//         if (post.id !== postId) return post;
//         const prevCount = post.reactions?.[emoji]?.count || 0;
//         return {
//           ...post,
//           reactions: {
//             ...post.reactions,
//             [emoji]: {
//               count: prevCount + 1,
//             },
//           },
//         };
//       })
//     );
//     setUserReactions((prev) => ({ ...prev, [`${postId}-${emoji}`]: true }));
//   };

//   const handleComment = (postId, updatedComments) => {
//     setPosts((prev) =>
//       prev.map((post) => (post.id === postId ? { ...post, comments: updatedComments } : post))
//     );
//   };

//   const handleEmojiClick = (emojiData) => {
//     setNewPost((prev) => prev + emojiData.emoji);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen py-6">
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="light" />
//       <div className="max-w-2xl mx-auto p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-4xl font-extrabold text-blue-600">🚧 Fail Wall 🚧</h1>
//         </div>

//         <div className="mb-4 border rounded p-3 bg-white shadow">
//           <textarea
//             value={newPost}
//             onChange={(e) => setNewPost(e.target.value)}
//             placeholder="Share your fail moment..."
//             className="w-full h-24 resize-none outline-none border p-2 rounded"
//           />

//           {media && (
//             <div className="mt-2">
//               {mediaType === "video" ? (
//                 <video src={media} controls className="w-full rounded" />
//               ) : (
//                 <img src={media} alt="preview" className="w-full rounded" />
//               )}
//             </div>
//           )}

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex gap-4 items-center">
//               <label className="cursor-pointer">
//                 <CameraIcon className="w-5 h-5 text-gray-600 hover:text-black" />
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   onChange={handleMediaChange}
//                   className="hidden"
//                 />
//               </label>
//               <SmileIcon
//                 className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//               />
//             </div>
//             <button
//               onClick={handlePost}
//               className="bg-red-500 text-white px-6 py-1.5 rounded-full font-semibold hover:bg-red-600"
//             >
//               🚀 Post
//             </button>
//           </div>

//           {showEmojiPicker && (
//             <div className="z-50 bg-white border rounded shadow-md mt-2">
//               <EmojiPicker
//                 onEmojiClick={handleEmojiClick}
//                 skinTonesDisabled
//                 height={300}
//                 width={300}
//               />
//             </div>
//           )}
//         </div>

//         <div className="space-y-4">
//           {posts.map((post) => (
//             <motion.div
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-white p-4 rounded shadow"
//             >
//               <PostCard
//                 post={post}
//                 onReact={handleReact}
//                 onComment={handleComment}
//               />
//               <div className="mt-3 flex flex-wrap gap-2 text-sm">
//                 {predefinedReactions.map((r) => (
//                   <button
//                     key={r.emoji}
//                     onClick={() => handleReact(post.id, r.emoji)}
//                     disabled={Object.keys(userReactions).some((key) => key.startsWith(`${post.id}-`))}
//                     className={`px-3 py-1 rounded-full border ${r.bg} ${r.text} font-medium shadow-sm hover:shadow-md transition-all duration-200 ${
//                       userReactions[`${post.id}-${r.emoji}`] ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     {r.emoji} {r.label}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FailWall;
// ✅ FINAL FIXED: PostCard.jsx – Prevent like from modifying structure
import React, { useState, useRef } from "react";
import PostCard from "./PostCard";
import EmojiPicker from "emoji-picker-react";
import { CameraIcon, SmileIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const predefinedReactions = [
  {
    emoji: "👍",
    label: "Relatable",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  {
    emoji: "🧠",
    label: "Inspired",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
  },
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
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

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
    const existingKey = Object.keys(userReactions).find((key) =>
      key.startsWith(`${postId}-`)
    );
    const previousEmoji = existingKey?.split("-")[1];

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        const updatedReactions = { ...post.reactions };
        if (previousEmoji === emoji) {
          updatedReactions[emoji].count = Math.max(
            (updatedReactions[emoji]?.count || 1) - 1,
            0
          );
          return {
            ...post,
            reactions: updatedReactions,
          };
        }
        if (previousEmoji) {
          updatedReactions[previousEmoji].count = Math.max(
            (updatedReactions[previousEmoji]?.count || 1) - 1,
            0
          );
        }
        updatedReactions[emoji] = {
          count: (updatedReactions[emoji]?.count || 0) + 1,
        };

        return {
          ...post,
          reactions: updatedReactions,
        };
      })
    );
    setUserReactions((prev) => {
      const updated = { ...prev };
      if (previousEmoji === emoji) {
        delete updated[`${postId}-${emoji}`];
        return updated;
      }
      if (previousEmoji) {
        delete updated[`${postId}-${previousEmoji}`];
      }

      updated[`${postId}-${emoji}`] = true;
      return updated;
    });
  };

  const handleComment = (postId, updatedComments) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: updatedComments } : post
      )
    );
  };

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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="light"
      />
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">
            🚧 Fail Wall 🚧
          </h1>
        </div>

        <div className="mb-4 border rounded p-3 bg-white shadow">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => formatText("bold")}
              className={`border px-3 py-1 font-bold rounded ${
                activeFormats.bold ? "bg-gray-300" : ""
              }`}
            >
              B
            </button>
            <button
              onClick={() => formatText("italic")}
              className={`border px-3 py-1 italic rounded ${
                activeFormats.italic ? "bg-gray-300" : ""
              }`}
            >
              I
            </button>
            <button
              onClick={() => formatText("underline")}
              className={`border px-3 py-1 underline rounded ${
                activeFormats.underline ? "bg-gray-300" : ""
              }`}
            >
              U
            </button>
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
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
              <SmileIcon
                className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </div>
            <button
              onClick={handlePost}
              className="bg-red-500 text-white px-6 py-1.5 rounded-full font-semibold hover:bg-red-600"
            >
              🚀 Post
            </button>
          </div>

          {showEmojiPicker && (
            <div className="z-50 bg-white border rounded shadow-md mt-2">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                skinTonesDisabled
                height={300}
                width={300}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          {posts.map((post) => {
            // 👇 Place this here, inside the post loop
            const currentEmojiKey = Object.keys(userReactions).find((key) =>
              key.startsWith(`${post.id}-`)
            );
            const currentEmoji = currentEmojiKey?.split("-")[1];

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded shadow"
              >
                <PostCard
                  post={post}
                  onReact={handleReact}
                  onComment={handleComment}
                />
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {predefinedReactions.map((r) => {
                    const isCurrent = currentEmoji === r.emoji;

                    return (
                      <button
                        key={r.emoji}
                        onClick={() => handleReact(post.id, r.emoji)}
                        className={`px-3 py-1 rounded-full border ${r.bg} ${
                          r.text
                        } font-medium shadow-sm hover:shadow-md transition-all duration-200 ${
                          isCurrent ? "ring-2 ring-offset-1 ring-black/50" : ""
                        }`}
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
