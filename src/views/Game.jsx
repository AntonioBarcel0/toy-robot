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
      html: '<div style="color: #22d3ee;">El robot ha chocado con un muro.<br/>Sistemas de navegación recalibrando...</div>',
      icon: 'warning',
      background: '#1e1b4b',
      color: '#22d3ee',
      iconColor: '#ec4899',
      confirmButtonColor: '#7c3aed',
      confirmButtonText: 'Entendido',
      customClass: {
        popup: 'rounded-lg'
      }
    });
  };

  const handleCommand = (command) => {
    const parts = command.trim().split(" ");
    const action = parts[0];
    const args = parts[1] ? parts[1].split(",") : [];

    switch (action) {
      case "PLACE_ROBOT":
        const [row, col, facing] = args;
        const r = parseInt(row);
        const c = parseInt(col);
        if (r >= 1 && r <= 5 && c >= 1 && c <= 5 && DIRECTIONS.includes(facing)) {
          setRobot({ row: r, col: c, facing });
        }
        break;

      case "PLACE_WALL":
        const [wRow, wCol] = args.map(Number);
        if (
          wRow >= 1 && wRow <= 5 && wCol >= 1 && wCol <= 5 &&
          (!robot || robot.row !== wRow || robot.col !== wCol) &&
          !walls.some((w) => w.row === wRow && w.col === wCol)
        ) {
          setWalls([...walls, { row: wRow, col: wCol }]);
        }
        break;

      case "MOVE":
        if (!robot) return;
        let { row: mr, col: mc, facing: mf } = robot;
        let newRow = mr;
        let newCol = mc;

        switch (mf) {
          case "NORTH":
            newRow = mr === 5 ? 1 : mr + 1;
            break;
          case "SOUTH":
            newRow = mr === 1 ? 5 : mr - 1;
            break;
          case "EAST":
            newCol = mc === 5 ? 1 : mc + 1;
            break;
          case "WEST":
            newCol = mc === 1 ? 5 : mc - 1;
            break;
        }

        if (walls.some((w) => w.row === newRow && w.col === newCol)) {
          showCollisionAlert(); // 🎯 Alert cuando choca
        } else {
          setRobot({ row: newRow, col: newCol, facing: mf });
          setMoveCount(moveCount + 1);
        }
        break;

      case "LEFT":
        if (!robot) return;
        setRobot({
          ...robot,
          facing: DIRECTIONS[(DIRECTIONS.indexOf(robot.facing) + 3) % 4],
        });
        break;

      case "RIGHT":
        if (!robot) return;
        setRobot({
          ...robot,
          facing: DIRECTIONS[(DIRECTIONS.indexOf(robot.facing) + 1) % 4],
        });
        break;

      case "REPORT":
        if (robot) {
          setReport(`${robot.row},${robot.col},${robot.facing}`);
        }
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2">
            🤖 ROBOT GRID
          </h1>
          <p className="text-cyan-300 text-sm tracking-widest">
            SISTEMA DE NAVEGACIÓN AUTÓNOMA v2.0
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tablero */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-cyan-500/30">
            <Board robot={robot} walls={walls} />
            <div className="mt-4 flex justify-between text-cyan-400 text-sm">
              <span>Movimientos: {moveCount}</span>
              <span>Muros: {walls.length}</span>
            </div>
          </div>

          {/* Panel de control */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-purple-500/30">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">
                📡 PANEL DE CONTROL
              </h2>
              <CommandInput onCommand={handleCommand} />
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-cyan-500/30">
              <RobotReport report={report} />
            </div>

            {/* Comandos */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-purple-500/30">
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                💻 COMANDOS
              </h3>
              <ul className="space-y-2 text-cyan-300 text-sm">
                <li><code className="bg-slate-900 px-2 py-1 rounded">PLACE_ROBOT 3,3,NORTH</code></li>
                <li><code className="bg-slate-900 px-2 py-1 rounded">PLACE_WALL 2,3</code></li>
                <li><code className="bg-slate-900 px-2 py-1 rounded">MOVE</code></li>
                <li><code className="bg-slate-900 px-2 py-1 rounded">LEFT / RIGHT</code></li>
                <li><code className="bg-slate-900 px-2 py-1 rounded">REPORT</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
