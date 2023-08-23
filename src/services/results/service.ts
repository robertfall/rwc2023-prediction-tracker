import { StoreApi, UseBoundStore, create } from "zustand";
import { produce } from "immer";
import { MatchNumber } from "../../data/fixtures";
import { persist } from "zustand/middleware";
import { urlParamsStorage } from "./storage";

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

export type ResultsStore = {
  results: Partial<Record<MatchNumber, Result>>;
  upsertResult: (result: Partial<Result>) => void;
};

export type ResultsService = UseBoundStore<StoreApi<ResultsStore>>;
export function createResultsService(): ResultsService {
  const store = create<ResultsStore>()(
    persist(
      (set) => ({
        results: {},
        setResults: (results: Result[]) => {
          set((state) =>
            produce(state, (draft) => {
              draft.results = results.reduce((acc, result) => {
                const matchNumber = result.matchNumber;
                return {
                  ...acc,
                  [matchNumber]: result,
                };
              }, {});
            })
          );
        },
        upsertResult: (result: Partial<Result>) => {
          set((state) =>
            produce(state, (draft) => {
              const matchNumber = result.matchNumber!;
              draft.results[matchNumber] = {
                ...draft.results[matchNumber],
                ...result,
                touched: true,
              } as Result;
            })
          );
        },
      }),
      {
        name: "results",
        storage: urlParamsStorage,
      }
    )
  );

  return store;
}
