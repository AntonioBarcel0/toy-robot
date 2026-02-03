import React from 'react';
import nave2Img from '../assets/nave2.png';
import asteroideImg from '../assets/asteroide.png';

export default function Board({ robot, walls }) {
    const size = 5;
    
    // Generamos las celdas (Flattened Grid)
    const gridCells = [];
    for (let r = size; r >= 1; r--) {
        for (let c = 1; c <= size; c++) {
            gridCells.push({ r, c });
        }
    }

    const getRotation = (facing) => {
        const rotationMap = { 'N': 0, 'E': 90, 'S': 180, 'W': 270 };
        const key = facing ? facing[0].toUpperCase() : 'N';
        return rotationMap[key] || 0;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-900 p-4 font-mono">
            
            {/* Contenedor "Consola" */}
            <div className="relative p-3 bg-slate-800 border-4 border-slate-600 rounded-sm w-full max-w-[500px]">
                
                

                {/* Grid Container
                    - gap-2: Separación entre celdas (estilo retícula)
                    - grid-cols-5: Forzamos 5 columnas exactas
                */}
                <div 
                    className="grid grid-cols-5 gap-1 bg-slate-950 border-4 border-slate-950 p-1"
                >
                    {gridCells.map(({ r, c }) => {
                        const isRobot = robot && robot.row === r && robot.col === c;
                        const isWall = walls.some((w) => w.row === r && w.col === c);

                        return (
                            <div
                                key={`${r}-${c}`}
                                // CLAVE: aspect-square asegura proporción 1:1 siempre
                                // w-full hace que ocupe todo el ancho de su columna
                                className={`
                                    aspect-square w-full 
                                    flex items-center justify-center 
                                    text-xl sm:text-2xl font-bold select-none
                                    transition-all duration-100 relative
                                    ${isRobot 
                                        ? 'bg-lime-400 text-slate-900 border-b-[6px] border-r-[6px] border-lime-700 translate-y-[-2px]' 
                                        : isWall 
                                            ? 'bg-slate-600 text-slate-400 border-2 border-slate-500 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]' 
                                            : 'bg-slate-800/50 text-slate-700 hover:bg-slate-800 hover:text-cyan-500 cursor-crosshair'
                                    }
                                `}
                            >
                                {isRobot && (
                                    <img 
                                        src={nave2Img} 
                                        alt="Robot" 
                                        className="w-full h-full object-contain p-1 z-10"
                                        style={{ transform: `rotate(${getRotation(robot.facing)}deg)` }}
                                    />
                                )}
                                {isWall && (
                                    <img 
                                        src={asteroideImg} 
                                        alt="Muro" 
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                )} 
                                {!isRobot && !isWall && (
                                    // Pequeño detalle de "grid" pixel art
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <div className="w-1 h-1 bg-current rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                
            </div>
        </div>
    );
}
