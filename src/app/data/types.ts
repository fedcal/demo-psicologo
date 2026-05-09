// Tipi TypeScript per i dati mock dello studio psicologico

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    linkedin?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface Tariffe {
  studioEuro: number;
  onlineEuro: number;
  primoColloquioEuro: number;
  primoColloquioDurataMm: number;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoStudio {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  albo: string;
  partitaIva: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  tariffe: Tariffe;
  metaSeo: MetaSeo;
}

export interface AreaIntervento {
  id: string;
  nome: string;
  icona: string;
  breve: string;
  descrizione: string;
  segnali: string[];
  featured: boolean;
}

export interface AreeIntervento {
  aree: AreaIntervento[];
}

export interface Modalita {
  id: string;
  nome: string;
  icona: string;
  tagline: string;
  descrizione: string;
  vantaggi: string[];
  tariffaEuro: number;
  durataMm: number;
  disponibilita: string;
  nota?: string;
}

export interface ModalitaData {
  modalita: Modalita[];
}

export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  titoli: string[];
  bio: string;
  anniEsperienza: number;
  specializzazioni: string[];
  lingue: string[];
}

export interface TeamData {
  team: MembroTeam[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}
