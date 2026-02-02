import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Board from "../components/Board";
import CommandInput from "../components/CommandInput";
import RobotReport from "../components/RobotReport";

const MySwal = withReactContent(Swal);
const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

export default function Game() {
  const [robot, setRobot] = useState(null);
  const [walls, setWalls] = useState([]);
  const [report, setReport] = useState("");
  const [moveCount, setMoveCount] = useState(0);

  const showCollisionAlert = () => {
    MySwal.fire({
      title: '⚠️ COLISIÓN DETECTADA',
      html: `
        <div style="line-height: 2; margin: 1rem 0;">
          <p>EL ROBOT HA IMPACTADO<br/>CON UN OBSTÁCULO</p>
          <p style="margin-top: 1rem; color: #ffff00;">SISTEMA BLOQUEADO</p>
        </div>
      `,
      icon: 'warning',
      confirmButtonText: 'REINICIAR',
      customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title',
        htmlContainer: 'swal2-html-container',
        confirmButton: 'swal2-confirm'
      }
    });
  };

  const executeCommand = (cmd) => {
    const parts = cmd.split(" ");
    const command = parts[0];

    if (command === "PLACE_ROBOT") {
      const coords = parts[1]?.split(",");
      if (coords && coords.length === 3) {
        const row = parseInt(coords[0]);
        const col = parseInt(coords[1]);
        const facing = coords[2];
        if (
          row >= 1 &&
          row <= 5 &&
          col >= 1 &&
          col <= 5 &&
          DIRECTIONS.includes(facing)
        ) {
          const wallExists = walls.some((w) => w.row === row && w.col === col);
          if (!wallExists) {
            setRobot({ row, col, facing });
            setReport("");
          }
        }
      }
    } else if (command === "PLACE_WALL") {
      const coords = parts[1]?.split(",");
      if (coords && coords.length === 2) {
        const row = parseInt(coords[0]);
        const col = parseInt(coords[1]);
        if (row >= 1 && row <= 5 && col >= 1 && col <= 5) {
          const robotHere = robot && robot.row === row && robot.col === col;
          const wallExists = walls.some((w) => w.row === row && w.col === col);
          if (!robotHere && !wallExists) {
            setWalls([...walls, { row, col }]);
          }
        }
      }
    } else if (command === "MOVE") {
      if (!robot) return;
      let newRow = robot.row;
      let newCol = robot.col;

      if (robot.facing === "NORTH") newRow += 1;
      else if (robot.facing === "SOUTH") newRow -= 1;
      else if (robot.facing === "EAST") newCol += 1;
      else if (robot.facing === "WEST") newCol -= 1;

      const outOfBounds = newRow < 1 || newRow > 5 || newCol < 1 || newCol > 5;
      const wallCollision = walls.some((w) => w.row === newRow && w.col === newCol);

      if (outOfBounds || wallCollision) {
        showCollisionAlert();
      } else {
        setRobot({ ...robot, row: newRow, col: newCol });
        setMoveCount((prev) => prev + 1);
      }
    } else if (command === "LEFT") {
      if (!robot) return;
      const currentIndex = DIRECTIONS.indexOf(robot.facing);
      const newIndex = (currentIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length;
      setRobot({ ...robot, facing: DIRECTIONS[newIndex] });
    } else if (command === "RIGHT") {
      if (!robot) return;
      const currentIndex = DIRECTIONS.indexOf(robot.facing);
      const newIndex = (currentIndex + 1) % DIRECTIONS.length;
      setRobot({ ...robot, facing: DIRECTIONS[newIndex] });
    } else if (command === "REPORT") {
      if (!robot) return;
      setReport(`${robot.row},${robot.col},${robot.facing}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker p-4 md:p-8 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#00f0ff 1px, transparent 1px),
            linear-gradient(90deg, #00f0ff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl text-cyber-blue mb-2 font-bold" 
              style={{ textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff' }}>
            ROBOT CONTROL
          </h1>
          <p className="text-cyber-pink text-xs md:text-sm font-bold" 
             style={{ textShadow: '0 0 10px #ff0080' }}>
            SISTEMA DE NAVEGACIÓN AUTÓNOMA v2.0
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="border-2 border-cyber-green bg-black bg-opacity-70 p-3 md:p-4 text-center"
               style={{ boxShadow: '0 0 15px #00ff41' }}>
            <div className="text-cyber-green text-xs md:text-sm mb-1 font-bold" 
                 style={{ textShadow: '0 0 8px #00ff41' }}>MOVIMIENTOS</div>
            <div className="text-cyber-blue text-xl md:text-3xl font-bold" 
                 style={{ textShadow: '0 0 10px #00f0ff' }}>{moveCount}</div>
          </div>
          <div className="border-2 border-cyber-purple bg-black bg-opacity-70 p-3 md:p-4 text-center"
               style={{ boxShadow: '0 0 15px #bd00ff' }}>
            <div className="text-cyber-purple text-xs md:text-sm mb-1 font-bold" 
                 style={{ textShadow: '0 0 8px #bd00ff' }}>OBSTÁCULOS</div>
            <div className="text-cyber-blue text-xl md:text-3xl font-bold" 
                 style={{ textShadow: '0 0 10px #00f0ff' }}>{walls.length}</div>
          </div>
          <div className="border-2 border-cyber-pink bg-black bg-opacity-70 p-3 md:p-4 text-center"
               style={{ boxShadow: '0 0 15px #ff0080' }}>
            <div className="text-cyber-pink text-xs md:text-sm mb-1 font-bold" 
                 style={{ textShadow: '0 0 8px #ff0080' }}>ESTADO</div>
            <div className="text-cyber-green text-xs md:text-sm font-bold animate-flicker mt-1" 
                 style={{ textShadow: '0 0 10px #00ff41' }}>
              {robot ? "● ACTIVO" : "○ INACTIVO"}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Board */}
          <div className="flex justify-center lg:justify-end">
            <Board robot={robot} walls={walls} />
          </div>

          {/* Control Panel */}
          <div className="space-y-5 md:space-y-6 max-w-md mx-auto lg:mx-0">
            <CommandInput onCommand={executeCommand} />
            <RobotReport report={report} />
            
            {/* Instructions */}
            <div className="border-2 border-cyber-blue bg-black bg-opacity-70 p-4 md:p-5"
                 style={{ boxShadow: '0 0 15px #00f0ff' }}>
              <div className="text-cyber-pink text-xs md:text-sm mb-3 font-bold" 
                   style={{ textShadow: '0 0 8px #ff0080' }}>
                COMANDOS:
              </div>
              <div className="text-cyber-blue text-xs md:text-sm space-y-1 font-bold" 
                   style={{ textShadow: '0 0 5px #00f0ff', lineHeight: '2' }}>
                <code className="block">&gt; PLACE_ROBOT 3,3,NORTH</code>
                <code className="block">&gt; PLACE_WALL 2,3</code>
                <code className="block">&gt; MOVE</code>
                <code className="block">&gt; LEFT / RIGHT</code>
                <code className="block">&gt; REPORT</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
