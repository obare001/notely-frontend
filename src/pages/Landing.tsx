export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Safe‑Notely</h1>
      <p className="mt-4 text-gray-600">Your secure notes app.</p>
      <div className="mt-6 space-x-4">
        <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
        <a href="/register" className="px-4 py-2 bg-gray-500 text-white rounded">Register</a>
      </div>
    </div>
  );
}
