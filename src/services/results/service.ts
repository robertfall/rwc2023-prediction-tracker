import { StoreApi, UseBoundStore, create } from "zustand";
import { produce } from "immer";
import { MatchNumber } from "../../data/fixtures";
import { Result, ResultsRepository } from "../results-repository";

export type ResultsStore = {
  results: Partial<Record<MatchNumber, Result>>;
  upsertResult: (result: Partial<Result>) => void;
  initialize: () => Promise<void>;
};

export type ResultsService = UseBoundStore<StoreApi<ResultsStore>>;

export function getResultForMatch(matchNumber: MatchNumber) {
  return (store: ResultsStore) => store.results[matchNumber];
}

export function createResultsService(resultsRepository: ResultsRepository) {
  const store = create<ResultsStore>()((set) => ({
    results: {},
    initialize: async () => {
      const initialResults = await resultsRepository.getAllResults();
      set((state) =>
        produce(state, (draft) => {
          for (let result of initialResults) {
            draft.results[result.matchNumber] = result;
          }
        })
      );
    },
    upsertResult: (result: Partial<Result>) => {
      resultsRepository
        .upsertResult(result)
        .catch((error) => console.error(error));

      set((state) =>
        produce(state, (draft) => {
          const matchNumber = result.matchNumber!;
          draft.results[matchNumber] = result as Result;
        })
      );
    },
  }));

  return store;
}
