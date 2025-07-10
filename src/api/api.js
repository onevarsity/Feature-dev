const BASE_URL = "http://localhost:3000/api";

export const getAllPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  return res.json();
};

export const createPost = async (postData) => {
    console.log(postData);
    const { content,author } = postData;
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, author }),
  });
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
  return res.json();
};

export const addReaction = async (id, type, user) => {
  const res = await fetch(`${BASE_URL}/posts/${id}/reactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, user }),
  });
  return res.json();
};

export const addComment = async (postId, content, author) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, author }),
  });
  return res.json();
};

export const editComment = async (postId, commentId, content) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return res.json();
};

export const deleteComment = async (postId, commentId) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });
  return res.json();
};
