export interface TopupPackage {
  id: number
  amount: string
  price: string
  originalPrice?: string
  popular: boolean
}

export interface GamePackages {
  gameId: number
  packages: TopupPackage[]
}

// Data package untuk setiap game
export const gamePackages: GamePackages[] = [
  // Mobile Legends packages
  {
    gameId: 1, // Mobile Legends
    packages: [
      { id: 1, amount: '86 Diamonds', price: 'Rp 20.000', originalPrice: 'Rp 25.000', popular: false },
      { id: 2, amount: '172 Diamonds', price: 'Rp 40.000', originalPrice: 'Rp 50.000', popular: false },
      { id: 3, amount: '257 Diamonds', price: 'Rp 60.000', originalPrice: 'Rp 75.000', popular: true },
      { id: 4, amount: '344 Diamonds', price: 'Rp 80.000', originalPrice: 'Rp 100.000', popular: false },
      { id: 5, amount: '429 Diamonds', price: 'Rp 100.000', originalPrice: 'Rp 125.000', popular: false },
      { id: 6, amount: '514 Diamonds', price: 'Rp 120.000', originalPrice: 'Rp 150.000', popular: false },
      { id: 7, amount: '878 Diamonds', price: 'Rp 200.000', originalPrice: 'Rp 250.000', popular: false },
      { id: 8, amount: '1159 Diamonds', price: 'Rp 250.000', originalPrice: 'Rp 300.000', popular: false },
      { id: 9, amount: '2195 Diamonds', price: 'Rp 500.000', originalPrice: 'Rp 625.000', popular: false },
      { id: 10, amount: '4830 Diamonds', price: 'Rp 1.000.000', originalPrice: 'Rp 1.250.000', popular: false },
    ]
  },
  // Genshin Impact packages
  {
    gameId: 2, // Genshin Impact
    packages: [
      { id: 1, amount: '60 Genesis Crystals', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '300 Genesis Crystals', price: 'Rp 75.000', originalPrice: 'Rp 90.000', popular: false },
      { id: 3, amount: '980 Genesis Crystals', price: 'Rp 230.000', originalPrice: 'Rp 280.000', popular: true },
      { id: 4, amount: '1980 Genesis Crystals', price: 'Rp 450.000', originalPrice: 'Rp 550.000', popular: false },
      { id: 5, amount: '3280 Genesis Crystals', price: 'Rp 750.000', originalPrice: 'Rp 900.000', popular: false },
      { id: 6, amount: '6480 Genesis Crystals', price: 'Rp 1.450.000', originalPrice: 'Rp 1.750.000', popular: false },
    ]
  },
  // Free Fire packages
  {
    gameId: 20, // Free Fire
    packages: [
      { id: 1, amount: '50 Diamonds', price: 'Rp 8.000', popular: false },
      { id: 2, amount: '100 Diamonds', price: 'Rp 15.000', originalPrice: 'Rp 18.000', popular: false },
      { id: 3, amount: '210 Diamonds', price: 'Rp 30.000', originalPrice: 'Rp 35.000', popular: true },
      { id: 4, amount: '355 Diamonds', price: 'Rp 50.000', originalPrice: 'Rp 60.000', popular: false },
      { id: 5, amount: '720 Diamonds', price: 'Rp 100.000', originalPrice: 'Rp 120.000', popular: false },
      { id: 6, amount: '1450 Diamonds', price: 'Rp 200.000', originalPrice: 'Rp 240.000', popular: false },
      { id: 7, amount: '2180 Diamonds', price: 'Rp 300.000', originalPrice: 'Rp 360.000', popular: false },
      { id: 8, amount: '3640 Diamonds', price: 'Rp 500.000', originalPrice: 'Rp 600.000', popular: false },
    ]
  },
  // PUBG Mobile packages
  {
    gameId: 21, // PUBG Mobile
    packages: [
      { id: 1, amount: '60 UC', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '325 UC', price: 'Rp 75.000', originalPrice: 'Rp 85.000', popular: false },
      { id: 3, amount: '660 UC', price: 'Rp 150.000', originalPrice: 'Rp 175.000', popular: true },
      { id: 4, amount: '1800 UC', price: 'Rp 400.000', originalPrice: 'Rp 460.000', popular: false },
      { id: 5, amount: '3850 UC', price: 'Rp 800.000', originalPrice: 'Rp 950.000', popular: false },
      { id: 6, amount: '8100 UC', price: 'Rp 1.600.000', originalPrice: 'Rp 1.900.000', popular: false },
    ]
  },
  // Call of Duty Mobile packages
  {
    gameId: 22, // Call of Duty Mobile
    packages: [
      { id: 1, amount: '80 CP', price: 'Rp 20.000', popular: false },
      { id: 2, amount: '400 CP', price: 'Rp 90.000', originalPrice: 'Rp 110.000', popular: false },
      { id: 3, amount: '800 CP', price: 'Rp 180.000', originalPrice: 'Rp 220.000', popular: true },
      { id: 4, amount: '2000 CP', price: 'Rp 450.000', originalPrice: 'Rp 550.000', popular: false },
      { id: 5, amount: '5200 CP', price: 'Rp 1.100.000', originalPrice: 'Rp 1.350.000', popular: false },
      { id: 6, amount: '10800 CP', price: 'Rp 2.200.000', originalPrice: 'Rp 2.700.000', popular: false },
    ]
  },
  // Clash Royale packages
  {
    gameId: 23, // Clash Royale
    packages: [
      { id: 1, amount: '80 Gems', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '500 Gems', price: 'Rp 75.000', originalPrice: 'Rp 90.000', popular: false },
      { id: 3, amount: '1200 Gems', price: 'Rp 150.000', originalPrice: 'Rp 180.000', popular: true },
      { id: 4, amount: '2500 Gems', price: 'Rp 300.000', originalPrice: 'Rp 360.000', popular: false },
      { id: 5, amount: '6500 Gems', price: 'Rp 750.000', originalPrice: 'Rp 900.000', popular: false },
      { id: 6, amount: '14000 Gems', price: 'Rp 1.500.000', originalPrice: 'Rp 1.800.000', popular: false },
    ]
  },
  // Clash of Clans packages
  {
    gameId: 24, // Clash of Clans
    packages: [
      { id: 1, amount: '80 Gems', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '500 Gems', price: 'Rp 75.000', originalPrice: 'Rp 90.000', popular: false },
      { id: 3, amount: '1200 Gems', price: 'Rp 150.000', originalPrice: 'Rp 180.000', popular: true },
      { id: 4, amount: '2500 Gems', price: 'Rp 300.000', originalPrice: 'Rp 360.000', popular: false },
      { id: 5, amount: '6500 Gems', price: 'Rp 750.000', originalPrice: 'Rp 900.000', popular: false },
      { id: 6, amount: '14000 Gems', price: 'Rp 1.500.000', originalPrice: 'Rp 1.800.000', popular: false },
    ]
  },
  // Arena of Valor packages
  {
    gameId: 26, // Arena of Valor
    packages: [
      { id: 1, amount: '40 Vouchers', price: 'Rp 10.000', popular: false },
      { id: 2, amount: '200 Vouchers', price: 'Rp 45.000', originalPrice: 'Rp 55.000', popular: false },
      { id: 3, amount: '530 Vouchers', price: 'Rp 110.000', originalPrice: 'Rp 135.000', popular: true },
      { id: 4, amount: '1100 Vouchers', price: 'Rp 220.000', originalPrice: 'Rp 270.000', popular: false },
      { id: 5, amount: '2200 Vouchers', price: 'Rp 430.000', originalPrice: 'Rp 520.000', popular: false },
      { id: 6, amount: '5600 Vouchers', price: 'Rp 1.080.000', originalPrice: 'Rp 1.300.000', popular: false },
    ]
  },
  // Honkai Star Rail packages
  {
    gameId: 3, // Honkai Star Rail
    packages: [
      { id: 1, amount: '60 Oneiric Shards', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '300 Oneiric Shards', price: 'Rp 75.000', originalPrice: 'Rp 90.000', popular: false },
      { id: 3, amount: '980 Oneiric Shards', price: 'Rp 230.000', originalPrice: 'Rp 280.000', popular: true },
      { id: 4, amount: '1980 Oneiric Shards', price: 'Rp 450.000', originalPrice: 'Rp 550.000', popular: false },
      { id: 5, amount: '3280 Oneiric Shards', price: 'Rp 750.000', originalPrice: 'Rp 900.000', popular: false },
      { id: 6, amount: '6480 Oneiric Shards', price: 'Rp 1.450.000', originalPrice: 'Rp 1.750.000', popular: false },
    ]
  },
  // Netflix packages
  {
    gameId: 60, // Netflix
    packages: [
      { id: 1, amount: '1 Bulan Mobile', price: 'Rp 54.000', popular: false },
      { id: 2, amount: '1 Bulan Basic', price: 'Rp 120.000', originalPrice: 'Rp 150.000', popular: false },
      { id: 3, amount: '1 Bulan Standard', price: 'Rp 153.000', originalPrice: 'Rp 190.000', popular: true },
      { id: 4, amount: '1 Bulan Premium', price: 'Rp 186.000', originalPrice: 'Rp 230.000', popular: false },
      { id: 5, amount: '3 Bulan Standard', price: 'Rp 450.000', originalPrice: 'Rp 570.000', popular: false },
      { id: 6, amount: '6 Bulan Premium', price: 'Rp 1.050.000', originalPrice: 'Rp 1.380.000', popular: false },
    ]
  },
  // Spotify packages
  {
    gameId: 61, // Spotify
    packages: [
      { id: 1, amount: '1 Bulan Individual', price: 'Rp 54.000', popular: false },
      { id: 2, amount: '1 Bulan Duo', price: 'Rp 71.000', originalPrice: 'Rp 85.000', popular: false },
      { id: 3, amount: '1 Bulan Family', price: 'Rp 83.000', originalPrice: 'Rp 100.000', popular: true },
      { id: 4, amount: '3 Bulan Individual', price: 'Rp 150.000', originalPrice: 'Rp 180.000', popular: false },
      { id: 5, amount: '6 Bulan Family', price: 'Rp 450.000', originalPrice: 'Rp 540.000', popular: false },
      { id: 6, amount: '12 Bulan Individual', price: 'Rp 600.000', originalPrice: 'Rp 720.000', popular: false },
    ]
  },
  // YouTube Premium packages
  {
    gameId: 62, // YouTube Premium
    packages: [
      { id: 1, amount: '1 Bulan Individual', price: 'Rp 59.000', popular: false },
      { id: 2, amount: '1 Bulan Family', price: 'Rp 95.000', originalPrice: 'Rp 115.000', popular: true },
      { id: 3, amount: '3 Bulan Individual', price: 'Rp 165.000', originalPrice: 'Rp 195.000', popular: false },
      { id: 4, amount: '6 Bulan Family', price: 'Rp 540.000', originalPrice: 'Rp 690.000', popular: false },
      { id: 5, amount: '12 Bulan Individual', price: 'Rp 650.000', originalPrice: 'Rp 780.000', popular: false },
    ]
  },
  // Steam Wallet packages
  {
    gameId: 80, // Steam Wallet
    packages: [
      { id: 1, amount: '$5 USD', price: 'Rp 75.000', popular: false },
      { id: 2, amount: '$10 USD', price: 'Rp 150.000', originalPrice: 'Rp 170.000', popular: false },
      { id: 3, amount: '$20 USD', price: 'Rp 300.000', originalPrice: 'Rp 340.000', popular: true },
      { id: 4, amount: '$50 USD', price: 'Rp 750.000', originalPrice: 'Rp 850.000', popular: false },
      { id: 5, amount: '$100 USD', price: 'Rp 1.500.000', originalPrice: 'Rp 1.700.000', popular: false },
    ]
  },
  // Google Play packages
  {
    gameId: 81, // Google Play
    packages: [
      { id: 1, amount: 'Rp 20.000', price: 'Rp 22.000', popular: false },
      { id: 2, amount: 'Rp 50.000', price: 'Rp 53.000', originalPrice: 'Rp 58.000', popular: false },
      { id: 3, amount: 'Rp 100.000', price: 'Rp 105.000', originalPrice: 'Rp 115.000', popular: true },
      { id: 4, amount: 'Rp 200.000', price: 'Rp 210.000', originalPrice: 'Rp 230.000', popular: false },
      { id: 5, amount: 'Rp 500.000', price: 'Rp 520.000', originalPrice: 'Rp 575.000', popular: false },
    ]
  },
  // Apple iTunes packages
  {
    gameId: 82, // Apple iTunes
    packages: [
      { id: 1, amount: '$10 USD', price: 'Rp 155.000', popular: false },
      { id: 2, amount: '$25 USD', price: 'Rp 380.000', originalPrice: 'Rp 420.000', popular: false },
      { id: 3, amount: '$50 USD', price: 'Rp 750.000', originalPrice: 'Rp 830.000', popular: true },
      { id: 4, amount: '$100 USD', price: 'Rp 1.500.000', originalPrice: 'Rp 1.650.000', popular: false },
    ]
  },
  // PlayStation packages
  {
    gameId: 83, // PlayStation
    packages: [
      { id: 1, amount: '$10 USD', price: 'Rp 155.000', popular: false },
      { id: 2, amount: '$20 USD', price: 'Rp 305.000', originalPrice: 'Rp 340.000', popular: false },
      { id: 3, amount: '$50 USD', price: 'Rp 750.000', originalPrice: 'Rp 830.000', popular: true },
      { id: 4, amount: '$100 USD', price: 'Rp 1.500.000', originalPrice: 'Rp 1.650.000', popular: false },
    ]
  },
  // Valorant packages
  {
    gameId: 9, // Valorant
    packages: [
      { id: 1, amount: '420 VP', price: 'Rp 50.000', popular: false },
      { id: 2, amount: '875 VP', price: 'Rp 100.000', originalPrice: 'Rp 115.000', popular: false },
      { id: 3, amount: '1800 VP', price: 'Rp 200.000', originalPrice: 'Rp 230.000', popular: true },
      { id: 4, amount: '3775 VP', price: 'Rp 400.000', originalPrice: 'Rp 460.000', popular: false },
      { id: 5, amount: '8150 VP', price: 'Rp 800.000', originalPrice: 'Rp 920.000', popular: false },
    ]
  },
  // League of Legends packages
  {
    gameId: 10, // League of Legends
    packages: [
      { id: 1, amount: '650 RP', price: 'Rp 50.000', popular: false },
      { id: 2, amount: '1380 RP', price: 'Rp 100.000', originalPrice: 'Rp 115.000', popular: false },
      { id: 3, amount: '2800 RP', price: 'Rp 200.000', originalPrice: 'Rp 230.000', popular: true },
      { id: 4, amount: '5000 RP', price: 'Rp 350.000', originalPrice: 'Rp 400.000', popular: false },
      { id: 5, amount: '8250 RP', price: 'Rp 550.000', originalPrice: 'Rp 630.000', popular: false },
    ]
  },
  // Wild Rift packages
  {
    gameId: 11, // Wild Rift
    packages: [
      { id: 1, amount: '525 Wild Cores', price: 'Rp 65.000', popular: false },
      { id: 2, amount: '1075 Wild Cores', price: 'Rp 125.000', originalPrice: 'Rp 145.000', popular: false },
      { id: 3, amount: '2200 Wild Cores', price: 'Rp 250.000', originalPrice: 'Rp 290.000', popular: true },
      { id: 4, amount: '3500 Wild Cores', price: 'Rp 400.000', originalPrice: 'Rp 460.000', popular: false },
      { id: 5, amount: '7000 Wild Cores', price: 'Rp 750.000', originalPrice: 'Rp 860.000', popular: false },
    ]
  },
  // Tower of Fantasy packages
  {
    gameId: 4, // Tower of Fantasy
    packages: [
      { id: 1, amount: '60 Tanium', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '300 Tanium', price: 'Rp 75.000', originalPrice: 'Rp 90.000', popular: false },
      { id: 3, amount: '980 Tanium', price: 'Rp 230.000', originalPrice: 'Rp 280.000', popular: true },
      { id: 4, amount: '1980 Tanium', price: 'Rp 450.000', originalPrice: 'Rp 550.000', popular: false },
      { id: 5, amount: '3280 Tanium', price: 'Rp 750.000', originalPrice: 'Rp 900.000', popular: false },
    ]
  },
  // Wuthering Waves packages
  {
    gameId: 5, // Wuthering Waves
    packages: [
      { id: 1, amount: '60 Lunite', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '300 Lunite', price: 'Rp 75.000', originalPrice: 'Rp 90.000', popular: false },
      { id: 3, amount: '980 Lunite', price: 'Rp 230.000', originalPrice: 'Rp 280.000', popular: true },
      { id: 4, amount: '1980 Lunite', price: 'Rp 450.000', originalPrice: 'Rp 550.000', popular: false },
      { id: 5, amount: '3280 Lunite', price: 'Rp 750.000', originalPrice: 'Rp 900.000', popular: false },
    ]
  },
  // Zenless Zone Zero packages
  {
    gameId: 6, // Zenless Zone Zero
    packages: [
      { id: 1, amount: '60 Polychrome', price: 'Rp 15.000', popular: false },
      { id: 2, amount: '300 Polychrome', price: 'Rp 75.000', originalPrice: 'Rp 90.000', popular: false },
      { id: 3, amount: '980 Polychrome', price: 'Rp 230.000', originalPrice: 'Rp 280.000', popular: true },
      { id: 4, amount: '1980 Polychrome', price: 'Rp 450.000', originalPrice: 'Rp 550.000', popular: false },
      { id: 5, amount: '3280 Polychrome', price: 'Rp 750.000', originalPrice: 'Rp 900.000', popular: false },
    ]
  }
]

// Fungsi untuk mendapatkan package berdasarkan game ID
export const getPackagesByGameId = (gameId: number): TopupPackage[] => {
  const gamePackage = gamePackages.find(pkg => pkg.gameId === gameId)
  
  // Jika tidak ada package spesifik, return default Mobile Legends packages
  if (!gamePackage) {
    const defaultPackage = gamePackages.find(pkg => pkg.gameId === 1)
    return defaultPackage?.packages || []
  }
  
  return gamePackage.packages
}