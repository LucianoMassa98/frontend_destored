export default function Loader() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner principal */}
        <div className="relative">
          {/* Círculo exterior */}
          <div className="w-20 h-20 border-4 border-purple-300 border-opacity-30 rounded-full"></div>
          {/* Círculo animado */}
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-400 border-r-violet-400 rounded-full animate-spin"></div>
          {/* Círculo interior */}
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-b-purple-500 border-l-violet-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          {/* Punto central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Texto de carga */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-purple-100 animate-pulse mb-2">
            Cargando...
          </h2>
          <p className="text-purple-300 text-sm">
            Preparando tu experiencia
          </p>
        </div>
        
        {/* Puntos de carga */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
}
