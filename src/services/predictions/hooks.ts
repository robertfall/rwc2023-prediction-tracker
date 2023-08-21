import { useContext } from "react";
import { AppContext } from "../app-context";
import { MatchNumber } from "../../data/fixtures";
import { useStore } from "zustand";
import { Result } from "../results-repository";

export function usePredictionsService() {
  return useContext(AppContext).predictionsService;
}

function defaultResult(matchNumber: MatchNumber): Result {
  return {
    matchNumber,
  } as Result;
}

export function usePrediction(matchNumber: MatchNumber) {
  const service = usePredictionsService();

  return useStore(service, (state) => ({
    prediction: state.predictions[matchNumber] || defaultResult(matchNumber),
    updatePrediction: (prediction: Partial<Result>) => {
      state.upsertResult(prediction);
    },
  }));
}
