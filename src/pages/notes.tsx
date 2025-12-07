import { useNotes } from "../api/notes";

export default function Notes() {
  const { data, isLoading } = useNotes();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Notes</h2>
      <div className="grid gap-4">
        {data.map((note: any) => (
          <div key={note.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{note.title}</h3>
            <p>{note.synopsis}</p>
            <a href={`/notes/${note.id}`} className="text-blue-500">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
}
