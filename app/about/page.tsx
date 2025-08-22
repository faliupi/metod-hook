/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/landing-page/header";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center  min-h-full px-4 mt-10  sm:px-6 ">
        <div className="max-w-xl w-full space-y-8">
          <div>
            <Image className="mx-auto h-12 w-auto" src="/images/logo3.svg" alt="logo" width={300} height={300} />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">About Our Application</h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md  space-y-5">
              <div>

                <h2 className="font-semibold text-xl text-slate-600 mb-2">Overview</h2>
                {/* <p className="text-gray-600">Our application is a state-of-the-art solution designed to help you manage your tasks efficiently. With a focus on user experience, we aim to make your life easier.</p> */}
                <p className="text-gray-600">Emoview is application that can recognize student emotion in real-time during class meeting. This application can help teacher to know student's emotion and can help student to know their emotion.
                </p>
              </div>

              <div>

                <h2 className="font-semibold text-xl text-slate-600 mb-2 mt-4">Features</h2>
                <ul className="list-disc list-inside text-left text-gray-600 space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>

                      Realtime Emotion Recognition: Detect student emotion during class meeting.
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>
                      Emotion Summary: Get summary of student emotion during class meeting.
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>

                      Emotion History: Get history of student emotion during class meeting.
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>

                      Emotion Report: Get report of student emotion during class meeting.
                    </span>
                  </li>

                </ul>
              </div>

              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
