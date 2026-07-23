export type TransactionType = "purchase" | "sale";

export type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
};


export type MatchResult = {
  id: string;
  date: string;
  opponent: string;
  competition: string;
  goalsFor: number;
  goalsAgainst: number;

  // Dati opzionali inseriti dal mister
  possession?: number;
  shots?: number;
  shotsOnTarget?: number;
  expectedGoals?: number;
  passesCompleted?: number;
  notes?: string;
};


export type CoachIdentity = {
  footballStyle: string;
  mentality: string;
  pressing: string;
  defensiveApproach: string;
  notes: string;
};


export type StaffMemory = {
  staffId: string;

  memories: string[];

  importantDecisions: string[];
};


export type StaffRelation = {
  staffId: string;

  value: number;
};


export type CareerEvent = {
  id: string;

  title: string;

  description: string;

  date: string;

  completed: boolean;
};


export type MarketOperationStatus =
  | "open"
  | "negotiation"
  | "completed"
  | "closed";


export type MarketOperation = {
  id: string;

  playerName?: string;

  type: "purchase" | "sale";

  description: string;

  status: MarketOperationStatus;

  date: string;
};


export type CareerMeeting = {
  id: string;

  title: string;

  date: string;

  participantIds: string[];

  status:
    | "scheduled"
    | "active"
    | "completed";

  summary?: string;
};


export type CareerDecision = {
  id: string;

  meetingId?: string;

  description: string;

  date: string;

  consequences?: string[];
};


export type Career = {
  currentDate: string;


  coach: {
    name: string;
    age: number;
    nationality: string;
  };


  // Identità allenatore costruita nel colloquio iniziale
  coachIdentity: CoachIdentity;


  philosophy: {
    style: string;
    pressing: string;
    defensiveLine: string;
  };


  team: {
    name: string;
    formation: string;
    objective: string;
  };


  finance: {
    initialTransferBudget: number;

    currentTransferBudget: number;

    initialSalaryBudget: number;

    currentSalaryBudget: number;

    transactions: Transaction[];
  };


  clubState: {
    presidentTrust: number;

    boardPressure: number;
  };


  // Rapporti personali con lo staff
  staffRelations: StaffRelation[];


  // Memoria permanente dello staff
  staffMemories: StaffMemory[];


  // Situazioni aperte di mercato
  marketOperations: MarketOperation[];


  // Eventi casuali carriera
  events: CareerEvent[];


  results: MatchResult[];


  meetings: CareerMeeting[];


  decisions: CareerDecision[];
};