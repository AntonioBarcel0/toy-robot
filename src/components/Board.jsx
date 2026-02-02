export default function Board({ robot, walls }) {
  const size = 5;
  const rows = [];

  const getRobotIcon = (facing) => {
    const icons = {
      NORTH: "▲",
      SOUTH: "▼",
      EAST: "▶",
      WEST: "◀"
    };
    return icons[facing] || "●";
  };

  for (let r = size; r >= 1; r--) {
    const cols = [];
    for (let c = 1; c <= size; c++) {
      const isRobot = robot && robot.row === r && robot.col === c;
      const isWall = walls.some((w) => w.row === r && w.col === c);

      cols.push(
        <div
          key={`${r}-${c}`}
          className={`
            w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-xl md:text-3xl font-bold
            border-2 transition-all duration-300
            ${isRobot 
              ? 'bg-gradient-to-br from-cyber-blue to-cyber-purple border-cyber-blue animate-pulse-slow' 
              : isWall 
              ? 'bg-gradient-to-br from-cyber-pink to-red-600 border-cyber-pink' 
              : 'bg-cyber-darker bg-opacity-40 border-cyber-blue border-opacity-30 hover:border-opacity-60'
            }
          `}
          style={{
            boxShadow: isRobot 
              ? '0 0 20px #00f0ff, inset 0 0 20px rgba(0, 240, 255, 0.3)' 
              : isWall 
              ? '0 0 20px #ff0080, inset 0 0 20px rgba(255, 0, 128, 0.3)' 
              : 'none',
            textShadow: isRobot 
              ? '0 0 10px #fff, 0 0 20px #00f0ff' 
              : isWall 
              ? '0 0 10px #ff0080' 
              : 'none'
          }}
        >
          {isRobot && (
            <span className="text-white animate-pulse">
              {getRobotIcon(robot.facing)}
            </span>
          )}
          {isWall && <span className="text-white">■</span>}
        </div>
      );
    }
    rows.push(
      <div key={r} className="grid grid-cols-5 gap-1.5 md:gap-2">
        {cols}
      </div>
    );
  }

  return (
    <div className="border-4 border-cyber-purple bg-cyber-darker bg-opacity-60 p-3 md:p-4"
         style={{ boxShadow: '0 0 30px #bd00ff, inset 0 0 30px rgba(189, 0, 255, 0.1)' }}>
      <div className="space-y-1.5 md:space-y-2">
        {rows}
      </div>
      
      {/* Coordinate labels */}
      <div className="mt-3 flex justify-between text-cyber-green text-xs font-bold">
        <span style={{ textShadow: '0 0 5px #00ff41' }}>X: 1→5</span>
        <span style={{ textShadow: '0 0 5px #00ff41' }}>Y: 1→5</span>
      </div>
    </div>
  );
}
