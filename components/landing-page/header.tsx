/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Moon, Sun } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import useProfile from "@/hooks/user/useGetProfile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NavLink = ({ text, link }: { text: string; link: string }) => (
  <li>
    <Link
      className="text-gray-500 transition font-bold hover:text-gray-500/75"
      href={link}
    >
      {text}
    </Link>
  </li>
);


export default function Header() {
  const { profile, loading } = useProfile();
  const { theme, setTheme } = useTheme()
  const navLinks = [
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact",
      url: "/contact",
    },

    {
      name: "Get Extension",
      url: "/get-extension",
    },

    {
      name: "Dashboard",
      url: "/class",
    },
  ];

  // if(loading){
  //   return <Skeleton className="w-10 h-10 rounded-full" />
  // }

  // console.log('profile', profile);

  return (
    <header className="bg-white dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-10 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 ease-in-out py-3 ">
      <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            {/* Logo code here */}
            <Link href="/" className="flex items-center gap-2">

              <Image
                src="/images/logo-text.svg"
                alt="logo"
                width={100}
                height={100}
                className="cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {navLinks.map((item, index) => (
                    <NavLink text={item.name} key={index} link={item.url} />
                  ))}
                </ul>
              </nav>
            </div>

            <Separator orientation="vertical" className="h-10 " />

            <div className="flex items-center  sm:gap-2">
              <Button variant="ghost" className="rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun /> : <Moon />}
              </Button>
              {/* <Link
                href="/login"
              >
                <Button variant="default" className="rounded">Login</Button>
              </Link> */}

              {loading ? (
                <Skeleton className="w-10 h-10 rounded-full" />
              ) : !profile ? (
                <>
                  <Link
                    href="/login"
                    className="bg-[#61b0fa] text-white rounded-md px-5  py-2.5 text-sm font-medium shadow"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={profile?.avatar as any}
                        alt="Avatar picture"
                      />
                      <AvatarFallback>
                        RW
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className=""
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>

                        {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                        <span>Dark Mode</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer"
                        onClick={() => {
                          fetch("/api/logout", {
                            method: "POST",
                          }).then(() => {
                            window.location.href = "/"
                          })
                        }}                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                      {/* <a href="api/auth/logout">
                      </a> */}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile menu button code here */}
          </div>
        </div>
      </div>
    </header>
  );
}
