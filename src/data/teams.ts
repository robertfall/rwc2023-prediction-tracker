import countryData from "./countries";

export type PoolName = "A" | "B" | "C" | "D";
export const poolA = [
  "New Zealand",
  "France",
  "Italy",
  "Uruguay",
  "Namibia",
] as const;
export const poolB = [
  "South Africa",
  "Ireland",
  "Scotland",
  "Tonga",
  "Romania",
] as const;
export const poolC = [
  "Wales",
  "Australia",
  "Fiji",
  "Georgia",
  "Portugal",
] as const;
export const poolD = [
  "England",
  "Japan",
  "Argentina",
  "Samoa",
  "Chile",
] as const;

export const teams = [...poolA, ...poolB, ...poolC, ...poolD] as const;
export type TeamName = (typeof teams)[number];
export type TeamData = (typeof countryData)[number];
export const teamData = teams.map((team) =>
  countryData.find((country) => country.name === team)
);
