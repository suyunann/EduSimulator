
export enum AppState {
  Welcome,
  Simulation,
  Summary,
}

export enum StepId {
  Rapport,
  Discovery,
  Value,
  Objection,
  Closing,
}

export interface Choice {
  text: string;
  isCorrect: boolean;
  feedback: string;
  crmUpdate?: Partial<Customer>;
}

export interface Scene {
  id: number;
  customerDialogue: string | ((customer: Customer) => string);
  consultantPrompt: string;
  choices: Choice[];
}

export interface Step {
  id: StepId;
  title: string;
  icon: React.ReactNode;
  description: string;
  scenes: Scene[];
}

export interface Customer {
  name: string;
  interest: string;
  background: string;
  motivation: string;
  painPoint: string;
  budget: string;
  timeline: string;
}