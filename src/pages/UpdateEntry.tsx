import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/api";

export function UpdateEntry() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", synopsis: "", content: "", isPublic: false });

  useEffect(() => {
    fetchWithAuth(`/api/entries/${id}`)
      .then((data) => setForm(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchWithAuth(`/entries/${id}`, { method: "PATCH", body: JSON.stringify(form) });
      navigate("/entries");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Edit Entry</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="synopsis" placeholder="Synopsis" value={form.synopsis} onChange={handleChange} required />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
        <label>
          <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
          Public
        </label>
        <button type="submit" className="bg-primary text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
}
