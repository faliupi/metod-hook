import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle, MoreHorizontal, CalendarDays, Link as LinkIcon } from 'lucide-react';
import { Meeting } from '@/hooks/api/class-service-hooks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useModalStore } from '@/hooks/use-modal-store';
import { useGetProfile } from '@/hooks/api/user-service-hooks';
import { RecentMeetings } from '@/hooks/api/dashboard-service-hooks';

interface MeetingCardProps {
  meeting: Meeting & RecentMeetings;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }) => {
  const { onOpen } = useModalStore();
  const { data: profileData } = useGetProfile();

  const isOwner = profileData?.data.id === meeting.createdBy;

  // console.log('isOwner', isOwner);

  return (
    <Card className="w-full  bg-white shadow-lg hover:shadow-xl transition-shadow duration-300
            dark:bg-transparent dark:shadow-none dark:hover:shadow-none dark:text-white dark:border dark:border-gray-700

    ">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full ${meeting.isStarted ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-500'
                }`}
            >
              {meeting.isStarted ? <CheckCircle size={16} /> : <MoreHorizontal size={16} />}
            </div>
            <h3 className="text-lg font-medium">{meeting.name}</h3>
          </div>
          <div className="text-gray-500">
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={18} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onOpen('editMeeting', meeting)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-red-600'
                    onClick={() => onOpen('deleteMeetingDialog', meeting)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CalendarDays size={16} className="text-gray-500" />
            <p className="text-gray-500">
              {format(new Date(meeting.createdAt), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <LinkIcon size={16} className="text-gray-500" />
            <a
              href={meeting.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {meeting.link}
            </a>
          </div>
          <p className="text-gray-700">{meeting.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/class/${meeting.classId}/m/${meeting.meetingCode}`}>
          <Button variant="default" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MeetingCard;