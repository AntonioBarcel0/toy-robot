export default function RobotReport({ report }) {
  return (
    <div className="border-2 border-gray-500 bg-black bg-opacity-70 p-4 md:p-5">
      <div className="text-gray-300 text-xs md:text-sm mb-3 font-bold">
        ESTADO DEL ROBOT
      </div>
      <div className="bg-black bg-opacity-80 border-2 border-gray-500 p-3 md:p-4 min-h-[60px] flex items-center justify-center">
        {report ? (
          <code className="text-white text-sm md:text-base font-bold">
            {report}
          </code>
        ) : (
          <span className="text-gray-400 text-xs md:text-sm font-bold">
            ESPERANDO REPORTE...
          </span>
        )}
      </div>
    </div>
  );
}
