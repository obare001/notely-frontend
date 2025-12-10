// import { Link } from "react-router-dom";

// export default function EntryCard({ entry }: { entry: any }) {
//   return (
//     <div className="border p-4 rounded">
//       <h2 className="font-bold">{entry.title}</h2>
//       <p>{entry.synopsis}</p>
//       <div className="mt-2 flex gap-2">
//         <Link to={`/entries/${entry.id}`} className="text-blue-600 underline">View</Link>
//         <Link to={`/entries/${entry.id}/edit`} className="text-yellow-600 underline">Edit</Link>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { Calendar, Eye, Edit, BookOpen } from "lucide-react";

export default function EntryCard({ entry }: { entry: any }) {
  // Format date nicely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 p-5">
      {/* Icon and date */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-1.5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
          <BookOpen size={16} className="text-blue-600" />
        </div>
        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
          {formatDate(entry.createdAt)}
        </div>
      </div>

      {/* Title with hover effect */}
      <Link to={`/entries/${entry.id}`} className="block mb-2">
        <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {entry.title}
        </h2>
      </Link>

      {/* Synopsis */}
      <p className="text-gray-600 mb-3 line-clamp-3 leading-relaxed text-xs">
        {entry.synopsis}
      </p>

      {/* Action buttons - Half size */}
      <div className="flex gap-2">
        <Link 
          to={`/entries/${entry.id}`}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all text-xs font-medium"
        >
          <Eye size={12} />
          <span>View</span>
        </Link>
        <Link 
          to={`/entries/${entry.id}/edit`}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-md hover:from-amber-600 hover:to-amber-700 transition-all text-xs font-medium"
        >
          <Edit size={12} />
          <span>Edit</span>
        </Link>
      </div>
    </div>
  );
}