"use client";

import { motion } from "framer-motion";

export default function Carriera() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <motion.div
        className="w-full max-w-3xl p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h1 className="text-5xl font-bold text-center mb-10">
          NUOVA CARRIERA
        </h1>


        <div className="space-y-6">

          <input
            className="w-full p-4 rounded bg-gray-900 border border-gray-700"
            placeholder="Nome allenatore"
          />


          <input
            className="w-full p-4 rounded bg-gray-900 border border-gray-700"
            placeholder="Nazionalità"
          />


          <select className="w-full p-4 rounded bg-gray-900 border border-gray-700">
            <option>Scegli squadra</option>
            <option>Inter</option>
            <option>Milan</option>
            <option>Roma</option>
            <option>Juventus</option>
          </select>


          <select className="w-full p-4 rounded bg-gray-900 border border-gray-700">
            <option>Scegli modulo</option>
            <option>4-3-3</option>
            <option>4-2-3-1</option>
            <option>3-5-2</option>
          </select>


          <select className="w-full p-4 rounded bg-gray-900 border border-gray-700">
            <option>Obiettivo società</option>
            <option>Vincere il campionato</option>
            <option>Qualificazione europea</option>
            <option>Salvezza</option>
            <option>Valorizzare giovani</option>
          </select>


          <input
            className="w-full p-4 rounded bg-gray-900 border border-gray-700"
            placeholder="Budget mercato (€)"
          />


          <input
            className="w-full p-4 rounded bg-gray-900 border border-gray-700"
            placeholder="Monte ingaggi annuale (€)"
          />


          <button
            className="
            w-full
            mt-6
            bg-yellow-500
            text-black
            font-bold
            p-4
            rounded-xl
            text-xl
            hover:scale-105
            transition
            "
          >
            INIZIA STAGIONE
          </button>


        </div>

      </motion.div>

    </main>
  );
}
