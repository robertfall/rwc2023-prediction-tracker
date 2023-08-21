import { MatchNumber } from "../data/fixtures";

export type Result = {
  matchNumber: MatchNumber;
  homeScore: number;
  awayScore: number;
  homeTries: number;
  awayTries: number;
};

export type ResultsRepository = {
  getAllResults: () => Promise<Result[]>;
  getResultForMatch: (matchNumber: MatchNumber) => Promise<Result | undefined>;
  upsertResult: (result: Result) => Promise<void>;
};
