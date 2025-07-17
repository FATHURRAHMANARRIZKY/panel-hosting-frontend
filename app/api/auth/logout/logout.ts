export async function logout() {
  try {
    const res = await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      // Hapus data lokal jika ada, misalnya auth context, localStorage, dll
      window.location.href = "/login"; // Arahkan ke halaman login
    } else {
      console.error("Gagal logout");
    }
  } catch (err) {
    console.error("Error saat logout:", err);
  }
}