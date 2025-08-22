import React from 'react'

function NotAuthorizedPageComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold">You are not authorized</h1>
      <p className="text-gray-500">Only the meeting owner and co-teachers can access this page</p>
    </div>)
}

export default NotAuthorizedPageComponent