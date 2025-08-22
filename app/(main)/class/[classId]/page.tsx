'use client'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from '@/components/ui/separator'
import { Meeting, useGetClassById } from '@/hooks/api/class-service-hooks'
import MeetingCard from '../components/meeting-card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useModalStore } from '@/hooks/use-modal-store'
import { RecentMeetings } from '@/hooks/api/dashboard-service-hooks'

interface ClassDetailPageProps {
  params: {
    classId: string
  }
}

function ClassDetailPage({ params }: ClassDetailPageProps) {
  const {onOpen} = useModalStore()
  const {
    data: classDetail,

  } = useGetClassById(params.classId)
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/class">
                  List of Classes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {classDetail?.data.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <Separator />

      {/* MEETING SESSION */}
      <div className='p-5'>
        <div className='flex justify-between'>

          <h1 className='text-2xl font-bold mb-10'>Meetings</h1>

          <Button
            className='flex items-center gap-2'
            onClick={() => onOpen('createMeeting', { classId: params.classId })}
          >
            <PlusIcon />
            Create Meeting
          </Button>
        </div>

        <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
          {classDetail?.data.meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting as (Meeting & RecentMeetings)} />
          ))}
        </div>
      </div>

    </>
  )
}

export default ClassDetailPage