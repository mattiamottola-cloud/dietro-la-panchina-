export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 bg-[url('/images/stadium.jpg')] bg-cover bg-center opacity-60"></div>

      <div className="relative z-10 text-center text-white">

        <h1 className="text-6xl font-bold tracking-wider">
          DIETRO
          <br />
          LA PANCHINA
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          La carriera continua anche dopo il fischio finale.
        </p>


        <button
          className="
          mt-10
          px-10
          py-4
          rounded-xl
          bg-yellow-500
          text-black
          font-bold
          text-xl
          hover:scale-110
          transition
          "
        >
          AVVIA CARRIERA
        </button>

      </div>

    </main>
  );
}