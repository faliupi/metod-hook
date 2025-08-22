import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

function ClassDetailNavigation() {
  return (
    <div className="flex h-5 items-center space-x-4 justify-between text-lg px-10 py-5">
      <div className="flex gap-4">
        <div className="hover:bg-gray-200 p-2">
          {/* <Link
            // className={cn(
            //   "text-gray-600 font-medium ",
            //   pathname === `/classes/${classesId}` &&
            //     "border-b-4 border-[#037A87] text-[#037A87]"
            // )}
            // href={`/classes/${classesId}`}
            href={`/classes/`}
          >
            
            Forum
          </Link> */}
        </div>
        <Separator orientation="vertical" />
        <div className="hover:bg-gray-200 p-2">
          <Link
            className={cn(
              "text-gray-600 font-medium",
              // pathname === `/classes/${classesId}/classwork` &&
                "border-b-4 border-[#037A87] text-[#037A87]"
            )}
            href={`/classes/11/classwork`}
          >
            Meetings
          </Link>
        </div>
        <Separator orientation="vertical" />
        {/* <div>People</div> */}
        <div className="hover:bg-gray-200 p-2">
          <Link
            className={cn(
              "text-gray-600 font-medium",
              // pathname === `/classes/${classesId}/people` &&
                "border-b-4 border-[#037A87] text-[#037A87]"
            )}
            href={`/classes/11/people`}
          >
            Classwork
          </Link>
        </div>
        <div className="hover:bg-gray-200 p-2">
          <Link
            className={cn(
              "text-gray-600 font-medium",
              // pathname === `/classes/${classesId}/meetings` &&
                "border-b-4 border-[#037A87] text-[#037A87]"
            )}
            href={`/classes/11/meetings`}
          >
            Members
          </Link>
        </div>
      </div>
      {/* {isTeacher && (
        <div
          className="cursor-pointer"
          onClick={() => onOpen("settingClass", { class: classData })}
        >
          <ActionTooltip className="cursor-pointer" label="Settings">
            <SettingsIcon className=" h-5 w-5 text-gray-500" />
          </ActionTooltip>
        </div>
      )} */}
    </div>
  )
}

export default ClassDetailNavigation