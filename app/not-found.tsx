'use client'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin telah dipindahkan atau dihapus.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Kembali ke Beranda
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="inline-block px-8 py-3 border-2 border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Halaman Sebelumnya
          </button>
        </div>
        
        <div className="mt-12 text-gray-500">
          <p>Atau coba fitur-fitur populer kami:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <a href="/" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">Mobile Legends</a>
            <a href="/" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">Free Fire</a>
            <a href="/" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">PUBG Mobile</a>
            <a href="/" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">Genshin Impact</a>
          </div>
        </div>
      </div>
    </div>
  )
}
