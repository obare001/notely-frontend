
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/api";
import { 
  Trash2, 
  RotateCcw, 
  AlertTriangle,
  FileText,
  Calendar,
  Clock
} from "lucide-react";

export function DeletedEntries() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const restoreEntry = async (id: string) => {
    try {
      await fetchWithAuth(`/api/entries/entry/restore/${id}`, { method: "PATCH" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to restore:", err);
    }
  };

  const deletePermanently = async (id: string) => {
    if (!window.confirm("Are you sure? This will permanently delete the entry and cannot be undone!")) {
      return;
    }
    
    try {
      await fetchWithAuth(`/api/entries/entry/${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete permanently:", err);
    }
  };

  useEffect(() => {
    fetchWithAuth("/api/entries/trash")
      .then((data) => setEntries(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading deleted entries...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deleted Entries</h1>
            <p className="text-gray-600 mt-1">Entries in trash will be permanently deleted after 30 days</p>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={20} />
            <p className="text-red-700 text-sm">
              <span className="font-semibold">Warning:</span> These entries are in the trash. You can restore them or delete them permanently.
            </p>
          </div>
        </div>
      </div>

      {/* Entries Grid */}
      {entries.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Trash is empty</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            No entries have been deleted. Deleted entries will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => {
            // Calculate how long ago it was deleted
            const deletedDate = new Date(entry.updatedAt || entry.deletedAt);
            const now = new Date();
            const daysSinceDeletion = Math.floor((now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={entry.id} className="group bg-white rounded-xl shadow-sm border border-red-200 hover:shadow-lg hover:border-red-300 transition-all duration-300">
                {/* Card Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 bg-red-50 rounded">
                          <FileText size={14} className="text-red-600" />
                        </div>
                        <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                          Deleted {daysSinceDeletion === 0 ? "today" : `${daysSinceDeletion} day${daysSinceDeletion !== 1 ? 's' : ''} ago`}
                        </span>
                      </div>
                      
                      <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                        {entry.title}
                      </h2>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {entry.synopsis}
                  </p>

                  {/* Dates */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Created: {new Date(entry.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>Deleted: {new Date(entry.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-5 py-4 bg-red-50 border-t border-red-100 flex gap-3">
                  <button
                    onClick={() => restoreEntry(entry.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow"
                  >
                    <RotateCcw size={14} />
                    <span>Restore</span>
                  </button>
                  <button
                    onClick={() => deletePermanently(entry.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Showing {entries.length} deleted {entries.length === 1 ? 'entry' : 'entries'}
        </p>
      </div>
    </div>
  );
}