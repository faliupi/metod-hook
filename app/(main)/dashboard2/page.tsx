import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ButtonLogout } from "./components/button-logout"

const BASE_URL = process.env.API_URL

export default async function DashboardPage(){
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    redirect('/login'); // Redirect to the root page
  }
  const session = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  console.log(session.data)
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <h1>Dashboard Page</h1>

      <ul>
        <li>{session.data.fullname}</li>
        <li>{session.data.email}</li>
      </ul>

      {/* <button onClick={handleLogout}>Logout</button> */}
      <ButtonLogout />
    </div>
  )
}