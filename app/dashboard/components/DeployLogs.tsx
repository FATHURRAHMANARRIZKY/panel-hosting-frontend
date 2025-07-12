'use client'

import { useEffect, useState } from 'react'

type DeployLog = {
  id: string
  filename: string
  status: 'SUCCESS' | 'FAILED'
  message: string
  timestamp: string
}

export default function DeployLogs() {
  const [logs, setLogs] = useState<DeployLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:8080/logs', {
          credentials: 'include'
        })
        if (!res.ok) throw new Error('Gagal fetch logs')
        const data = await res.json()
        setLogs(data.reverse()) // dari terbaru ke terlama
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Riwayat Deploy</h2>
      {loading ? (
        <p>Memuat data...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">Belum ada riwayat deploy</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log) => (
            <li
              key={log.id}
              className={`p-3 rounded-lg border ${
                log.status === 'SUCCESS'
                  ? 'bg-green-50 border-green-400 text-green-800'
                  : 'bg-red-50 border-red-400 text-red-800'
              }`}
            >
              <div className="font-semibold">{log.filename}</div>
              <div className="text-sm">{log.message}</div>
              <div className="text-xs text-gray-600">{new Date(log.timestamp).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}