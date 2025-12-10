import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/api";
import EntryCard from "../components/EntryCard";

export function DeletedEntries() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const restoreEntry = async (id: string) => {
    try {
      await fetchWithAuth(`/api/entries/${id}/restore`, { method: "PATCH" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWithAuth("/entries/deleted")
      .then((data) => setEntries(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading deleted entries...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Deleted Entries</h1>
      <div className="grid gap-4">
        {entries.length === 0 ? <p>No deleted entries.</p> : entries.map((entry) => (
          <div key={entry.id} className="border p-4 rounded">
            <h2 className="font-bold">{entry.title}</h2>
            <p>{entry.synopsis}</p>
            <button onClick={() => restoreEntry(entry.id)} className="text-green-600 underline">Restore</button>
          </div>
        ))}
      </div>
    </div>
  );
}
