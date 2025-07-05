
// import React, { useState } from "react";

// const PostCard = ({ post, onReact, onComment }) => {
//   const [commentText, setCommentText] = useState("");
//   const [replyTexts, setReplyTexts] = useState({});

//   if (!post || typeof post !== "object") return null; // prevent rendering errors

//   const handleCommentSubmit = () => {
//     if (commentText.trim()) {
//       const newComment = {
//         id: Date.now(),
//         author: "You",
//         isAuthor: true,
//         text: commentText,
//         timestamp: new Date().toLocaleTimeString(),
//         replies: [],
//         likes: 0,
//       };
//       const updatedComments = [...(post.comments || []), newComment];
//       onComment(post.id, updatedComments);
//       setCommentText("");
//     }
//   };

//   const handleReplySubmit = (commentId) => {
//     const reply = replyTexts[commentId];
//     if (reply && reply.trim()) {
//       const updatedComments = (post.comments || []).map((comment) => {
//         if (comment.id !== commentId) return comment;
//         return {
//           ...comment,
//           replies: [
//             ...(comment.replies || []),
//             {
//               id: Date.now(),
//               author: "You",
//               isAuthor: true,
//               text: reply,
//               timestamp: new Date().toLocaleTimeString(),
//               likes: 0,
//             },
//           ],
//         };
//       });
//       onComment(post.id, updatedComments);
//       setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
//     }
//   };

//   const handleLike = (commentId, isReply = false, replyId = null) => {
//     const updatedComments = (post.comments || []).map((comment) => {
//       if (comment.id !== commentId) return comment;
//       if (!isReply) {
//         return {
//           ...comment,
//           likes: (comment.likes || 0) + 1,
//         };
//       } else {
//         return {
//           ...comment,
//           replies: (comment.replies || []).map((reply) => {
//             if (reply.id !== replyId) return reply;
//             return {
//               ...reply,
//               likes: (reply.likes || 0) + 1,
//             };
//           }),
//         };
//       }
//     });
//     onComment(post.id, updatedComments);
//   };

//   return (
//     <div className="bg-white p-4 rounded shadow space-y-2">
//       <div className="flex items-start space-x-3">
//         <img
//           src={post.avatar}
//           alt="avatar"
//           className="w-10 h-10 rounded-full"
//         />
//         <div>
//           <div className="font-semibold">{post.name}</div>
//           <div className="text-gray-500 text-sm">{post.timestamp}</div>
//           {post.isInterview ? (
//             <div className="mt-2 space-y-2">
//               <div>
//                 <span className="font-semibold">📌 {post.interviewTitle}</span>
//               </div>
//               <div>
//                 <strong>📘 Journey</strong>
//                 <div className="text-sm">{post.interviewJourney}</div>
//               </div>
//               <div>
//                 <strong>🎯 Why Selected/Rejected</strong>
//                 <div className="text-sm">{post.interviewWhy}</div>
//               </div>
//               <div>
//                 <strong>📅 Preparation</strong>
//                 <div className="text-sm">{post.interviewPrep}</div>
//               </div>
//               <div>
//                 <strong>💡 Tip</strong>
//                 <div className="text-sm">{post.interviewTip}</div>
//               </div>
//               <div>
//                 <strong>📂 Application Process</strong>
//                 <div className="text-sm">{post.interviewApp}</div>
//               </div>
//               <div>
//                 <strong>🧾 Resume Tip</strong>
//                 <div className="text-sm">{post.interviewResume}</div>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-1">{post.content}</div>
//           )}

//           {post.media && (
//             <div className="mt-2">
//               {post.mediaType === "video" ? (
//                 <video src={post.media} controls className="w-full rounded" />
//               ) : (
//                 <img src={post.media} alt="media" className="w-full rounded" />
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex space-x-2 text-sm mt-2">
//         {Object.entries(post.reactions || {}).map(([emoji, data]) => (
//           <span key={emoji} className="bg-gray-100 px-2 py-1 rounded">
//             {emoji} {data.count}
//           </span>
//         ))}
//       </div>

