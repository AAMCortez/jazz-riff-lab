import Image from "next/image";
import React from "react";

type Props = {};

export default function StartingPageContent({}: Props) {
   return (
      <div className="flex flex-col items-center justify-center space-y-10 min-h-screen bg-cyan-800">
         <h1 className="text-4xl font-bold text-white -mt-80 mb-8">
            Get ready to learn some jazz tunes!
         </h1>
         <section className="flex items-center justify-center">
            <Image
               src="/band.png"
               width={400}
               height={400}
               alt="band image"
               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
               className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
         </section>
      </div>
   );
}
