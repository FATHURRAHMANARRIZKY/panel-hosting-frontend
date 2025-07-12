'use client'

import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout') // Hapus cookie
    router.push('/login')           // Redirect ke login
  }

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-xl shadow">
      <h1 className="text-xl font-bold">F21 Hosting Panel</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </nav>
  )
}