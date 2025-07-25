'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600">
            500
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-red-400 to-orange-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Server Error
        </h2>
        
        <p className="text-gray-400 text-lg mb-8">
          Terjadi kesalahan pada server. Tim kami sudah mendapat notifikasi dan sedang menangani masalah ini.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={reset}
            className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            Coba Lagi
          </button>
          
          <a
            href="/"
            className="inline-block px-8 py-3 border-2 border-red-500 text-red-400 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            Kembali ke Beranda
          </a>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-left bg-gray-800 p-4 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">Error Details (Development):</h3>
            <pre className="text-xs text-gray-300 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
