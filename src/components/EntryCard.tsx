import { Link } from "react-router-dom";

export default function EntryCard({ entry }: { entry: any }) {
  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{entry.title}</h2>
      <p>{entry.synopsis}</p>
      <div className="mt-2 flex gap-2">
        <Link to={`/entries/${entry.id}`} className="text-blue-600 underline">View</Link>
        <Link to={`/entries/${entry.id}/edit`} className="text-yellow-600 underline">Edit</Link>
      </div>
    </div>
  );
}
