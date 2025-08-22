'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-500 to-slate-400">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          <span className="glitch" data-text="404">404</span>
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <div className="text-white mt-5">
          <span className="text-xl">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </span>
        </div>
        <div className="mt-6">
          <Button asChild variant="default">
            <Link href="/">
              Go Home
            </Link>
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .glitch {
          position: relative;
          animation: glitch 1s linear infinite;
        }
        
        @keyframes glitch {
          2%, 64% {
            transform: translate(2px, 0) skew(0deg);
          }
          4%, 60% {
            transform: translate(-2px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(5deg);
          }
        }
        
        .glitch:before,
        .glitch:after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          width: 100%;
          background: linear-gradient(to right, #4f46e5, #9333ea, #db2777);
          clip: rect(0, 0, 0, 0);
        }
        
        .glitch:before {
          left: -2px;
          text-shadow: 1px 0 #00fff9;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        .glitch:after {
          left: 2px;
          text-shadow: -1px 0 #ff00c1;
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% {
            clip: rect(64px, 9999px, 98px, 0);
          }
          5% {
            clip: rect(30px, 9999px, 16px, 0);
          }
          10% {
            clip: rect(80px, 9999px, 130px, 0);
          }
          15% {
            clip: rect(20px, 9999px, 76px, 0);
          }
          20% {
            clip: rect(48px, 9999px, 29px, 0);
          }
          25% {
            clip: rect(37px, 9999px, 128px, 0);
          }
          30% {
            clip: rect(57px, 9999px, 71px, 0);
          }
          35% {
            clip: rect(79px, 9999px, 83px, 0);
          }
          40% {
            clip: rect(2px, 9999px, 100px, 0);
          }
          45% {
            clip: rect(70px, 9999px, 72px, 0);
          }
          50% {
            clip: rect(46px, 9999px, 33px, 0);
          }
          55% {
            clip: rect(4px, 9999px, 42px, 0);
          }
          60% {
            clip: rect(26px, 9999px, 67px, 0);
          }
          65% {
            clip: rect(75px, 9999px, 23px, 0);
          }
          70% {
            clip: rect(42px, 9999px, 73px, 0);
          }
          75% {
            clip: rect(21px, 9999px, 44px, 0);
          }
          80% {
            clip: rect(69px, 9999px, 38px, 0);
          }
          85% {
            clip: rect(25px, 9999px, 84px, 0);
          }
          90% {
            clip: rect(95px, 9999px, 58px, 0);
          }
          95% {
            clip: rect(13px, 9999px, 39px, 0);
          }
          100% {
            clip: rect(53px, 9999px, 86px, 0);
          }
        }
      `}</style>
    </div>
  )
}