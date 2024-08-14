import Link from "next/link";
import React from "react";

type Props = {};
let session = false;

export default function MainNavigation({}: Props) {
   return (
      <header className="w-full h-20 bg-cyan-700 shadow-md flex justify-between items-center px-[10%]">
         <Link className="no-underline text-white font-bold" href="/">
            <div className="font-lato text-2xl text-white m-0">Home</div>
         </Link>
         <nav>
            <ul className="list-none m-0 p-0 flex items-baseline">
               {!session && (
                  <li className="m-0 mx-4">
                     <Link className="no-underline text-white font-bold hover:text-red-900" href="/login">Login</Link>
                  </li>
               )}
               {session && (
                  <li className="m-0 mx-4">
                     <Link className="no-underline text-white font-bold hover:text-red-900" href="/profile">Profile</Link>
                  </li>
               )}
               {session && (
                  <li className="m-0 mx-4">
                     <button className="font-inherit bg-transparent border border-white text-white font-bold py-2 px-6 rounded-lg cursor-pointer">
                        Logout
                     </button>
                  </li>
               )}
            </ul>
         </nav>
      </header>
   );
}
