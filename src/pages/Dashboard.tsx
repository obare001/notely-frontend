import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/api";
import { List, Plus, Trash2, BarChart3, RefreshCw, Calendar, FileText, Edit } from "lucide-react";

export function Dashboard() {
  const [stats, setStats] = useState({
    totalEntries: 0,
    thisMonth: 0,
    inTrash: 0,
    newToday: 0,
    totalWords: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentEntries, setRecentEntries] = useState<any[]>([]);

  // Fetch dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all entries
      const entries = await fetchWithAuth("/api/entries");
      
      // Fetch deleted entries
      const deletedEntries = await fetchWithAuth("/api/entries/trash").catch(() => []);
      
      // Calculate stats
      const now = new Date();
      const thisMonthEntries = entries.filter((entry: any) => {
        const entryDate = new Date(entry.createdAt);
        return entryDate.getMonth() === now.getMonth() && 
               entryDate.getFullYear() === now.getFullYear();
      });
      
      const todayEntries = entries.filter((entry: any) => {
        const entryDate = new Date(entry.createdAt);
        return entryDate.toDateString() === now.toDateString();
      });
      
      const totalWords = entries.reduce((total: number, entry: any) => {
        return total + (entry.content?.split(/\s+/).length || 0);
      }, 0);
      
      // Get recent entries (last 3)
      const recent = entries.slice(0, 3);
      
      setStats({
        totalEntries: entries.length,
        thisMonth: thisMonthEntries.length,
        inTrash: deletedEntries.length || 0,
        newToday: todayEntries.length,
        totalWords: totalWords
      });
      
      setRecentEntries(recent);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete an entry
  const handleDeleteEntry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    
    try {
      await fetchWithAuth(`/api/entries/entry/${id}`, { method: "DELETE" });
      // Refresh dashboard data
      loadDashboardData();
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: "View All Entries",
      description: "Browse through all your journal entries",
      icon: <List size={28} />,
      path: "/entries",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Create New Entry",
      description: "Start writing a new journal entry",
      icon: <Plus size={28} />,
      path: "/entries/create",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Check Trash",
      description: "Review and restore deleted entries",
      icon: <Trash2 size={28} />,
      path: "/entries/deleted",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your journal today.</p>
        </div>
        <button
          onClick={loadDashboardData}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Refresh dashboard"
        >
          <RefreshCw size={18} className="text-gray-600" />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalEntries}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <List className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link to="/entries" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.thisMonth}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <BarChart3 className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link to="/entries" className="text-sm text-green-600 hover:text-green-800 font-medium">
              View recent →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Trash</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inTrash}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Trash2 className="text-red-600" size={24} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link to="/entries/deleted" className="text-sm text-red-600 hover:text-red-800 font-medium">
              Manage trash →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Words Written</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalWords.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FileText className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-purple-600 font-medium">
              {stats.totalWords > 0 ? "Keep writing! ✍️" : "Start writing! ✨"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`${action.color} p-3 rounded-lg`}>
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{action.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Entries</h2>
          <Link to="/entries" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all →
          </Link>
        </div>
        
        {recentEntries.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No recent entries</h3>
            <p className="text-gray-600 mb-4">Start by creating your first journal entry!</p>
            <Link
              to="/entries/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              Create Entry
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <Link to={`/entries/${entry.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {entry.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(entry.createdAt).toLocaleDateString()} • 
                      {entry.content?.split(/\s+/).length || 0} words
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/entries/${entry.id}`}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    to={`/entries/${entry.id}/edit`}
                    className="px-3 py-1 text-sm bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="px-3 py-1 text-sm bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}