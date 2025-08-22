import { cookies } from "next/headers"
import { redirect } from "next/navigation";
export default async function ProtectedPage() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    redirect('/'); // Redirect to the root page
  }

  // console.log(getClass.data)

  

  // console.log(accessToken)
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <h1>Protected Page</h1>

      {/* <ul>
        {getClass.data.data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    </div>
  )
}