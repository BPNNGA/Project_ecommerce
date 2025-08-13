import React from 'react'

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--secondary)]/10 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Error Icon */}
          <div className="w-24 h-24 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Page Not Found</h2>
          <p className="text-[var(--muted)] mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-[var(--primary)] hover:bg-[var(--accent)] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Go Back
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-white border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
            >
              Go Home
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-[var(--primary)]/20">
            <p className="text-sm text-[var(--muted)]">
              Need help? <a href="/contact" className="text-[var(--primary)] hover:text-[var(--accent)] font-semibold">Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
