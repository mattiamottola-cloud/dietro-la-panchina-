"use client";

import { useEffect, useState } from "react";
import { staff } from "@/data/staff";
import type { Career } from "@/types/career";

export default function Dashboard() {

  const [career, setCareer] = useState<Career | null>(null);
  useEffect(() => {

    const savedCareer = localStorage.getItem("career");

    if(savedCareer){
      setCareer(JSON.parse(savedCareer));
    }

  }, []);


  if(!career){
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1>
          Nessuna carriera trovata
        </h1>
      </main>
    );
  }


  return (

    <main
    className="
    min-h-screen
    bg-black
    text-white
    p-10
    bg-cover
    bg-center
    "
    style={{
      backgroundImage:
      "url('/images/stadium.jpg')"
    }}
    >


      <div className="bg-black/70 min-h-screen p-10 rounded-3xl">


      <h1 className="text-5xl font-bold text-center mb-6">
        DIETRO LA PANCHINA
      </h1>


      <div className="text-center mb-10">

        <button
        className="
        bg-yellow-500
        text-black
        font-bold
        px-8
        py-4
        rounded-xl
        hover:scale-105
        transition
        "
        >
          AVANZA GIORNO
        </button>

      </div>



      <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      ">


      {staff.map((person)=>(

        <div
        key={person.id}
        className="
        rounded-2xl
        overflow-hidden
        border
        border-gray-700
        bg-gray-900/80
        hover:scale-105
        transition
        "
        >

          <img
          src={person.image}
          className="
          w-full
          h-48
          object-cover
          "
          />


          <div className="p-5">

          <h2 className="text-2xl font-bold">
            {person.name}
          </h2>

          <p className="text-gray-300 mt-2">
            {person.role}
          </p>


          <button
          className="
          mt-5
          w-full
          bg-yellow-500
          text-black
          font-bold
          p-3
          rounded-xl
          "
          >
            APRI CHAT
          </button>


          </div>


        </div>

      ))}


      </div>


      </div>


    </main>

  );

}