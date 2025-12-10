// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../api/api";

// export function CreateEntry() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ title: "", synopsis: "", content: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await fetchWithAuth("/api/entries", { method: "POST", body: JSON.stringify(form) });
//       navigate("/entries");
//     } catch (err: any) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-2xl mb-4">Create Entry</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//         <input name="synopsis" placeholder="Synopsis" value={form.synopsis} onChange={handleChange} required />
//         <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
//         <button type="submit" className="bg-primary text-white p-2 rounded">Create</button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/api";
import { 
  Save, 
  ArrowLeft,
  Type,
  FileText,
  BookOpen,
  Calendar,
  Sparkles
} from "lucide-react";

export function CreateEntry() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", synopsis: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchWithAuth("/api/entries", { method: "POST", body: JSON.stringify(form) });
      navigate("/entries");
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/entries")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Entries</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Entry</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <span className="text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">New Entry</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Type className="text-blue-600" size={20} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">Title</label>
              <p className="text-sm text-gray-500">Give your entry a meaningful title</p>
            </div>
          </div>
          <input
            name="title"
            placeholder="What's on your mind today?"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all placeholder:text-gray-400 hover:border-gray-400"
            maxLength={100}
          />
          <div className="mt-2 text-sm text-gray-500 flex justify-end">
            <span>{form.title.length}/100</span>
          </div>
        </div>

        {/* Synopsis Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="text-green-600" size={20} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">Synopsis</label>
              <p className="text-sm text-gray-500">Brief summary of your entry</p>
            </div>
          </div>
          <input
            name="synopsis"
            placeholder="A short summary of what you're writing about..."
            value={form.synopsis}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all placeholder:text-gray-400 hover:border-gray-400"
            maxLength={200}
          />
          <div className="mt-2 text-sm text-gray-500 flex justify-end">
            <span>{form.synopsis.length}/200</span>
          </div>
        </div>

        {/* Content Section - Large text area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <BookOpen className="text-purple-600" size={20} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">Content</label>
              <p className="text-sm text-gray-500">Pour your thoughts here</p>
            </div>
          </div>
          <textarea
            name="content"
            placeholder="Start writing your thoughts, feelings, ideas, or experiences...
            
You can write as much as you want here. This is your personal space to express yourself freely.

• Use bullet points for lists
• Add paragraphs for different thoughts
• Don't worry about perfection - just write!"
            value={form.content}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all placeholder:text-gray-400 min-h-[400px] resize-y font-mono text-base leading-relaxed hover:border-gray-400"
            rows={15}
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Writing is a journey - take your time
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {form.content.length} characters • ~{Math.ceil(form.content.length / 5)} words
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/entries")}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create Entry
              </>
            )}
          </button>
        </div>

        {/* Writing Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-blue-600" />
            Writing Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <span>Write freely without self-editing during your first draft</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <span>Include specific details, feelings, and sensory experiences</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
              <span>Use paragraphs to separate different thoughts or ideas</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
              <span>Regular journaling builds self-awareness and clarity</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}