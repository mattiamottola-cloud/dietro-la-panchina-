"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ContractSigning from "@/components/cinematics/ContractSigning";
import { teams } from "@/data/teams";
import { saveCareer } from "@/lib/careerStorage";
import type { Career } from "@/types/career";

export default function Carriera() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [coachName, setCoachName] = useState("");
  const [coachAge, setCoachAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [startDate, setStartDate] = useState("");
  const [transferBudget, setTransferBudget] = useState("");
  const [salaryBudget, setSalaryBudget] = useState("");
  const [playStyle, setPlayStyle] = useState("");
  const [pressing, setPressing] = useState("");
  const [defensiveLine, setDefensiveLine] = useState("");
  const [formation, setFormation] = useState("");
  const [objective, setObjective] = useState("");

  const [pendingCareer, setPendingCareer] =
    useState<Career | null>(null);

  function formatBudget(value: string) {
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) {
      return "";
    }

    return Number(numericValue).toLocaleString("it-IT");
  }

  function parseBudget(value: string) {
    return Number(value.replace(/\./g, ""));
  }

  function formatDate(date: string) {
    if (!date) {
      return "Da scegliere";
    }

    const [year, month, day] = date.split("-").map(Number);

    const formattedDate = new Date(
      Date.UTC(year, month - 1, day)
    );

    if (Number.isNaN(formattedDate.getTime())) {
      return "Data non valida";
    }

    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(formattedDate);
  }

  function startCareer() {
    if (
      !coachName.trim() ||
      !coachAge ||
      !nationality.trim() ||
      !startDate ||
      !playStyle ||
      !pressing ||
      !defensiveLine ||
      !selectedTeam ||
      !formation ||
      !objective ||
      !transferBudget ||
      !salaryBudget
    ) {
      alert("Completa tutti i campi prima di iniziare la stagione.");
      return;
    }

    const coachAgeNumber = Number(coachAge);
    const transferBudgetNumber = parseBudget(transferBudget);
    const salaryBudgetNumber = parseBudget(salaryBudget);

    if (
      Number.isNaN(coachAgeNumber) ||
      coachAgeNumber < 18
    ) {
      alert("Inserisci un'età valida.");
      return;
    }

    if (
      Number.isNaN(transferBudgetNumber) ||
      transferBudgetNumber < 0 ||
      Number.isNaN(salaryBudgetNumber) ||
      salaryBudgetNumber < 0
    ) {
      alert("Inserisci dei budget validi.");
      return;
    }

    const career: Career = {
      currentDate: startDate,

      coach: {
        name: coachName.trim(),
        age: coachAgeNumber,
        nationality: nationality.trim(),
      },

      philosophy: {
        style: playStyle,
        pressing,
        defensiveLine,
      },

      team: {
        name: selectedTeam,
        formation,
        objective,
      },

      finance: {
        initialTransferBudget: transferBudgetNumber,
        currentTransferBudget: transferBudgetNumber,
        initialSalaryBudget: salaryBudgetNumber,
        currentSalaryBudget: salaryBudgetNumber,
        transactions: [],
      },

      clubState: {
        presidentTrust: 50,
        boardPressure: 0,
      },

      results: [],
      meetings: [],
      decisions: [],
    };

    setPendingCareer(career);
  }

  function confirmContract() {
    if (!pendingCareer) {
      return;
    }

    saveCareer(pendingCareer);
    window.location.href = "/dashboard";
  }

  function cancelContract() {
    setPendingCareer(null);
  }

  const inputClassName = `
    w-full
    rounded-xl
    border
    border-white/10
    bg-black/75
    px-4
    py-3.5
    text-white
    outline-none
    backdrop-blur-md
    transition
    placeholder:text-gray-500
    focus:border-yellow-500
    focus:ring-2
    focus:ring-yellow-500/20
  `;

  return (
    <>
      {pendingCareer && (
        <ContractSigning
          career={pendingCareer}
          onConfirm={confirmContract}
          onCancel={cancelContract}
        />
      )}

      <main
        className="
          min-h-screen
          bg-black
          bg-cover
          bg-center
          bg-fixed
          px-4
          py-8
          text-white
          md:px-8
          lg:px-12
        "
        style={{
          backgroundImage: "url('/images/stadium.jpg')",
        }}
      >
        <div className="fixed inset-0 bg-black/80" />

        <motion.div
          className="relative mx-auto w-full max-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <header className="mb-8 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.35em] text-yellow-500">
              Dietro la Panchina
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              NUOVA CARRIERA
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 md:text-base">
              Crea il tuo profilo, scegli la squadra e firma il tuo
              primo contratto da allenatore.
            </p>
          </header>

          {/* RIEPILOGO CARRIERA */}
          <section
            className="
              mb-8
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/5
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <div className="border-b border-white/10 px-5 py-4 md:px-7">
              <h2 className="font-bold text-white">
                Riepilogo della nuova carriera
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-5">
              <SummaryItem
                label="Allenatore"
                value={coachName || "Da compilare"}
              />

              <SummaryItem
                label="Squadra"
                value={selectedTeam || "Da scegliere"}
              />

              <SummaryItem
                label="Inizio incarico"
                value={formatDate(startDate)}
              />

              <SummaryItem
                label="Modulo"
                value={formation || "Da scegliere"}
              />

              <SummaryItem
                label="Obiettivo"
                value={objective || "Da scegliere"}
                highlighted
                wideOnMobile
              />
            </div>
          </section>

          {/* INDICATORE PERCORSO */}
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StepItem number="01" label="Allenatore" />
            <StepItem number="02" label="Squadra" />
            <StepItem number="03" label="Società" />
            <StepItem number="04" label="Contratto" />
          </div>

          {/* DATA DI INIZIO INCARICO */}
          <section
            className="
              mb-6
              overflow-hidden
              rounded-3xl
              border
              border-yellow-500/20
              bg-gradient-to-r
              from-black/90
              via-yellow-500/10
              to-black/90
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <div className="grid items-center gap-6 p-6 md:grid-cols-[1fr_320px] md:p-8">
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-yellow-500
                    text-2xl
                    text-black
                    shadow-lg
                    shadow-yellow-500/20
                  "
                >
                  📅
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
                    Inizio dell’incarico
                  </p>

                  <h2 className="mt-2 text-2xl font-black md:text-3xl">
                    Quando comincia la tua storia?
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
                    Questa sarà la data ufficiale della firma e il
                    primo giorno della tua carriera nel club.
                  </p>

                  <p className="mt-4 text-lg font-bold text-white">
                    {formatDate(startDate)}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="start-date"
                  className="mb-2 block text-sm font-semibold text-gray-300"
                >
                  Data di inizio carriera
                </label>

                <input
                  id="start-date"
                  type="date"
                  className={inputClassName}
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ALLENATORE */}
            <section
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-cover
                bg-center
                shadow-2xl
              "
              style={{
                backgroundImage: "url('/images/coach.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/75 to-black/95" />

              <div className="relative p-6">
                <SectionHeader
                  icon="👤"
                  eyebrow="Profilo"
                  title="Allenatore"
                />

                <div className="space-y-4">
                  <input
                    className={inputClassName}
                    placeholder="Nome allenatore"
                    value={coachName}
                    onChange={(event) =>
                      setCoachName(event.target.value)
                    }
                  />

                  <input
                    type="number"
                    min="18"
                    className={inputClassName}
                    placeholder="Età allenatore"
                    value={coachAge}
                    onChange={(event) =>
                      setCoachAge(event.target.value)
                    }
                  />

                  <input
                    className={inputClassName}
                    placeholder="Nazionalità"
                    value={nationality}
                    onChange={(event) =>
                      setNationality(event.target.value)
                    }
                  />

                  <select
                    className={inputClassName}
                    value={playStyle}
                    onChange={(event) =>
                      setPlayStyle(event.target.value)
                    }
                  >
                    <option value="">Stile di gioco</option>
                    <option value="Tiki-Taka">Tiki-Taka</option>
                    <option value="Tiki-Taka verticale">
                      Tiki-Taka verticale
                    </option>
                    <option value="Contropiede">
                      Contropiede
                    </option>
                    <option value="Contropiede fluido">
                      Contropiede fluido
                    </option>
                  </select>

                  <select
                    className={inputClassName}
                    value={pressing}
                    onChange={(event) =>
                      setPressing(event.target.value)
                    }
                  >
                    <option value="">Pressing</option>
                    <option value="Alto">Alto</option>
                    <option value="Medio">Medio</option>
                    <option value="Basso">Basso</option>
                  </select>

                  <select
                    className={inputClassName}
                    value={defensiveLine}
                    onChange={(event) =>
                      setDefensiveLine(event.target.value)
                    }
                  >
                    <option value="">Linea difensiva</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Bassa">Bassa</option>
                  </select>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Identità tecnica
                  </p>

                  <div className="mt-4 space-y-3">
                    <DetailRow
                      label="Allenatore"
                      value={coachName || "—"}
                    />

                    <DetailRow
                      label="Stile"
                      value={playStyle || "—"}
                    />

                    <DetailRow
                      label="Pressing"
                      value={pressing || "—"}
                    />

                    <DetailRow
                      label="Linea"
                      value={defensiveLine || "—"}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SQUADRA */}
            <section
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-cover
                bg-center
                shadow-2xl
              "
              style={{
                backgroundImage: "url('/images/team.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/75 to-black/95" />

              <div className="relative flex h-full flex-col p-6">
                <SectionHeader
                  icon="🏟"
                  eyebrow="Club"
                  title="Squadra"
                />

                <div className="space-y-4">
                  <select
                    className={inputClassName}
                    value={selectedTeam}
                    onChange={(event) =>
                      setSelectedTeam(event.target.value)
                    }
                  >
                    <option value="">Scegli squadra</option>

                    {teams.map((team) => (
                      <option key={team.name} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className={inputClassName}
                    value={formation}
                    onChange={(event) =>
                      setFormation(event.target.value)
                    }
                  >
                    <option value="">Scegli modulo</option>
                    <option value="4-3-3">4-3-3</option>
                    <option value="4-2-3-1">4-2-3-1</option>
                    <option value="3-5-2">3-5-2</option>
                    <option value="4-4-2">4-4-2</option>
                  </select>

                  <select
                    className={inputClassName}
                    value={objective}
                    onChange={(event) =>
                      setObjective(event.target.value)
                    }
                  >
                    <option value="">Obiettivo società</option>
                    <option value="Vincere il campionato">
                      Vincere il campionato
                    </option>
                    <option value="Qualificazione europea">
                      Qualificazione europea
                    </option>
                    <option value="Salvezza">Salvezza</option>
                    <option value="Valorizzare giovani">
                      Valorizzare giovani
                    </option>
                  </select>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Club selezionato
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {selectedTeam || "Nessuna squadra"}
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <InfoBox
                      label="Modulo"
                      value={formation || "—"}
                    />

                    <InfoBox
                      label="Obiettivo"
                      value={objective || "—"}
                    />
                  </div>

                  <div className="mt-3 rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-gray-500">
                      Data del primo giorno
                    </p>

                    <p className="mt-1 font-semibold text-yellow-400">
                      {formatDate(startDate)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SOCIETÀ */}
            <section
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-cover
                bg-center
                shadow-2xl
              "
              style={{
                backgroundImage: "url('/images/finance.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/75 to-black/95" />

              <div className="relative flex h-full flex-col p-6">
                <SectionHeader
                  icon="💰"
                  eyebrow="Risorse"
                  title="Società"
                />

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Budget mercato
                    </label>

                    <input
                      inputMode="numeric"
                      className={inputClassName}
                      placeholder="Esempio: 50.000.000"
                      value={transferBudget}
                      onChange={(event) =>
                        setTransferBudget(
                          formatBudget(event.target.value)
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Monte ingaggi annuale
                    </label>

                    <input
                      inputMode="numeric"
                      className={inputClassName}
                      placeholder="Esempio: 25.000.000"
                      value={salaryBudget}
                      onChange={(event) =>
                        setSalaryBudget(
                          formatBudget(event.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Disponibilità economica
                  </p>

                  <div className="mt-4 space-y-4">
                    <DetailRow
                      label="Mercato"
                      value={
                        transferBudget
                          ? `€ ${transferBudget}`
                          : "€ —"
                      }
                      highlighted
                    />

                    <div className="h-px bg-white/10" />

                    <DetailRow
                      label="Ingaggi"
                      value={
                        salaryBudget
                          ? `€ ${salaryBudget}`
                          : "€ —"
                      }
                      highlighted
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Fiducia iniziale
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Presidente
                    </span>

                    <span className="font-bold text-white">
                      50%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/60">
                    <div className="h-full w-1/2 rounded-full bg-yellow-500" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* AZIONE FINALE */}
          <section
            className="
              mt-8
              rounded-3xl
              border
              border-yellow-500/20
              bg-gradient-to-r
              from-yellow-500/5
              via-yellow-500/10
              to-yellow-500/5
              p-6
              text-center
              backdrop-blur-xl
              md:p-8
            "
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
              Ultimo passaggio
            </p>

            <h2 className="mt-3 text-2xl font-black md:text-3xl">
              Il contratto è pronto
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
              Controlla i dati. Premendo il pulsante entrerai nella
              sala del presidente per firmare ufficialmente il tuo
              incarico.
            </p>

            <button
              type="button"
              onClick={startCareer}
              className="
                mx-auto
                mt-6
                block
                w-full
                max-w-md
                rounded-2xl
                bg-yellow-500
                px-8
                py-4
                text-lg
                font-black
                text-black
                shadow-lg
                shadow-yellow-500/20
                transition
                hover:scale-[1.02]
                hover:bg-yellow-400
                active:scale-[0.98]
              "
            >
              INIZIA STAGIONE
            </button>
          </section>
        </motion.div>
      </main>
    </>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
  highlighted?: boolean;
  wideOnMobile?: boolean;
};

function SummaryItem({
  label,
  value,
  highlighted = false,
  wideOnMobile = false,
}: SummaryItemProps) {
  return (
    <div
      className={`
        bg-black/70
        p-4
        md:p-5
        ${wideOnMobile ? "col-span-2 md:col-span-1" : ""}
      `}
    >
      <p className="mb-1 text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p
        className={`
          truncate
          font-semibold
          ${highlighted ? "text-yellow-400" : "text-white"}
        `}
      >
        {value}
      </p>
    </div>
  );
}

type StepItemProps = {
  number: string;
  label: string;
};

function StepItem({ number, label }: StepItemProps) {
  return (
    <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-center">
      <span className="mr-2 text-yellow-400">
        {number}
      </span>

      <span className="text-sm font-semibold">
        {label}
      </span>
    </div>
  );
}

type SectionHeaderProps = {
  icon: string;
  eyebrow: string;
  title: string;
};

function SectionHeader({
  icon,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-xl text-black">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-yellow-400">
          {eyebrow}
        </p>

        <h2 className="text-2xl font-bold">
          {title}
        </h2>
      </div>
    </div>
  );
}

type InfoBoxProps = {
  label: string;
  value: string;
};

function InfoBox({ label, value }: InfoBoxProps) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 truncate font-semibold">
        {value}
      </p>
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
  highlighted?: boolean;
};

function DetailRow({
  label,
  value,
  highlighted = false,
}: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-400">
        {label}
      </span>

      <span
        className={`
          truncate
          text-right
          font-bold
          ${highlighted ? "text-yellow-400" : "text-white"}
        `}
      >
        {value}
      </span>
    </div>
  );
}