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
    <div className="bg-white p-4 rounded-lg shadow h-full overflow-y-auto text-sm">
      <h2 className="text-lg font-semibold mb-3">Riwayat Deploy</h2>
      {loading ? (
        <p>Memuat data...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">Belum ada riwayat deploy</p>
      ) : (
        <ul className="space-y-1">
          {logs.map((log) => (
            <li
              key={log.id}
              className={`p-2 rounded-md border text-xs ${
                log.status === 'SUCCESS'
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-red-50 border-red-300 text-red-700'
              }`}
            >
              <div className="font-medium">{log.filename}</div>
              <div className="">{log.message}</div>
              <div className="text-[10px] text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}