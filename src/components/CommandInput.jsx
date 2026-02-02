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
    <div className="border-2 border-cyber-green bg-black bg-opacity-70 p-4 md:p-5"
         style={{ boxShadow: '0 0 15px #00ff41' }}>
      <div className="text-cyber-green text-xs md:text-sm mb-3 font-bold" 
           style={{ textShadow: '0 0 8px #00ff41' }}>
        TERMINAL DE COMANDOS
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center bg-black bg-opacity-80 border-2 border-cyber-green p-2.5 md:p-3"
             style={{ boxShadow: 'inset 0 0 10px rgba(0, 255, 65, 0.3)' }}>
          <span className="text-cyber-green mr-2 text-sm md:text-base font-bold" 
                style={{ textShadow: '0 0 8px #00ff41' }}>&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-cyber-blue outline-none text-xs md:text-sm placeholder-cyber-blue placeholder-opacity-50 font-bold"
            placeholder="INGRESA COMANDO..."
            style={{ 
              fontFamily: '"Press Start 2P", cursive',
              textShadow: '0 0 8px #00f0ff'
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue border-2 border-cyber-green text-white py-2.5 md:py-3 px-4 hover:scale-105 transition-transform text-xs md:text-sm font-bold"
          style={{ boxShadow: '0 0 15px #00ff41', textShadow: '0 0 5px #000' }}
        >
          EJECUTAR
        </button>
      </form>
    </div>
  );
}
