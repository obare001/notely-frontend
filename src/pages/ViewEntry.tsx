import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/api";
import { Calendar, Clock, Edit, Trash2, ArrowLeft, Eye, Save, FileText } from "lucide-react";

export function ViewEntry() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchWithAuth(`/api/entries/entry/${id}`)
      .then((data) => setEntry(data))
      .catch((err) => {
        console.error("Failed to fetch entry:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this entry? This action cannot be undone.")) return;

    try {
      await fetchWithAuth(`/api/entries/entry/${id}`, { method: "DELETE" });
      navigate("/entries");
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate reading time
  const readingTime = entry ? Math.max(1, Math.ceil(entry.content.split(/\s+/).length / 200)) : 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your beautiful entry...</p>
      </div>
    </div>
  );

  if (!entry) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="text-red-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Entry Not Found</h3>
        <p className="text-gray-600 mb-6">The entry you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/entries")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Entries</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/entries")}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm hover:shadow"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Entries</span>
          </button>
        </div>

        {/* Main content card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Entry header with gradient */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{entry.title}</h1>
                <p className="text-blue-100 text-lg">{entry.synopsis}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <Eye className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Meta information */}
          <div className="px-6 md:px-8 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Calendar size={14} />
                <span>Created: {formatDate(entry.createdAt)}</span>
              </div>
              {entry.updatedAt !== entry.createdAt && (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Save size={14} />
                  <span>Updated: {formatDate(entry.updatedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Clock size={14} />
                <span>{readingTime} min read • {entry.content.split(/\s+/).length} words</span>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif text-base md:text-lg">
                {entry.content.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">
                    {paragraph || <br />}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-6 md:px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Trash2 size={18} />
                <span>Delete Entry</span>
              </button>
              <button
                onClick={() => navigate(`/entries/${id}/edit`)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Edit size={18} />
                <span>Edit Entry</span>
              </button>
              <button
                onClick={() => navigate("/entries")}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <ArrowLeft size={18} />
                <span>All Entries</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>This is your personal journal entry. Only you can see this content.</p>
        </div>
      </div>
    </div>
  );
}