"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Header from "./header";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-[url('/bg-2.svg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <Header />
      <main className="flex  flex-col items-center  py-28 p-10 md:p-24  ">

        <section className="">
          <div className="mx-auto max-w-screen-xl px- py-8 md:py-32 lg:flex  lg:items-center">
            <div className="mx-auto w-full text-center">
              <h1 className="text-3xl  text-center font-extrabold sm:text-5xl tracking-wide ">
                Empowering Learning
                <strong className="font-extrabold text-[#58a6ef] sm:block">
                  {" "}
                  Through Emotional Insight.{" "}
                </strong>
              </h1>

              <p className="mt-4 sm:text-xl/relaxed text-slate-500 letter  ">
                Empower learning with emotional insight. Enhance engagement and
                understanding
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/dashboard">
                  <Button className=" block w-full rounded bg-[#4ea1ef] px-12 py-3 text-sm  text-white drop-shadow-md hover:bg-blue-900 shadow-2xl focus:outline-none focus:ring active:bg-red-500 sm:w-auto font-bold">
                    Let&apos;s Go!
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mt-4  justify-center text-sm text-gray-500 lg:mt-0 flex gap-2 items-center">
            <Image src="/images/logo2.svg" alt="logo" width={30} height={30} />
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
