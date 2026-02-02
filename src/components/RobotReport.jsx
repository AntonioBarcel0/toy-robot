export default function RobotReport({ report }) {
  return (
    <div className="border-2 border-cyber-pink bg-black bg-opacity-70 p-4 md:p-5"
         style={{ boxShadow: '0 0 15px #ff0080' }}>
      <div className="text-cyber-pink text-xs md:text-sm mb-3 font-bold" 
           style={{ textShadow: '0 0 8px #ff0080' }}>
        ESTADO DEL ROBOT
      </div>
      <div className="bg-black bg-opacity-80 border-2 border-cyber-pink p-3 md:p-4 min-h-[60px] flex items-center justify-center"
           style={{ boxShadow: 'inset 0 0 10px rgba(255, 0, 128, 0.3)' }}>
        {report ? (
          <code className="text-cyber-blue text-sm md:text-base font-bold animate-pulse" 
                style={{ textShadow: '0 0 10px #00f0ff' }}>
            {report}
          </code>
        ) : (
          <span className="text-cyber-blue text-opacity-50 text-xs md:text-sm font-bold">
            ESPERANDO REPORTE...
          </span>
        )}
      </div>
    </div>
  );
}