//       <div className="mt-3 flex space-x-2">
//         <input
//           type="text"
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           placeholder="Write a comment..."
//           className="flex-1 border rounded px-3 py-1"
//         />
//         <button
//           onClick={handleCommentSubmit}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           Comment
//         </button>
//       </div>

//       <div className="mt-2 space-y-2">
//         {(post.comments || []).map((comment) => (
//           <div key={comment.id} className="pl-4 border-l">
//             <div className="flex items-start space-x-2">
//               <img
//                 src="https://i.pravatar.cc/40?u=comment"
//                 alt="avatar"
//                 className="w-8 h-8 rounded-full"
//               />
//               <div>
//                 <div className="text-sm font-semibold flex items-center">
//                   {comment.author}
//                   {comment.isAuthor && (
//                     <span className="ml-2 text-xs bg-gray-200 px-1 rounded">
//                       Author
//                     </span>
//                   )}
//                 </div>
//                 <div className="text-sm">{comment.text}</div>
//                 <div className="text-xs text-gray-500 flex space-x-4 mt-1">
//                   <span>{comment.timestamp}</span>
//                   <span
//                     className="cursor-pointer hover:underline"
//                     onClick={() => handleLike(comment.id)}
//                   >
//                     Like ({comment.likes || 0})
//                   </span>
//                   <span className="cursor-pointer hover:underline">Reply</span>
//                 </div>

//                 <div className="mt-1 flex space-x-2">
//                   <input
//                     type="text"
//                     value={replyTexts[comment.id] || ""}
//                     onChange={(e) =>
//                       setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })
//                     }
//                     placeholder="Write a reply..."
//                     className="border rounded px-2 py-1 text-sm"
//                   />
//                   <button
//                     onClick={() => handleReplySubmit(comment.id)}
//                     className="text-blue-500 text-sm"
//                   >
//                     Reply
//                   </button>
//                 </div>

//                 {(comment.replies || []).map((reply) => (
//                   <div
//                     key={reply.id}
//                     className="mt-2 pl-6 flex items-start space-x-2"
//                   >
//                     <img
//                       src="https://i.pravatar.cc/40?u=reply"
//                       alt="avatar"
//                       className="w-7 h-7 rounded-full"
//                     />
//                     <div>
//                       <div className="text-sm font-semibold flex items-center">
//                         <span className="text-blue-600">{reply.author}</span>
//                         {reply.isAuthor && (
//                           <span className="ml-2 text-xs bg-gray-200 px-1 rounded">
//                             Author
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-sm">{reply.text}</div>
//                       <div className="text-xs text-gray-500 flex space-x-4 mt-1">
//                         <span>{reply.timestamp}</span>
//                         <span
//                           className="cursor-pointer hover:underline"
//                           onClick={() => handleLike(comment.id, true, reply.id)}
//                         >
//                           Like ({reply.likes || 0})
//                         </span>
//                         <span className="cursor-pointer hover:underline">Reply</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostCard;
// ✅ FINAL FIXED: PostCard.jsx – Prevent like from modifying structure
import React, { useState } from "react";

