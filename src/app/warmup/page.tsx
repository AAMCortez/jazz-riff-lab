"use client"
import React, { useState } from "react";
import WarmupBass from "../components/warmup/WarmupBass";
import WarmupGuitar from "../components/warmup/WarmupGuitar";

type Props = {};

function WarmUp({}: Props) {
   const [selectedInstrument, setSelectedInstrument] = useState<
      "Bass" | "Guitar" | null
   >(null);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
         <h1 className="text-2xl font-bold mb-4">Bass or Guitar?</h1>

         <div className="mb-8">
            <button
               onClick={() => setSelectedInstrument("Bass")}
               className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 m-2 rounded"
            >
               Bass
            </button>
            <button
               onClick={() => setSelectedInstrument("Guitar")}
               className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 m-2 rounded"
            >
               Guitar
            </button>
         </div>

         {selectedInstrument === "Bass" && <WarmupBass />}
         {selectedInstrument === "Guitar" && <WarmupGuitar />}
      </div>
   );
}

export default WarmUp;
