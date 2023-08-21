import { StoreApi, UseBoundStore, create } from "zustand";
import { produce } from "immer";
import { MatchNumber } from "../../data/fixtures";
import { Result, ResultsRepository } from "../results-repository";

export type PredictionsStore = {
  predictions: Partial<Record<MatchNumber, Result>>;
  upsertResult: (result: Partial<Result>) => void;
  initialize: () => Promise<void>;
};

export type PredictionsService = UseBoundStore<StoreApi<PredictionsStore>>;

export function getPredictionForMatch(matchNumber: MatchNumber) {
  return (store: PredictionsStore) => store.predictions[matchNumber];
}

export function createPredictionsService(resultsRepository: ResultsRepository) {
  const store = create<PredictionsStore>()((set) => ({
    predictions: {},
    initialize: async () => {
      const initialResults = await resultsRepository.getAllResults();
      set((state) =>
        produce(state, (draft) => {
          for (let result of initialResults) {
            draft.predictions[result.matchNumber] = result;
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
          draft.predictions[matchNumber] = result as Result;
        })
      );
    },
  }));

  return store;
}
