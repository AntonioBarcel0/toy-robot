import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#666 1px, transparent 1px),
            linear-gradient(90deg, #666 1px, transparent 1px)
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
            className="h-auto"
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
            <img 
            src="/play-game.png" 
            alt="play game button" 
            className="h-auto hover:opacity-80 transition-opacity"
            style={{ 
              width: '250px',
              margin: '100px',
            }}
          />
          </Link>
        </div>
      </div>
    </div>
  );
}
