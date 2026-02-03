import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Board from "../components/Board";
import RobotReport from "../components/RobotReport";

const MySwal = withReactContent(Swal);
const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

export default function Game() {
  const [robot, setRobot] = useState(null);
  const [walls, setWalls] = useState([]);
  const [report, setReport] = useState("");
  const [moveCount, setMoveCount] = useState(0);
  
  // Estados para el constructor de comandos
  const [commandBuilder, setCommandBuilder] = useState({
    action: null,
    col: null,
    row: null,
    facing: null
  });

  const showCollisionAlert = () => {
    MySwal.fire({
      title: '⚠️ COLISIÓN DETECTADA',
      html: `
        <div style="line-height: 2;">
          EL ROBOT HA IMPACTADO<br/>
          CON UN OBSTÁCULO<br/>
          <span style="color: #ff0080;">SISTEMA BLOQUEADO</span>
        </div>
      `,
      icon: 'warning',
      confirmButtonText: 'REINTENTAR',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#00f0ff',
    });
  };

  const isValidMove = (newRow, newCol) => {
    if (newRow < 1 || newRow > 5 || newCol < 1 || newCol > 5) return false;
    return !walls.some(w => w.row === newRow && w.col === newCol);
  };

  const handleMove = () => {
    if (!robot) {
      MySwal.fire({
        title: 'ERROR',
        text: 'Debes colocar el robot primero',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    let newRow = robot.row;
    let newCol = robot.col;

    switch (robot.facing) {
      case "NORTH":
        newRow += 1;
        break;
      case "SOUTH":
        newRow -= 1;
        break;
      case "EAST":
        newCol += 1;
        break;
      case "WEST":
        newCol -= 1;
        break;
    }

    if (isValidMove(newRow, newCol)) {
      setRobot({ ...robot, row: newRow, col: newCol });
      setMoveCount(prev => prev + 1);
    } else {
      showCollisionAlert();
    }
  };

  const handleRotate = (direction) => {
    if (!robot) {
      MySwal.fire({
        title: 'ERROR',
        text: 'Debes colocar el robot primero',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const currentIndex = DIRECTIONS.indexOf(robot.facing);
    let newIndex;

    if (direction === "LEFT") {
      newIndex = (currentIndex - 1 + 4) % 4;
    } else {
      newIndex = (currentIndex + 1) % 4;
    }

    setRobot({ ...robot, facing: DIRECTIONS[newIndex] });
  };

  const handlePlaceRobot = () => {
    const { col, row, facing } = commandBuilder;
    
    if (!col || !row || !facing) {
      MySwal.fire({
        title: 'DATOS INCOMPLETOS',
        text: 'Selecciona: Columna + Fila + Dirección',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (walls.some(w => w.row === row && w.col === col)) {
      MySwal.fire({
        title: 'POSICIÓN OCUPADA',
        text: 'Hay un muro en esa posición',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    setRobot({ row, col, facing });
    setCommandBuilder({ action: null, col: null, row: null, facing: null });
    
    MySwal.fire({
      title: '✓ ROBOT COLOCADO',
      text: `Posición: (${col},${row}) ${facing}`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handlePlaceWall = () => {
    const { col, row } = commandBuilder;
    
    if (!col || !row) {
      MySwal.fire({
        title: 'DATOS INCOMPLETOS',
        text: 'Selecciona: Columna + Fila',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (robot && robot.row === row && robot.col === col) {
      MySwal.fire({
        title: 'POSICIÓN OCUPADA',
        text: 'El robot está en esa posición',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (walls.some(w => w.row === row && w.col === col)) {
      MySwal.fire({
        title: 'YA EXISTE',
        text: 'Ya hay un muro en esa posición',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }

    setWalls([...walls, { row, col }]);
    setCommandBuilder({ action: null, col: null, row: null, facing: null });
    
    MySwal.fire({
      title: '✓ MURO COLOCADO',
      text: `Posición: (${col},${row})`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleReport = () => {
    if (!robot) {
      setReport("Robot no colocado");
      MySwal.fire({
        title: 'SIN DATOS',
        text: 'El robot no ha sido colocado',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }

    const reportText = `${robot.col},${robot.row},${robot.facing}`;
    setReport(reportText);
    
    MySwal.fire({
      title: '📍 REPORTE DE POSICIÓN',
      html: `
        <div style="line-height: 2; font-size: 0.9rem;">
          <strong>Columna:</strong> ${robot.col}<br/>
          <strong>Fila:</strong> ${robot.row}<br/>
          <strong>Dirección:</strong> ${robot.facing}<br/>
          <strong>Movimientos:</strong> ${moveCount}
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  const resetCommand = () => {
    setCommandBuilder({ action: null, col: null, row: null, facing: null });
  };

  const resetBoard = () => {
    MySwal.fire({
      title: '¿REINICIAR TODO?',
      text: 'Se perderán todos los datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SÍ, REINICIAR',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.isConfirmed) {
        setRobot(null);
        setWalls([]);
        setReport("");
        setMoveCount(0);
        setCommandBuilder({ action: null, col: null, row: null, facing: null });
        
        MySwal.fire({
          title: '✓ REINICIADO',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
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
        {/* Header - TU LOGO ORIGINAL */}
        <div className="text-center mb-12 md:mb-16 flex justify-center">
          <img 
            src="/toy-robot-logo.png" 
            alt="Toy Robot Logo" 
            className="h-auto"
            style={{ 
              width: '550px',
              margin: '80px',
              filter: 'drop-shadow(0 0 10px #00f0ff) drop-shadow(0 0 20px #00f0ff)',
            }}
          />
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <div className="border-2 border-gray-500 bg-black bg-opacity-70 p-3 md:p-4 text-center">
            <div className="text-gray-300 text-xs md:text-sm mb-1 font-bold">MOVIMIENTOS</div>
            <div className="text-2xl md:text-3xl font-bold text-white">{moveCount}</div>
          </div>
          
          <div className="border-2 border-gray-500 bg-black bg-opacity-70 p-3 md:p-4 text-center">
            <div className="text-gray-300 text-xs md:text-sm mb-1 font-bold">MUROS</div>
            <div className="text-2xl md:text-3xl font-bold text-white">{walls.length}</div>
          </div>
          
          <div className="border-2 border-gray-500 bg-black bg-opacity-70 p-3 md:p-4 text-center">
            <div className="text-gray-300 text-xs md:text-sm mb-1 font-bold">ESTADO</div>
            <div className="text-lg md:text-xl font-bold text-white">
              {robot ? "ACTIVO" : "INACTIVO"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TABLERO - MÁS GRANDE */}
          <div className="bg-black bg-opacity-70 p-6 border-4 border-gray-600">
            <h2 className="text-2xl text-white mb-6 text-center font-bold">
              VISOR ESTELAR
            </h2>
            <Board robot={robot} walls={walls} />
            {report && <RobotReport report={report} />}
          </div>

          {/* PANEL DE CONTROL */}
          <div className="bg-black bg-opacity-70 p-6 border-4 border-gray-600">
            <h2 className="text-2xl text-white mb-6 text-center font-bold">
              PANEL DE CONTROL
            </h2>

            {/* Comando Actual */}
            <div className="mb-6 p-4 bg-black/70 border-2 border-gray-500">
              <p className="text-xs text-cyber-blue mb-2 font-bold">COMANDO ACTUAL:</p>
              <p className="text-sm text-white font-mono">
                {commandBuilder.col && `COL:${commandBuilder.col}`}
                {commandBuilder.row && ` ROW:${commandBuilder.row}`}
                {commandBuilder.facing && ` ${commandBuilder.facing}`}
                {!commandBuilder.col && !commandBuilder.row && "Selecciona posición..."}
              </p>
            </div>

            {/* Selección de Posición */}
            <div className="mb-6">
              <p className="text-xs text-cyber-pink mb-2 font-bold">📍 COLUMNA (X):</p>
              <div className="grid grid-cols-5 gap-8 mb-4">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={`col-${num}`}
                    onClick={() => setCommandBuilder(prev => ({ ...prev, col: num }))}
                    className={`py-12 px-12 text-5xl font-black transition-all duration-200 rounded-sm relative
                      ${commandBuilder.col === num
                        ? 'bg-[#5ac2c7] text-white'
                        : 'bg-[#3a7b7d] text-white hover:bg-[#4a9b9d]'
                      }`}
                    style={{
                      boxShadow: commandBuilder.col === num 
                        ? 'inset 0 3px 0 rgba(255, 255, 255, 0.3), inset 0 -4px 0 rgba(0, 0, 0, 0.3), 0 4px 0 #1a3b3d, 0 8px 8px rgba(0,0,0,0.3)'
                        : 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <p className="text-xs text-cyber-pink mb-2 font-bold">📍 FILA (Y):</p>
              <div className="grid grid-cols-5 gap-8 mb-4">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={`row-${num}`}
                    onClick={() => setCommandBuilder(prev => ({ ...prev, row: num }))}
                    className={`py-12 px-12 text-5xl font-black transition-all duration-200 rounded-sm relative
                      ${commandBuilder.row === num
                        ? 'bg-[#5ac2c7] text-white'
                        : 'bg-[#3a7b7d] text-white hover:bg-[#4a9b9d]'
                      }`}
                    style={{
                      boxShadow: commandBuilder.row === num 
                        ? 'inset 0 3px 0 rgba(255,255,255,0.3), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 8px 8px rgba(0,0,0,0.3)'
                        : 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Dirección */}
            <div className="mb-6">
              <p className="text-xs text-cyber-blue mb-2 font-bold">🧭 DIRECCIÓN:</p>
              <div className="grid grid-cols-2 gap-8">
                {["NORTH", "SOUTH", "EAST", "WEST"].map(dir => (
                  <button
                    key={dir}
                    onClick={() => setCommandBuilder(prev => ({ ...prev, facing: dir }))}
                    className={`py-16 px-16 text-3xl font-black transition-all duration-200 rounded-sm relative
                      ${commandBuilder.facing === dir
                        ? 'bg-[#5ac2c7] text-white'
                        : 'bg-[#3a7b7d] text-white hover:bg-[#4a9b9d]'
                      }`}
                    style={{
                      boxShadow: commandBuilder.facing === dir 
                        ? 'inset 0 3px 0 rgba(255,255,255,0.3), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 8px 8px rgba(0,0,0,0.3)'
                        : 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                    }}
                  >
                    {dir === "NORTH" && "▲ NORTE"}
                    {dir === "SOUTH" && "▼ SUR"}
                    {dir === "EAST" && "▶ ESTE"}
                    {dir === "WEST" && "◀ OESTE"}
                  </button>
                ))}
              </div>
            </div>

            {/* Acciones Principales */}
            <div className="mb-6">
              <p className="text-xs text-cyber-blue mb-2 font-bold">⚙️ ACCIONES:</p>
              <div className="grid grid-cols-2 gap-8">
                <button
                  onClick={handlePlaceRobot}
                  className="py-16 px-16 bg-[#3a7b7d] text-white font-black text-3xl hover:bg-[#4a9b9d] transition-all duration-200 rounded-sm"
                  style={{
                    boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  🤖 PLACE ROBOT
                </button>

                <button
                  onClick={handlePlaceWall}
                  className="py-16 px-16 bg-[#3a7b7d] text-white font-black text-3xl hover:bg-[#4a9b9d] transition-all duration-200 rounded-sm"
                  style={{
                    boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  🧱 PLACE WALL
                </button>

                <button
                  onClick={handleMove}
                  className="py-16 px-16 bg-[#3a7b7d] text-white font-black text-3xl hover:bg-[#4a9b9d] transition-all duration-200 rounded-sm"
                  style={{
                    boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  ➤ MOVE
                </button>

                <button
                  onClick={handleReport}
                  className="py-16 px-16 bg-[#3a7b7d] text-white font-black text-3xl hover:bg-[#4a9b9d] transition-all duration-200 rounded-sm"
                  style={{
                    boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  📍 REPORT
                </button>
              </div>
            </div>

            {/* Rotación */}
            <div className="mb-6">
              <p className="text-xs text-cyber-pink mb-2 font-bold">🔄 ROTACIÓN:</p>
              <div className="grid grid-cols-2 gap-8">
                <button
                  onClick={() => handleRotate("LEFT")}
                  className="py-16 px-16 bg-[#3a7b7d] text-white font-black text-3xl hover:bg-[#4a9b9d] transition-all duration-200 rounded-sm"
                  style={{
                    boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  ↺ LEFT
                </button>

                <button
                  onClick={() => handleRotate("RIGHT")}
                  className="py-16 px-16 bg-[#3a7b7d] text-white font-black text-3xl hover:bg-[#4a9b9d] transition-all duration-200 rounded-sm"
                  style={{
                    boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  ↻ RIGHT
                </button>
              </div>
            </div>

            {/* Botones de Utilidad */}
            <div className="grid grid-cols-2 gap-8">
              <button
                onClick={resetCommand}
                className="py-16 px-16 bg-[#3a7b7d] text-white font-black text-3xl hover:bg-[#4a9b9d] transition-all duration-200 rounded-sm"
                style={{
                  boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #1a3b3d, 0 6px 6px rgba(0,0,0,0.3)'
                }}
              >
                🔄 LIMPIAR
              </button>

              <button
                onClick={resetBoard}
                className="py-16 px-16 bg-[#c74a4a] text-white font-black text-3xl hover:bg-[#d75a5a] transition-all duration-200 rounded-sm"
                style={{
                  boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 0 #8a2a2a, 0 6px 6px rgba(0,0,0,0.3)'
                }}
              >
                ⚠️ RESET TODO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
