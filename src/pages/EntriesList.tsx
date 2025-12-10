import { useEffect, useState } from "react";
import { fetchWithAuth } from "../api/api";
import EntryCard from "../components/EntryCard";
import { Link } from "react-router-dom";

export function EntriesList() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth("/api/entries")
      .then((data) => setEntries(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading entries...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Entries</h1>
      <Link to="/entries/create" className="text-primary underline">Create New Entry</Link>
      <div className="grid gap-4 mt-4">
        {entries.length === 0 ? <p>No entries yet.</p> : entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
      </div>
    </div>
  );
}
