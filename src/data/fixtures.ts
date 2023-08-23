import { TeamName, GroupName } from "./teams";

export type MatchNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48;
export type PoolTeam = { pool: GroupName; position: number };
export type MatchOutcome = "winner" | "loser";
export type MatchTeam = { matchNumber: number; team: MatchOutcome };
export type FixtureTeam = TeamName | PoolTeam | MatchTeam;

export type Fixture = {
  matchNumber: MatchNumber;
  roundNumber: number;
  dateUtc: string;
  location: string;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  group?: GroupName;
};

export type fixturesByMatch = Record<MatchNumber, Fixture>;

export function groupByMatchNumber(
  fixtures: readonly Fixture[]
): Partial<fixturesByMatch> {
  return fixtures.reduce((acc, fixture) => {
    return {
      ...acc,
      [fixture.matchNumber]: fixture,
    };
  }, {});
}

export const fixtures: readonly Fixture[] = [
  {
    matchNumber: 1,
    roundNumber: 1,
    dateUtc: "2023-09-08 19:15:00Z",
    location: "Stade de France",
    homeTeam: "France",
    awayTeam: "New Zealand",
    group: "A",
  },
  {
    matchNumber: 2,
    roundNumber: 1,
    dateUtc: "2023-09-09 11:00:00Z",
    location: "Stade Geoffroy-Guichard",
    homeTeam: "Italy",
    awayTeam: "Namibia",
    group: "A",
  },
  {
    matchNumber: 3,
    roundNumber: 1,
    dateUtc: "2023-09-09 13:30:00Z",
    location: "Stade de Bordeaux",
    homeTeam: "Ireland",
    awayTeam: "Romania",
    group: "B",
  },
  {
    matchNumber: 4,
    roundNumber: 1,
    dateUtc: "2023-09-09 16:00:00Z",
    location: "Stade de France",
    homeTeam: "Australia",
    awayTeam: "Georgia",
    group: "C",
  },
  {
    matchNumber: 5,
    roundNumber: 1,
    dateUtc: "2023-09-09 19:00:00Z",
    location: "Stade de Marseille",
    homeTeam: "England",
    awayTeam: "Argentina",
    group: "D",
  },
  {
    matchNumber: 6,
    roundNumber: 1,
    dateUtc: "2023-09-10 11:00:00Z",
    location: "Stadium de Toulouse",
    homeTeam: "Japan",
    awayTeam: "Chile",
    group: "D",
  },
  {
    matchNumber: 7,
    roundNumber: 1,
    dateUtc: "2023-09-10 15:45:00Z",
    location: "Stade de Marseille",
    homeTeam: "South Africa",
    awayTeam: "Scotland",
    group: "B",
  },
  {
    matchNumber: 8,
    roundNumber: 1,
    dateUtc: "2023-09-10 19:00:00Z",
    location: "Stade de Bordeaux",
    homeTeam: "Wales",
    awayTeam: "Fiji",
    group: "C",
  },
  {
    matchNumber: 9,
    roundNumber: 2,
    dateUtc: "2023-09-14 19:00:00Z",
    location: "Stade Pierre-Mauroy",
    homeTeam: "France",
    awayTeam: "Uruguay",
    group: "A",
  },
  {
    matchNumber: 10,
    roundNumber: 2,
    dateUtc: "2023-09-15 19:00:00Z",
    location: "Stadium de Toulouse",
    homeTeam: "New Zealand",
    awayTeam: "Namibia",
    group: "A",
  },
  {
    matchNumber: 11,
    roundNumber: 2,
    dateUtc: "2023-09-16 13:00:00Z",
    location: "Stade de Bordeaux",
    homeTeam: "Samoa",
    awayTeam: "Chile",
    group: "D",
  },
  {
    matchNumber: 12,
    roundNumber: 2,
    dateUtc: "2023-09-16 15:45:00Z",
    location: "Stade de Nice",
    homeTeam: "Wales",
    awayTeam: "Portugal",
    group: "C",
  },
  {
    matchNumber: 13,
    roundNumber: 2,
    dateUtc: "2023-09-16 19:00:00Z",
    location: "Stade de la Beaujoire",
    homeTeam: "Ireland",
    awayTeam: "Tonga",
    group: "B",
  },
  {
    matchNumber: 14,
    roundNumber: 2,
    dateUtc: "2023-09-17 13:00:00Z",
    location: "Stade de Bordeaux",
    homeTeam: "South Africa",
    awayTeam: "Romania",
    group: "B",
  },
  {
    matchNumber: 15,
    roundNumber: 2,
    dateUtc: "2023-09-17 15:45:00Z",
    location: "Stade Geoffroy-Guichard",
    homeTeam: "Australia",
    awayTeam: "Fiji",
    group: "C",
  },
  {
    matchNumber: 16,
    roundNumber: 2,
    dateUtc: "2023-09-17 19:00:00Z",
    location: "Stade de Nice",
    homeTeam: "England",
    awayTeam: "Japan",
    group: "D",
  },
  {
    matchNumber: 17,
    roundNumber: 3,
    dateUtc: "2023-09-20 15:45:00Z",
    location: "Stade de Nice",
    homeTeam: "Italy",
    awayTeam: "Uruguay",
    group: "A",
  },
  {
    matchNumber: 18,
    roundNumber: 3,
    dateUtc: "2023-09-21 19:00:00Z",
    location: "Stade de Marseille",
    homeTeam: "France",
    awayTeam: "Namibia",
    group: "A",
  },
  {
    matchNumber: 19,
    roundNumber: 3,
    dateUtc: "2023-09-22 15:45:00Z",
    location: "Stade Geoffroy-Guichard",
    homeTeam: "Argentina",
    awayTeam: "Samoa",
    group: "D",
  },
  {
    matchNumber: 20,
    roundNumber: 3,
    dateUtc: "2023-09-23 12:00:00Z",
    location: "Stadium de Toulouse",
    homeTeam: "Georgia",
    awayTeam: "Portugal",
    group: "C",
  },
  {
    matchNumber: 21,
    roundNumber: 3,
    dateUtc: "2023-09-23 15:45:00Z",
    location: "Stade Pierre-Mauroy",
    homeTeam: "England",
    awayTeam: "Chile",
    group: "D",
  },
  {
    matchNumber: 22,
    roundNumber: 3,
    dateUtc: "2023-09-23 19:00:00Z",
    location: "Stade de France",
    homeTeam: "South Africa",
    awayTeam: "Ireland",
    group: "B",
  },
  {
    matchNumber: 23,
    roundNumber: 3,
    dateUtc: "2023-09-24 15:45:00Z",
    location: "Stade de Nice",
    homeTeam: "Scotland",
    awayTeam: "Tonga",
    group: "B",
  },
  {
    matchNumber: 24,
    roundNumber: 3,
    dateUtc: "2023-09-24 19:00:00Z",
    location: "OL Stadium",
    homeTeam: "Wales",
    awayTeam: "Australia",
    group: "C",
  },
  {
    matchNumber: 25,
    roundNumber: 4,
    dateUtc: "2023-09-27 15:45:00Z",
    location: "OL Stadium",
    homeTeam: "Uruguay",
    awayTeam: "Namibia",
    group: "A",
  },
  {
    matchNumber: 26,
    roundNumber: 4,
    dateUtc: "2023-09-28 19:00:00Z",
    location: "Stadium de Toulouse",
    homeTeam: "Japan",
    awayTeam: "Samoa",
    group: "D",
  },
  {
    matchNumber: 27,
    roundNumber: 4,
    dateUtc: "2023-09-29 19:00:00Z",
    location: "OL Stadium",
    homeTeam: "New Zealand",
    awayTeam: "Italy",
    group: "A",
  },
  {
    matchNumber: 28,
    roundNumber: 4,
    dateUtc: "2023-09-30 13:00:00Z",
    location: "Stade de la Beaujoire",
    homeTeam: "Argentina",
    awayTeam: "Chile",
    group: "D",
  },
  {
    matchNumber: 29,
    roundNumber: 4,
    dateUtc: "2023-09-30 15:45:00Z",
    location: "Stade de Bordeaux",
    homeTeam: "Fiji",
    awayTeam: "Georgia",
    group: "C",
  },
  {
    matchNumber: 30,
    roundNumber: 4,
    dateUtc: "2023-09-30 19:00:00Z",
    location: "Stade Pierre-Mauroy",
    homeTeam: "Scotland",
    awayTeam: "Romania",
    group: "B",
  },
  {
    matchNumber: 31,
    roundNumber: 4,
    dateUtc: "2023-10-01 15:45:00Z",
    location: "Stade Geoffroy-Guichard",
    homeTeam: "Australia",
    awayTeam: "Portugal",
    group: "C",
  },
  {
    matchNumber: 32,
    roundNumber: 4,
    dateUtc: "2023-10-01 19:00:00Z",
    location: "Stade de Marseille",
    homeTeam: "South Africa",
    awayTeam: "Tonga",
    group: "B",
  },
  {
    matchNumber: 33,
    roundNumber: 5,
    dateUtc: "2023-10-05 19:00:00Z",
    location: "OL Stadium",
    homeTeam: "New Zealand",
    awayTeam: "Uruguay",
    group: "A",
  },
  {
    matchNumber: 34,
    roundNumber: 5,
    dateUtc: "2023-10-06 19:00:00Z",
    location: "OL Stadium",
    homeTeam: "France",
    awayTeam: "Italy",
    group: "A",
  },
  {
    matchNumber: 35,
    roundNumber: 5,
    dateUtc: "2023-10-07 13:00:00Z",
    location: "Stade de la Beaujoire",
    homeTeam: "Wales",
    awayTeam: "Georgia",
    group: "C",
  },
  {
    matchNumber: 36,
    roundNumber: 5,
    dateUtc: "2023-10-07 15:45:00Z",
    location: "Stade Pierre-Mauroy",
    homeTeam: "England",
    awayTeam: "Samoa",
    group: "D",
  },
  {
    matchNumber: 37,
    roundNumber: 5,
    dateUtc: "2023-10-07 19:00:00Z",
    location: "Stade de France",
    homeTeam: "Ireland",
    awayTeam: "Scotland",
    group: "B",
  },
  {
    matchNumber: 38,
    roundNumber: 5,
    dateUtc: "2023-10-08 11:00:00Z",
    location: "Stade de la Beaujoire",
    homeTeam: "Japan",
    awayTeam: "Argentina",
    group: "D",
  },
  {
    matchNumber: 39,
    roundNumber: 5,
    dateUtc: "2023-10-08 15:45:00Z",
    location: "Stade Pierre-Mauroy",
    homeTeam: "Tonga",
    awayTeam: "Romania",
    group: "B",
  },
  {
    matchNumber: 40,
    roundNumber: 5,
    dateUtc: "2023-10-08 19:00:00Z",
    location: "Stadium de Toulouse",
    homeTeam: "Fiji",
    awayTeam: "Portugal",
    group: "C",
  },
  {
    matchNumber: 41,
    roundNumber: 6,
    dateUtc: "2023-10-14 15:00:00Z",
    location: "Stade de Marseille",
    homeTeam: { pool: "C", position: 1 },
    awayTeam: { pool: "D", position: 2 },
  },
  {
    matchNumber: 42,
    roundNumber: 6,
    dateUtc: "2023-10-14 19:00:00Z",
    location: "Stade de France",
    homeTeam: { pool: "B", position: 1 },
    awayTeam: { pool: "A", position: 2 },
  },
  {
    matchNumber: 43,
    roundNumber: 6,
    dateUtc: "2023-10-15 15:00:00Z",
    location: "Stade de Marseille",
    homeTeam: { pool: "D", position: 1 },
    awayTeam: { pool: "C", position: 2 },
  },
  {
    matchNumber: 44,
    roundNumber: 6,
    dateUtc: "2023-10-15 19:00:00Z",
    location: "Stade de France",
    homeTeam: { pool: "A", position: 1 },
    awayTeam: { pool: "B", position: 2 },
  },
  {
    matchNumber: 45,
    roundNumber: 7,
    dateUtc: "2023-10-20 19:00:00Z",
    location: "Stade de France",
    homeTeam: { matchNumber: 41, team: "winner" },
    awayTeam: { matchNumber: 42, team: "winner" },
  },
  {
    matchNumber: 46,
    roundNumber: 7,
    dateUtc: "2023-10-21 19:00:00Z",
    location: "Stade de France",
    homeTeam: { matchNumber: 43, team: "winner" },
    awayTeam: { matchNumber: 44, team: "winner" },
  },
  {
    matchNumber: 47,
    roundNumber: 8,
    dateUtc: "2023-10-27 19:00:00Z",
    location: "Stade de France",
    homeTeam: { matchNumber: 45, team: "loser" },
    awayTeam: { matchNumber: 46, team: "loser" },
  },
  {
    matchNumber: 48,
    roundNumber: 8,
    dateUtc: "2023-10-28 19:00:00Z",
    location: "Stade de France",
    homeTeam: { matchNumber: 45, team: "winner" },
    awayTeam: { matchNumber: 46, team: "winner" },
  },
] as const;
