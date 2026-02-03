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
    <div className="border-2 border-gray-500 bg-black bg-opacity-70 p-4 md:p-5">
      <div className="text-gray-300 text-xs md:text-sm mb-3 font-bold">
        TERMINAL DE COMANDOS
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center bg-black bg-opacity-80 border-2 border-gray-500 p-2.5 md:p-3">
          <span className="text-gray-300 mr-2 text-sm md:text-base font-bold">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none text-xs md:text-sm placeholder-gray-400 font-bold"
            placeholder="INGRESA COMANDO..."
            style={{ 
              fontFamily: '"Space Mono", monospace'
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 border-2 border-gray-600 text-white py-2.5 md:py-3 px-4 hover:bg-gray-600 transition-all text-xs md:text-sm font-bold"
        >
          EJECUTAR
        </button>
      </form>
    </div>
  );
}
