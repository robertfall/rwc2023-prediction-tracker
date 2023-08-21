import { useContext } from "react";
import { AppContext } from "../app-context";
import { MatchNumber } from "../../data/fixtures";
import { useStore } from "zustand";
import { Result } from "../results-repository";

export function useResultsService() {
  return useContext(AppContext).resultsService;
}

function defaultResult(matchNumber: MatchNumber): Result {
  return {
    matchNumber,
  } as Result;
}

export function useResult(matchNumber: MatchNumber) {
  const service = useResultsService();

  return useStore(service, (state) => ({
    result: state.results[matchNumber] || defaultResult(matchNumber),
    updateResult: (result: Partial<Result>) => {
      state.upsertResult(result);
    },
  }));
}
