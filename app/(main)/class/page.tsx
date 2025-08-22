"use client"
import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Loader2, LogInIcon, PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ClassData, useGetClass } from '@/hooks/api/class-service-hooks'
import ClassCard from './components/class-card'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useModalStore } from '@/hooks/use-modal-store'
function ClassPage() {
  const { onOpen } = useModalStore()
  const [searchQuery, setSearchQuery] = useState('')
  // const [selectedOption, setSelectedOption] = useState('all')
  const {
    data: classesResponse,
    isLoading,
    isError,
    error,
  } = useGetClass()

  const filteredClasses = classesResponse?.data?.filter((classItem: ClassData) =>
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.classCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                  List of Classes
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="hidden md:block" /> */}
              {/* <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0  ">

        {/* SEARCH BAR */}
        <div className="flex items-center gap-4 w-full justify-between">
          <Input type="text" placeholder="Search for a class"
            className="flex-1 p-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 max-w-md placeholder:gray-400 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className='flex gap-2'>
            <Button
              variant="default"
              className="flex items-center gap-2 px-4 py-2 text-sm"
              onClick={() => onOpen('joinClass')}
            >
              <LogInIcon size={16} />
              <span>Join Class</span>
            </Button>
            <Button
              variant="default"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 font-bold text-white"
              onClick={() => onOpen('createClass')}
            >
              <PlusIcon size={16} />
              <span>Add Class</span>
            </Button>
          </div>
        </div>

        {/* <div className='flex items-center gap-3'>
          <span>
            Filter by:
          </span>
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              setSelectedOption(value);
            }}
          >
            <SelectTrigger className="w-[300px] text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="owned">Owned</SelectItem>
                <SelectItem value="joined">Joined</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}

        {/* LIST OF CLASSES */}
        <div className=''>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              Error: {error?.message || 'Failed to load classes'}
            </div>
          ) : (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {filteredClasses?.map((classItem: ClassData) => (
                <ClassCard key={classItem.id} classData={classItem} />
              ))}
              {filteredClasses?.length === 0 && (
                <div className="col-span-3 flex justify-center items-center h-64 text-gray-500">
                  No classes found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ClassPage