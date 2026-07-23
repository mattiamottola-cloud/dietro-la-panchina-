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
};

export type CareerMeeting = {
  id: string;
  title: string;
  date: string;
  participantIds: string[];
  status: "scheduled" | "active" | "completed";
};

export type CareerDecision = {
  id: string;
  meetingId?: string;
  description: string;
  date: string;
};

export type Career = {
  currentDate: string;

  coach: {
    name: string;
    age: number;
    nationality: string;
  };

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

  results: MatchResult[];
  meetings: CareerMeeting[];
  decisions: CareerDecision[];
};