// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../api/api";

// export function UpdateEntry() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ title: "", synopsis: "", content: "", isPublic: false });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
    
//     setLoading(true);
//     setError(null);
    
//     fetchWithAuth(`/api/entries/entry/${id}`)
//       .then((data) => {
//         setForm(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load entry. Please try again.");
//         setLoading(false);
//       });
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
//     setForm({ ...form, [e.target.name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
    
//     try {
//       await fetchWithAuth(`/api/entries/entry/${id}`, { 
//         method: "PATCH", 
//         body: JSON.stringify(form) 
//       });
//       navigate("/entries");
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Failed to update entry. Please try again.");
//     }
//   };

//   if (loading) return <div className="p-6">Loading entry...</div>;
//   if (error) return <div className="p-6 text-red-600">{error}</div>;

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl mb-4">Edit Entry</h1>
//       {error && <div className="text-red-600 mb-4">{error}</div>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//         <input name="synopsis" placeholder="Synopsis" value={form.synopsis} onChange={handleChange} required />
//         <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required rows={10} />
//         <label className="flex items-center gap-2">
//           <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
//           <span>Make this entry public</span>
//         </label>
//         <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition">
//           Update Entry
//         </button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/api";

export function UpdateEntry() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    content: "",
    isPublic: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetchWithAuth(`/api/entries/entry/${id}`)
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load entry. Please try again.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await fetchWithAuth(`/api/entries/entry/${id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });
      navigate("/entries");
    } catch (err: any) {
      setError(err.message || "Failed to update entry. Please try again.");
    }
  };

  if (loading)
    return <div className="p-6 text-gray-600 text-lg">Loading entry...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 text-lg font-medium bg-red-50 rounded">
        {error}
      </div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          ✏️ Edit Entry
        </h1>

        {error && (
          <div className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Enter a descriptive title"
              required
            />
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Synopsis <span className="text-red-600">*</span>
            </label>
            <input
              name="synopsis"
              value={form.synopsis}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Short summary of entry"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Content <span className="text-red-600">*</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={10}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Write your entry content here..."
              required
            ></textarea>
          </div>

          {/* Public Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-400"
            />
            <span className="text-gray-700 font-medium">
              Make this entry public
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition w-full"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/entries")}
              className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
