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

export type PristineResult = {
  matchNumber: MatchNumber;
} & PristineResultData;

export type TouchedResult = {
  matchNumber: MatchNumber;
} & TouchedResultData;

export type Result = PristineResult | TouchedResult;

export type ResultsRepository = {
  getAllResults: () => Promise<Result[]>;
  getResultForMatch: (matchNumber: MatchNumber) => Promise<Result | undefined>;
  upsertResult: (result: Partial<Result>) => Promise<void>;
};
