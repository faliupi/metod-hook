import React from 'react'
import MeetingCard from '../../class/components/meeting-card'
import { RecentMeetings } from '@/hooks/api/dashboard-service-hooks'

interface RecentActivitiesProps {
  meeting: RecentMeetings
}

function RecentActivities({ meeting }: RecentActivitiesProps) {

  return (
    <MeetingCard meeting={meeting} />
  )
}

export default RecentActivities