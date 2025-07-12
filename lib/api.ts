export async function fetchWithToken(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: 'include', // selalu kirim cookie
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  })
  return res
}