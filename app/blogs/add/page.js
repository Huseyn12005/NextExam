"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextEditor from "../../../components/TextEditor";
import Loading from "@/components/loading";

const CreateBlog = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "",
    thumbnail: "",
  });

  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ success: false, error: null });

  useEffect(() => {
    const isFilled =
      form.title.trim() && form.body.trim() && form.category.trim();
    setFormReady(!!isFilled);
  }, [form]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const uploadThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setForm((prev) => ({ ...prev, thumbnail: result }));
    };
    reader.readAsDataURL(file);
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    if (!formReady) return;

    setSubmitting(true);
    setFeedback({ success: false, error: null });

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category: Number(form.category) }),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.message || "Could not submit blog.");
      }

      setFeedback({ success: true, error: null });
      setForm({ title: "", body: "", category: "", thumbnail: "" });
      router.push("/profile");
    } catch (err) {
      setFeedback({ success: false, error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        setCategories(json.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <Loading type="gif" />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-6 dark:text-white">
            New Blog Post
          </h1>

          {feedback.success && (
            <div className="bg-green-100 dark:bg-green-900/80 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-100 px-4 py-3 rounded mb-4">
              Blog post created successfully!
            </div>
          )}

          {feedback.error && (
            <div className="bg-red-100 dark:bg-red-900/80 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-4">
              {feedback.error}
            </div>
          )}

          <form onSubmit={submitBlog} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={updateForm}
                required
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Content *
              </label>
              <div className="border rounded-md dark:border-gray-600 dark:bg-gray-800">
                <TextEditor
                  value={form.body}
                  onChange={(content) =>
                    setForm((prev) => ({ ...prev, body: content }))
                  }
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={updateForm}
                required
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Add Thumbnail Image
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onChange={uploadThumbnail}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!formReady || submitting}
                className={`px-4 py-2 rounded-md text-white ${
                  !formReady || submitting
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                }`}
              >
                {submitting ? "Submitting..." : "Create Blog Post"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateBlog;
