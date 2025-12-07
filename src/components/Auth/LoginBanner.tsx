import React from 'react'

const LoginBanner = () => {
  return (
    <div className="hidden md:flex bg-primary flex-col items-center justify-center text-white p-10">
        <h1 className="text-4xl font-bold text-center mb-6">Safe-Notely</h1>
        <p className="text-lg text-center">
          Securely manage your notes with Safe-Notely. Your privacy is our priority.
        </p>
      </div>
  )
}

export default LoginBanner
