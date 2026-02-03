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
        <div className="flex justify-center mb-8">
          <img 
            src="/toy-robot-logo.png" 
            alt="Toy Robot Logo" 
            className="h-auto animate-pulse-slow"
            style={{ 
              width: '650px',
              margin: '100px',
              filter: 'drop-shadow(0 0 10px #00f0ff) drop-shadow(0 0 20px #00f0ff)',
            }}
          />
        </div>



        {/* Start Button */}
        <div className="flex justify-center">
          <Link 
            to="/game"
            className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-cyber-purple blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <img 
            src="/play-game.png" 
            alt="play game button" 
            className="h-auto animate-pulse-slow"
            style={{ 
              width: '250px',
              margin: '100px',
              //filter: 'drop-shadow(0 0 10px #4a4a4a) drop-shadow(0 0 20px #4c4c4c)',
            }}
          />
          </Link>
        </div>
      </div>
    </div>
  );
}
