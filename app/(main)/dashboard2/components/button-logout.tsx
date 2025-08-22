'use client'

export function ButtonLogout() {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={() => {
        fetch("/api/logout", {
          method: "POST",
        }).then(() => {
          window.location.href = "/"
        })
      }}
    >
      Logout
    </button>
  )
}