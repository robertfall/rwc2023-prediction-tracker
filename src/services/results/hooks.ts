import { useContext } from "react";
import { AppContext } from "../app-context";
import { MatchNumber } from "../../data/fixtures";
import { useStore } from "zustand";
import { Result } from "../../repositories/results/results-repository";

export function useResultsService() {
  return useContext(AppContext).resultsService;
}

export function defaultResult(matchNumber: MatchNumber): Result {
  return {
    matchNumber,
    touched: false
  } as Result;
}

export function useResult(matchNumber: MatchNumber) {
  const service = useResultsService();

  return useStore(service, (state) => ({
    result: state.results[matchNumber],
    updateResult: state.upsertResult,
  }));
}
