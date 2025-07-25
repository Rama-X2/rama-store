'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-dark-light rounded-2xl border border-gray-700 p-8 text-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">⚠</span>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Oops! Terjadi Kesalahan
            </h1>
            
            <p className="text-gray-400 mb-8">
              Maaf, terjadi kesalahan yang tidak terduga. Tim kami sudah mendapat laporan dan sedang menangani masalah ini.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full px-6 py-3 bg-primary rounded-xl font-semibold text-white hover:bg-primary/80 transition-colors"
              >
                🔄 Coba Lagi
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full px-6 py-3 bg-dark border border-gray-600 rounded-xl font-semibold text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
              >
                🏠 Kembali ke Beranda
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-500">
                Masih mengalami masalah?{' '}
                <a 
                  href="mailto:support@topupgame.com" 
                  className="text-primary hover:text-secondary transition-colors"
                >
                  Hubungi Support
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