const PostCard = ({ post, onComment }) => {
  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState({});

  if (!post || typeof post !== "object") return null; // prevent rendering errors

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: "You",
        isAuthor: true,
        text: commentText,
        timestamp: new Date().toLocaleTimeString(),
        replies: [],
        likes: 0,
      };
      const updatedComments = [...(post.comments || []), newComment];
      onComment(post.id, updatedComments);
      setCommentText("");
    }
  };

  const handleReplySubmit = (commentId) => {
    const reply = replyTexts[commentId];
    if (reply && reply.trim()) {
      const updatedComments = (post.comments || []).map((comment) => {
        if (comment.id !== commentId) return comment;
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: "You",
              isAuthor: true,
              text: reply,
              timestamp: new Date().toLocaleTimeString(),
              likes: 0,
            },
          ],
        };
      });
      onComment(post.id, updatedComments);
      setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
    }
  };

  const handleLike = (commentId, isReply = false, replyId = null) => {
    const updatedComments = (post.comments || []).map((comment) => {
      if (comment.id !== commentId) return comment;
      if (!isReply) {
        return {
          ...comment,
          likes: (comment.likes || 0) + 1,
        };
      } else {
        return {
          ...comment,
          replies: (comment.replies || []).map((reply) => {
            if (reply.id !== replyId) return reply;
            return {
              ...reply,
              likes: (reply.likes || 0) + 1,
            };
          }),
        };
      }
    });
    onComment(post.id, updatedComments);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <div className="flex items-start space-x-3">
        <img
          src={post.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold">{post.name}</div>
          <div className="text-gray-500 text-sm">{post.timestamp}</div>
          {post.isInterview ? (
            <div className="mt-2 space-y-2">
              <div>
                <span className="font-semibold">📌 {post.interviewTitle}</span>
              </div>
              <div>
                <strong>📘 Journey</strong>
                <div className="text-sm">{post.interviewJourney}</div>
              </div>
              <div>
                <strong>🎯 Why Selected/Rejected</strong>
                <div className="text-sm">{post.interviewWhy}</div>
              </div>
              <div>
                <strong>📅 Preparation</strong>
                <div className="text-sm">{post.interviewPrep}</div>
              </div>
              <div>
                <strong>💡 Tip</strong>
                <div className="text-sm">{post.interviewTip}</div>
              </div>
              <div>
                <strong>📂 Application Process</strong>
                <div className="text-sm">{post.interviewApp}</div>
              </div>
              <div>
                <strong>🧾 Resume Tip</strong>
                <div className="text-sm">{post.interviewResume}</div>
              </div>
            </div>
          ) : (
            <div className="mt-1" dangerouslySetInnerHTML={{ __html: post.content }} />
          )}

          {post.media && (
            <div className="mt-2">
              {post.mediaType === "video" ? (
                <video src={post.media} controls className="w-full rounded" />
              ) : (
                <img src={post.media} alt="media" className="w-full rounded" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm mt-2">
        {post.reactions &&
          Object.entries(post.reactions).map(([emoji, data]) => (
            <span key={emoji} className="bg-gray-100 px-2 py-1 rounded">
              {emoji} {data.count}
            </span>
          ))}
      </div>

      <div className="mt-3 flex space-x-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded px-3 py-1"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Comment
        </button>
      </div>

      <div className="mt-2 space-y-2">
        {(post.comments || []).map((comment) => (
          <div key={comment.id} className="pl-4 border-l">
            <div className="flex items-start space-x-2">
              <img
                src="https://i.pravatar.cc/40?u=comment"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-sm font-semibold flex items-center">
                  {comment.author}
                  {comment.isAuthor && (
                    <span className="ml-2 text-xs bg-gray-200 px-1 rounded">
                      Author
                    </span>
                  )}
                </div>
                <div className="text-sm">{comment.text}</div>
                <div className="text-xs text-gray-500 flex space-x-4 mt-1">
                  <span>{comment.timestamp}</span>
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => handleLike(comment.id)}
                  >
                    Like ({comment.likes || 0})
                  </span>
                  <span className="cursor-pointer hover:underline">Reply</span>
                </div>

                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    value={replyTexts[comment.id] || ""}
                    onChange={(e) =>
                      setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })
                    }
                    placeholder="Write a reply..."
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <button
                    onClick={() => handleReplySubmit(comment.id)}
                    className="text-blue-500 text-sm"
                  >
                    Reply
                  </button>
                </div>

                {(comment.replies || []).map((reply) => (
                  <div
                    key={reply.id}
                    className="mt-2 pl-6 flex items-start space-x-2"
                  >
                    <img
                      src="https://i.pravatar.cc/40?u=reply"
                      alt="avatar"
                      className="w-7 h-7 rounded-full"
                    />
                    <div>
                      <div className="text-sm font-semibold flex items-center">
                        <span className="text-blue-600">{reply.author}</span>
                        {reply.isAuthor && (
                          <span className="ml-2 text-xs bg-gray-200 px-1 rounded">
                            Author
                          </span>
                        )}
                      </div>
                      <div className="text-sm">{reply.text}</div>
                      <div className="text-xs text-gray-500 flex space-x-4 mt-1">
                        <span>{reply.timestamp}</span>
                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() => handleLike(comment.id, true, reply.id)}
                        >
                          Like ({reply.likes || 0})
                        </span>
                        <span className="cursor-pointer hover:underline">Reply</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;

