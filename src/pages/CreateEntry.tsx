import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/api";

export function CreateEntry() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", synopsis: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchWithAuth("/api/entries", { method: "POST", body: JSON.stringify(form) });
      navigate("/entries");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Create Entry</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="synopsis" placeholder="Synopsis" value={form.synopsis} onChange={handleChange} required />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
        <button type="submit" className="bg-primary text-white p-2 rounded">Create</button>
      </form>
    </div>
  );
}
