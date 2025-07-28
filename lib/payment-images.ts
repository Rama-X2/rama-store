// Payment Images Configuration
export const paymentImages = {
  // E-Wallet
  dana: '/images/payments/DANA_ID_CHNL_LOGO.webp',
  gopay: '/images/payments/GO_PAY_ID_CHNL_LOGO.webp',
  ovo: '/images/payments/OVO_ID_CHNL_LOGO.webp',
  shopeepay: '/images/payments/SHOPEE_PAY_ID_CHNL_LOGO.webp',
  qris: '/images/payments/QRIS_ID_CHNL_LOGO.webp',
  
  // Bank Transfer
  bank_transfer: '/images/payments/Bank_Transfer.webp',
  
  // Convenience Store
  alfamart: '/images/payments/Alfamart.webp',
  indomaret: '/images/payments/Indomaret_ID_CHNL_LOGO.webp',
  
  // Mobile Provider
  telkomsel: '/images/payments/TELKOMSEL_ID_CHNL_LOGO.webp',
  indosat: '/images/payments/INDOSAT_ID_CHNL_LOGO.webp',
  three: '/images/payments/Three.webp',
  xl: '/images/payments/xl-icon.webp'
};

// Payment Methods dengan icon dan nama
export const paymentMethods = [
  {
    id: 'dana',
    name: 'DANA',
    icon: paymentImages.dana,
    category: 'e-wallet'
  },
  {
    id: 'gopay',
    name: 'GoPay',
    icon: paymentImages.gopay,
    category: 'e-wallet'
  },
  {
    id: 'ovo',
    name: 'OVO',
    icon: paymentImages.ovo,
    category: 'e-wallet'
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    icon: paymentImages.shopeepay,
    category: 'e-wallet'
  },
  {
    id: 'qris',
    name: 'QRIS',
    icon: paymentImages.qris,
    category: 'qr-code'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: paymentImages.bank_transfer,
    category: 'bank'
  },
  {
    id: 'alfamart',
    name: 'Alfamart',
    icon: paymentImages.alfamart,
    category: 'convenience-store'
  },
  {
    id: 'indomaret',
    name: 'Indomaret',
    icon: paymentImages.indomaret,
    category: 'convenience-store'
  },
  {
    id: 'telkomsel',
    name: 'Telkomsel',
    icon: paymentImages.telkomsel,
    category: 'mobile-provider'
  },
  {
    id: 'indosat',
    name: 'Indosat',
    icon: paymentImages.indosat,
    category: 'mobile-provider'
  },
  {
    id: 'three',
    name: 'Three',
    icon: paymentImages.three,
    category: 'mobile-provider'
  },
  {
    id: 'xl',
    name: 'XL',
    icon: paymentImages.xl,
    category: 'mobile-provider'
  }
];

// Helper function untuk mendapatkan payment method berdasarkan kategori
export const getPaymentMethodsByCategory = (category: string) => {
  return paymentMethods.filter(method => method.category === category);
};

// Helper function untuk mendapatkan payment method berdasarkan ID
export const getPaymentMethodById = (id: string) => {
  return paymentMethods.find(method => method.id === id);
};