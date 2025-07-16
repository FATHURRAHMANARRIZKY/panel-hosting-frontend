'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })

    if (res.ok) {
      toast.success('Login sukses')
      router.push('/dashboard')
    } else {
      toast.error('Login gagal')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <form onSubmit={handleLogin} className="bg-white p-8 text-black rounded-xl shadow-xl w-full max-w-sm space-y-8">
        <h1 className="text-2xl font-bold text-center">Login Panel</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-4 py-2 rounded focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  )
}