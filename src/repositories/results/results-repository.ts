import { MatchNumber } from "../../data/fixtures";

export type ResultData = PristineResultData | TouchedResultData;
export type PristineResultData = {
  touched: false;
}
export type TouchedResultData = {
  touched: true;
  homeScore: number;
  awayScore: number;
  homeTries: number;
  awayTries: number;
}

export type Result = {
  matchNumber: MatchNumber;
} & ResultData;

export type ResultsRepository = {
  getAllResults: () => Promise<Result[]>;
  getResultForMatch: (matchNumber: MatchNumber) => Promise<Result | undefined>;
  upsertResult: (result: Partial<Result>) => Promise<void>;
};
