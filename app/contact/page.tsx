import Header from "@/components/landing-page/header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default  function ContactPage() {
  return (
    <div className="bg-[url('/bg-2.svg')] bg-cover bg-center bg-no-repeat bg-fixed h-screen" >
      <Header />

      <Card className="max-w-lg  justify-center items-center mt-36 md:mt-52  border mx-5 md:mx-auto border-none">
        <CardContent>
          <div className="flex gap-2 items-center justify-center">

            <Image src="/images/logo3.svg" alt="logo" width={100} height={100} className="my-5 " />
            {/* <h1 className="font-bold text-2xl text-slate-600 mb-4 mt-5">Contact</h1> */}
          </div>
          <p className="dark:text-gray-400 text-center">For questions, inquiries, or feedback you may have, feel free to reach out to us at <br />  <a
            href={`mailto:ronywahyu1@gmail.com`}
            className="text-blue-500 underline font-bold"
          >
            hcengineeringrpl@gmail.com
          </a>.
          <br />
            Our team is committed to providing timely and helpful responses.</p>
        </CardContent>
      </Card>
    </div>
  );
}
