import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#00f0ff 1px, transparent 1px),
            linear-gradient(90deg, #00f0ff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl text-center mb-8 text-cyber-blue animate-pulse-slow" 
            style={{ 
              textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff, 0 0 40px #00f0ff',
              lineHeight: '1.5'
            }}>
          ROBOT<br/>
          <span className="text-cyber-pink">CONTROL</span><br/>
          <span className="text-cyber-green text-2xl md:text-3xl">SYSTEM</span>
        </h1>

        {/* Description Box */}
        <div className="border-4 border-cyber-purple bg-cyber-darker bg-opacity-80 p-6 mb-8 relative"
             style={{ boxShadow: '0 0 20px #bd00ff, inset 0 0 20px rgba(189, 0, 255, 0.1)' }}>
          <div className="absolute -top-3 left-4 bg-cyber-darker px-2 text-cyber-purple text-xs">
            [SISTEMA v2.0]
          </div>
          <p className="text-cyber-blue text-xs md:text-sm leading-relaxed" style={{ lineHeight: '2' }}>
            Este juego permite colocar un robot en un tablero 5x5, moverlo, girarlo y colocar paredes.
          </p>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <Link 
            to="/game"
            className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-cyber-purple blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative border-4 border-cyber-blue bg-gradient-to-r from-cyber-pink to-cyber-purple px-8 py-4 text-white text-sm md:text-base hover:scale-105 transition-transform"
                 style={{ boxShadow: '0 0 15px #00f0ff' }}>
              &gt; INICIAR SISTEMA
            </div>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <div className="inline-block border-2 border-cyber-green bg-cyber-darker bg-opacity-50 px-4 py-2">
            <p className="text-cyber-green text-xs animate-flicker">
              [PRESS START]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
