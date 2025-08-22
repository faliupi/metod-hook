'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Loader2, School, UserCheck, Users, Video } from "lucide-react"
import RecentActivities from "./components/recent-activities"
import { useDashboardCount, useGetEmotionDistribution, useGetRecentMeetings } from "@/hooks/api/dashboard-service-hooks"

// const emotionData = [
//   { name: 'Happy', value: 40 },
//   { name: 'Neutral', value: 30 },
//   { name: 'Sad', value: 20 },
//   { name: 'Angry', value: 10 },
// ];
export default function Page() {
  const { data: dashboardCount, isPending } = useDashboardCount()
  const { data: recentMeetings, isPending: recentMeetingsPending } = useGetRecentMeetings({})
  const { data: valaroData, isPending: valaroDataPending } = useGetEmotionDistribution('EMOVALARO')
  const { data: faceApiData, isPending: faceApiDataPending } = useGetEmotionDistribution('FACE_API')


  if (isPending || recentMeetingsPending || valaroDataPending || faceApiDataPending) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  // console.log('dashboardCount', dashboardCount)
  // console.log('recentMeetings', recentMeetings)
  console.log('valaroData', valaroData)
  console.log('faceApiData', faceApiData)

  const recentMeetingsData = recentMeetings?.data
  // console.log('recentMeetings', recentMeetings?.data[0].name)
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* GREETING */}
        <h2 className="text-2xl font-semibold">
          Welcome back, John Doe! 
        </h2>

        {/* DATE FILTER */}


        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {/* Active Classes Card */}
          <div className="flex items-center p-6 space-x-4 rounded-xl bg-muted/50 hover:bg-muted/60 transition-colors">
            <div className="p-3 rounded-full bg-green-500/10">
              <School size={24} className="text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboardCount?.data.totalClassCurrentUser}</p>
              <h3 className="text-sm font-medium text-muted-foreground">Active Classes</h3>
            </div>
          </div>

          {/* Total Students Card */}
          <div className="flex items-center p-6 space-x-4 rounded-xl bg-muted/50 hover:bg-muted/60 transition-colors">
            <div className="p-3 rounded-full bg-blue-500/10">
              <Users size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboardCount?.data.totalMembersOfCurrentUserClass}</p>
              <h3 className="text-sm font-medium text-muted-foreground">Students Joined Your Classes</h3>
            </div>
          </div>


          {/* Total Meetings Card */}
          <div className="flex items-center p-6 space-x-4 rounded-xl bg-muted/50 hover:bg-muted/60 transition-colors">
            <div className="p-3 rounded-full bg-purple-500/10">
              <Video size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboardCount?.data.totalMeetingCurrentUser}</p>
              <h3 className="text-sm font-medium text-muted-foreground">Total Meetings</h3>
            </div>
          </div>
          {/* Total Meeting Participants */}
          <div className="flex items-center p-6 space-x-4 rounded-xl bg-muted/50 hover:bg-muted/60 transition-colors">
            <div className="p-3 rounded-full bg-green-600/10">
              <UserCheck size={24} className="text-green-800" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboardCount?.data.totalParticipantsOfCurrentUserMeeting}</p>
              <h3 className="text-sm font-medium text-muted-foreground">
                Students Participated in Meetings
              </h3>
            </div>
          </div>
        </div>
        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        {/* <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6 rounded-xl bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Emotion Distribution (Face-api.js)</h3>
            <div className="">
              <EmotionDistributionChart emotionData={emotionData} />
            </div>
          </div>
          <div className="p-6 rounded-xl bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Emotion Distribution (Emovalaro)</h3>
            <div className="">
              <EmotionDistributionChart emotionData={emotionData} />
            </div>
          </div>

        </div> */}
        {/* Recent Activities */}
        <div className="p-6 rounded-xl bg-muted/50 w-full">
          <h3 className="text-lg font-semibold mb-4">Recent Meetings</h3>

          <div className="  scrollbar-thin grid grid-cols-2 items-center gap-5">

            {/* <RecentActivities /> */}
            {recentMeetingsData?.map((meeting) => (
              <RecentActivities key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
