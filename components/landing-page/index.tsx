/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { Button } from "../ui/button";
import Header from "./header";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export default async function LandingPage() {
  return (
    <div className="bg-[url('/bg-2.svg')] bg-cover bg-center bg-no-repeat bg-fixed ">
      <Header />
      <main className="flex  flex-col items-center    max-w-screen-lg mx-auto px-5 md:px-0">

        <section className=" w-full ">
          <div className="mx-auto max-w-screen-xl py-8 md:py-32 flex md:flex-row flex-col justify-between  items-center">
            <div>
              <h1 className="text-4xl font-extrabold">Connect and Learn with</h1>
              <h3 className="text-xl font-medium mt-3">Emodu: A video conferencing platform with deep emotion understanding for everyone</h3>
              <div className="flex justify-center md:justify-start gap-4 mt-8">
                <Link href="/class">
                  <Button className="m block w-full rounded-full bg-[#4ea1ef] px-12 py-3 text-sm  text-white drop-shadow-md hover:bg-blue-900 shadow-2xl focus:outline-none focus:ring active:bg-red-500 sm:w-auto font-bold">
                    Let&apos;s Go!
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <Image src="/images/landingpage/section1.svg" alt="landing" width={450} height={450} />
            </div>
          </div>

          <div className="-mt-44 mx-auto hidden md:flex justify-center">

            <Image src="/images/landingpage/stars.svg" alt="landing" width={350} height={350} />
          </div>
        </section>

        {/* SECTION : EMOTION IN EDUCATION */}
        <section className="mb-10 md:-mt-10">
          <Card className="relative rounded-3xl bg-center  bg-[url('/images/landingpage/bg-section2.svg')] border-none bg-cover">
            <CardContent className="flex items-center">
              <div>
                <Image src="/images/landingpage/section2.svg"
                  className="hidden md:flex md:-mt-24"
                  alt="landing" width={750} height={550} />
              </div>

              <div className="flex gap-10 py-5 md:py-0 ">
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold dark:text-black">Emotion in Education</h1>
                  <p className="text-xl mt-5 dark:text-slate-600">
                    Offering real-time emotion detection and analysis of participants feelings to enhance engagement and interaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 3: NEW EXPERIENCE */}
        <section className="flex flex-col md:flex-row  justify-between gap-10 px-5 md:px-0">
          <Card className="relative flex items-center  text-center rounded-[30px]  bg-center bg-[url('/images/landingpage/bg-section-exp.svg')] border-none bg-cover flex-1 ">
            <CardContent className="py-8 md:py-0">
              <h1 className="text-white font-bold text-xl md:text-6xl dark:text-black">
                New Experiences
              </h1>
              <p className="text-base md:text-xl mt-5 dark:text-slate-600">
                We have mission to help teachers and leaders create engaging and effective sessions by understanding participants feelings, fostering better learning and connections.
              </p>
            </CardContent>
          </Card>
          <div className="w-full  flex-1">
            <Image src="/images/landingpage/pict1.png" alt="landing"
              // layout="responsive"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 33vw"
              // width={450}
              quality={100}
              style={{ objectFit: "cover" }}
              className=" w-full" />

          </div>
        </section>



        {/* SECTION 4: SEPARATOR FEATURE  */}
        <section className="flex items-center flex-col justify-center gap-4 mt-10">
          {/* EMODU LOGO */}
          <Card className="bg-[#F2F8E2] rounded-full p-8 border-none">
            <div className="flex items-center gap-2">
              <Image src="/images/logo3.svg" alt="logo" width={50} height={50} />
            </div>

          </Card>

          {/* explanation */}
          <Card className="text-center py-7 mb-10 bg-[#F2F8E2] border-none">
            <div className="flex items-center gap-2 text-center">
              <h2 className="text-2xl font-bold text-center mx-auto dark:text-black">Emodu</h2>
            </div>
            <p className="text-sm dark:text-slate-600">
              Emodu is a video conferencing platform that offers real-time emotion detection and analysis of participants feelings to enhance engagement and interaction.
            </p>
          </Card>


        </section>


        {/* SECTION 5: OUR FEATURES */}
        <section className="flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 relative">
            <Image
              src="/images/landingpage/group-red-notext.png"
              alt="Background texture"
              width={300}
              height={300}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 top-60 md:top-56 mx-auto px-2">

              <h1 className=" text-white text-center font-bold text-2xl">
                Emotion Detection
              </h1>
              <p className="text-white text-center text-lg">Offering real-time emotion detection and analysis of participants' feelings to enhance engagement and interaction.</p>
            </div>
          </div>
          <div className="flex-1 relative mt-2">
            <Image
              src="/images/landingpage/group-green-notext.png"
              alt="Background texture"
              width={300}
              height={300}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 top-60 md:top-56 mx-auto px-2">

              <h1 className=" text-white text-center font-bold text-2xl">
                Statistic Report
              </h1>
              <p className="text-white text-center text-lg">Delivering reports on participants' emotions during conferences, showing if they're happy, sad, angry, and more.</p>
            </div>
          </div>
          <div className="flex-1 relative">
            <Image
              src="/images/landingpage/group-blue-notext.png"
              alt="Background texture"
              width={300}
              height={300}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 top-60 md:top-56 mx-auto px-2">

              <h1 className=" text-white text-center font-bold text-2xl">
                Engaging Meetings
              </h1>
              <p className="text-white text-center text-lg">Enhancing meetings with advanced technology, promoting dynamic and engaging sessions for all.</p>
            </div>
          </div>


          {/* <Card>

            <div className="relative overflow-hidden bg-red-400 rounded-lg p-6 max-w-sm mx-auto shadow-lg cursor-default group">
              <div className="absolute inset-0 z-0 transition-transform duration-500 ease-in-out transform group-hover:scale-110">
                <Image
                  src="/images/landingpage/pict2.png"
                  alt="Background texture"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20"
                />
              </div>


              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Emotion Detection</h2>
                <p className="text-white text-sm">
                  Offering real-time emotion detection and analysis of participants feelings to enhance engagement and interaction.                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-30"></div>
              <div className="absolute top-2 right-2 text-white text-2xl">✦</div>
              <div className="absolute bottom-2 left-2 text-white text-xl">✦</div>

              <div className="absolute top-0 right-0 w-16 h-16 z-20">
              </div>
            </div>
          </Card>

          <Card>
            <div className="relative overflow-hidden bg-green-600 rounded-lg p-6 max-w-sm mx-auto shadow-lg cursor-default group">
              <div className="absolute inset-0 z-0 transition-transform duration-500 ease-in-out transform group-hover:scale-110">
                <Image
                  src="/images/landingpage/pict3.png"
                  alt="Background texture"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20"
                />
              </div>


              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Statistic Report</h2>
                <p className="text-white text-sm">
                  Delivering reports on participants emotions during conferences, showing if they`re happy, sad, angry, and more.                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-30"></div>
              <div className="absolute top-2 right-2 text-white text-2xl">✦</div>
              <div className="absolute bottom-2 left-2 text-white text-xl">✦</div>

              <div className="absolute top-0 right-0 w-16 h-16 z-20">
              </div>
            </div>

          </Card>
          <Card>
            <div className="relative overflow-hidden bg-blue-400 rounded-lg p-6 max-w-sm mx-auto shadow-lg cursor-default group">
              <div className="absolute inset-0 z-0 transition-transform duration-500 ease-in-out transform group-hover:scale-110">
                <Image
                  src="/images/landingpage/pict4.png"
                  alt="Background texture"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20"
                />
              </div>


              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Engaging Meeting</h2>
                <p className="text-white text-sm">
                  Enhancing meetings with advanced technology, promoting dynamic and engaging sessions for all.
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-30"></div>
              <div className="absolute top-2 right-2 text-white text-2xl">✦</div>
              <div className="absolute bottom-2 left-2 text-white text-xl">✦</div>

              <div className="absolute top-0 right-0 w-16 h-16 z-20">
              </div>
            </div>

          </Card> */}
          {/* <Card>
          </Card> */}

        </section>

      </main>
      <footer className="mt-20">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mt-4  justify-center text-sm text-gray-500 lg:mt-0 flex gap-2 items-center">
            <Image src="/images/logo3.svg" alt="logo" width={30} height={30} />
            Copyright &copy; 2024. Human Computer Engineer RPL UPI.
          </p>
        </div>
      </footer>
    </div>
  );
}
