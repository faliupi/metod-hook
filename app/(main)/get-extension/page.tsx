/* eslint-disable react/no-unescaped-entities */


'use client'

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'

function GetExtensionPage() {
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
      <Tabs defaultValue="download" className="w-full max-w-screen-xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="download">Download and Install</TabsTrigger>
          <TabsTrigger value="changelog">
            Changelog
            <Badge className="ml-2" >
              New
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="download">
          <Card>
            <CardHeader>
              <CardTitle>Download Emodu for Students</CardTitle>
              <CardDescription>Get started with the Emodu extension for students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-muted-foreground">Click the button below to download Emodu for Students extension.</p>
                <a
                  href="/ext/emodu-extensions.zip"
                  download
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Download Extension
                </a>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">How to Download and Install Extension</h3>
                <p>
                  Full Documentation:{' '}
                  <a
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => {
                      window.open('https://docs.google.com/document/d/1ZOHjrXTLpZ9BChw_MKTpYh3EoJCOWqAY0dnvbo67_uw/edit', '_blank')
                      window.location.reload()
                    }}
                    rel="noopener noreferrer"
                  >
                    Emodu for Students Documentation
                  </a>
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>
                    Use{' '}
                    <a
                      onClick={() => {
                        window.open('https://alternativeto.net/category/browsers/chromium-based/', '_blank')
                        window.location.reload()
                      }}
                      className="text-blue-500 hover:underline cursor-pointer"
                      rel="noopener noreferrer"
                    >
                      Chromium Based Browsers
                    </a>
                    {' '}to open Emoview app and extensions (Chrome, Ms. Edge, Opera, etc)
                  </li>
                  <li>Download the extension file by clicking the "Download Extension" button.</li>
                  <li>Extract the zip file.</li>
                  <li>Open your browser's extension management page.</li>
                  <li>Switch the <span className="font-semibold">Developer Mode</span> toggle to on</li>
                  <li>Drag and drop the extracted file into the extension management page.</li>
                  <li>Confirm the installation and wait for the process to complete.</li>
                  <li>Once installed, you should see our extension in your browser's toolbar.</li>
                  <li>Click on the extension icon to start using it.</li>
                </ul>
                <h3 className="text-lg font-semibold mt-6">How to Remove Extension</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Right Click on Emodu Extension</li>
                  <li>Click Remove from 'Browser Name'</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="changelog">
          <Card>
            <CardHeader>
              <CardTitle>Changelog</CardTitle>
              <CardDescription>Recent updates and changes to the Emodu extension</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <h4 className="text-sm font-semibold">05 December 2024 (Latest)</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>
                      Update new way to select reinforcement type for affective intervention
                    </li>

                  </ul>
                </li>
                <li>
                  <h4 className="text-sm font-semibold">28 November 2024 </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>
                      Fix affective intervention text not showing for face-api.js model
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 className="text-sm font-semibold">17 November 2024 </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>
                      Integrated with main dashboard
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 className="text-sm font-semibold">
                    10 November 2024
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {/* <li>Minor bug fixes and improvements</li>
                    <li>Updated user interface for better accessibility</li> */}
                    <li>
                      Interation with EmoValaro7 Model for emotion detection
                    </li>
                    <li>
                      Minor bug fixes and improvements
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 className="text-sm font-semibold">
                    9 November 2024
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>
                      Migration to new API for improved performance and some new features
                    </li>
                    {/* <li>Initial release of Emodu for Students</li>
                    <li>Basic functionality for note-taking and organization</li> */}
                  </ul>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>

  )
}

export default GetExtensionPage