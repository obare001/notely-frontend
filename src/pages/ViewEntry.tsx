// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../api/api";
// import { showToast } from "../components/showToast";

// export function ViewEntry() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [entry, setEntry] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     fetchWithAuth(`/entries/${id}`)
//       .then((data) => setEntry(data))
//       .catch((err) => {
//         console.error(err);
//         showToast("Failed to fetch entry", "error");
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleDelete = async () => {
//     if (!id) return;
//     if (!window.confirm("Are you sure you want to delete this entry?")) return;

//     try {
//       await fetchWithAuth(`/entries/${id}`, { method: "DELETE" });
//       showToast("Entry deleted successfully", "success");
//       navigate("/entries");
//     } catch (err) {
//       console.error(err);
//       showToast("Failed to delete entry", "error");
//     }
//   };

//   if (loading) return <p>Loading entry...</p>;
//   if (!entry) return <p>Entry not found.</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
//       <p className="text-gray-600 mb-4">{entry.synopsis}</p>
//       <div className="mb-6">
//         <p>{entry.content}</p>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={handleDelete}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => navigate(`/entries/${id}/edit`)}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => navigate("/entries")}
//           className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
//         >
//           Back to Entries
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/api";

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
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await fetchWithAuth(`/api/entries/entry/${id}`, { method: "DELETE" });
      navigate("/entries");
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  if (loading) return <p>Loading entry...</p>;
  if (!entry) return <p>Entry not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
      <p className="text-gray-600 mb-4">{entry.synopsis}</p>
      <div className="mb-6">
        <p>{entry.content}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/entries/${id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => navigate("/entries")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Back to Entries
        </button>
      </div>
    </div>
  );
}
