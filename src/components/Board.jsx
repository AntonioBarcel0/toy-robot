export default function Board({ robot, walls }) {
  const size = 5;
  const rows = [];

  const getRobotIcon = (facing) => {
    const icons = {
      NORTH: "⬆️",
      SOUTH: "⬇️",
      EAST: "➡️",
      WEST: "⬅️"
    };
    return icons[facing] || "🤖";
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
            w-20 h-20 border-2 flex items-center justify-center text-3xl
            transition-all duration-300 rounded-lg
            ${isRobot 
              ? 'bg-gradient-to-br from-cyan-500 to-purple-600 border-cyan-400 shadow-lg shadow-cyan-500/50' 
              : isWall 
              ? 'bg-red-900 border-red-600 shadow-lg shadow-red-500/50' 
              : 'bg-slate-800 border-slate-600 hover:border-purple-500'
            }
          `}
        >
          {isRobot && <span>{getRobotIcon(robot.facing)}</span>}
          {isWall && <span>🧱</span>}
          {!isRobot && !isWall && (
            <span className="text-slate-500 text-xs">
              {r},{c}
            </span>
          )}
        </div>
      );
    }
    rows.push(
      <div key={r} className="flex gap-2 justify-center">
        {cols}
      </div>
    );
  }

  return <div className="space-y-2">{rows}</div>;
}
