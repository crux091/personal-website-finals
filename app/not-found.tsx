import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-primary-400">Page Not Found</h1>
      <p className="mt-4 text-white/70 max-w-md">The page you are looking for does not exist or has been moved.</p>
      <a href="/" className="mt-6 inline-block rounded-md bg-primary-500 px-4 py-2 text-black font-semibold hover:bg-primary-600">Back Home</a>
    </div>
  )
}
