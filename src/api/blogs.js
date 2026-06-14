import { apiUrl } from "../config";

async function request(endpoint, options = {}) {
  const res = await fetch(apiUrl(endpoint), {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Public
export const getBlogs = () => request("/api/blogs");
export const getBlogBySlug = (slug) => request(`/api/blogs/${slug}`);

// Admin
export const getAllBlogsAdmin = () => request("/api/blogs/admin/all");
export const createBlog = (body) => request("/api/blogs", { method: "POST", body: JSON.stringify(body) });
export const updateBlog = (id, body) => request(`/api/blogs/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deleteBlog = (id) => request(`/api/blogs/${id}`, { method: "DELETE" });

// Image upload → { imageUrl, filename }. Field name is "image" (adjust if the backend differs).
export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(apiUrl("/api/upload"), { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  return res.json();
}

// Normalize whatever shape the list endpoints return into an array.
export const toBlogArray = (data) =>
  Array.isArray(data) ? data : (data?.blogs || data?.data || []);
