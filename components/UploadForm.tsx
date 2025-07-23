'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast.error('Select the .zip file first')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    const res = await fetch('http://localhost:8080/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    setLoading(false)

    if (res.ok) {
      toast.success('Upload & Deploy sukses!')
      setFile(null)
    } else {
      const err = await res.text()
      toast.error('Gagal: ' + err)
    }
  }

  return (
    <form onSubmit={handleUpload} className="bg-white shadow-md p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Upload & Deploy Website</h2>
      <input
        type="file"
        accept=".zip"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Uploading...' : 'Upload & Deploy'}
      </button>
    </form>
  )
}