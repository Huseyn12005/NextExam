"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextEditor from "@/components/TextEditor";
import Loading from "@/components/loading";

const BlogEditor = ({ params }) => {
  const [data, setData] = useState({
    title: "",
    body: "",
    category: "",
    thumbnail: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ error: null, success: false });
  const [valid, setValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${params.id}`);
        const result = await res.json();

        if (result.blog.author.id !== result.userId) {
          router.push("/profile");
          return;
        }

        setData({
          title: result.blog.title || "",
          body: result.blog.body || "<p></p>",
          category: result.blog.category?.id?.toString() || "",
          thumbnail: result.blog.thumbnail || "",
        });
      } catch (err) {
        console.error("Failed to load blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id, router]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch("/api/categories");
        const resData = await response.json();
        setCategories(resData.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCats();
  }, []);

  useEffect(() => {
    const valid = data.title.trim() && data.body.trim() && data.category;
    setValid(Boolean(valid));
  }, [data]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const updateBody = (val) => {
    setData((prev) => ({ ...prev, body: val }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!valid) return;

    setSubmitting(true);
    setFeedback({ error: null, success: false });

    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, category: Number(data.category) }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Update failed");
      }

      setFeedback({ success: true, error: null });
      router.push("/profile");
    } catch (err) {
      setFeedback({ success: false, error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading type="gif" />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <main className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 dark:text-white">Edit Blog Post</h1>

          {feedback.success && (
            <div className="bg-green-100 dark:bg-green-900/80 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100 px-4 py-3 rounded mb-4">
              Blog post edited successfully!
            </div>
          )}

          {feedback.error && (
            <div className="bg-red-100 dark:bg-red-900/80 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-4">
              {feedback.error}
            </div>
          )}

          <form onSubmit={submitForm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input
                name="title"
                value={data.title}
                onChange={handleInput}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="min-h-[300px] border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
              <TextEditor value={data.body} onChange={updateBody} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select
                name="category"
                value={data.category}
                onChange={handleInput}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail URL (Optional)</label>
              <input
                type="url"
                name="thumbnail"
                value={data.thumbnail}
                onChange={handleInput}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!valid || submitting}
                className={`px-4 py-2 rounded-md text-white ${
                  !valid || submitting
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                }`}
              >
                {submitting ? "Submitting..." : "Edit Blog Post"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default BlogEditor;
