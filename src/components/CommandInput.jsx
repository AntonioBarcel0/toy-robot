import { useState } from "react";

export default function CommandInput({ onCommand }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim().toUpperCase());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ingresa comando"
        className="flex-1 bg-slate-900 text-cyan-300 border-2 border-cyan-500/50 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-400"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-bold hover:from-purple-700 hover:to-cyan-700 transition-all"
      >
        Ejecutar
      </button>
    </form>
  );
}
