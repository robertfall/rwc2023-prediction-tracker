import { useContext } from "react";
import { AppContext } from "../app-context";
import { MatchNumber, groupFixtures } from "../../data/fixtures";
import { useStore } from "zustand";
import { Result } from "./service";
import { MatchResult } from "../logs/create-logs";

export function useResultsService() {
  return useContext(AppContext).resultsService;
}

export function defaultResult(matchNumber: MatchNumber): Result {
  return {
    matchNumber,
    touched: false,
  } as Result;
}

export function useResultsForMatch(matchNumber: MatchNumber): MatchResult[] {
  const service = useResultsService();

  const match = groupFixtures.find(
    (fixture) => fixture.matchNumber === matchNumber
  )!;

  const groupMatches = groupFixtures.filter(
    (fixture) =>
      fixture.matchNumber <= matchNumber && fixture.group === match.group
  );

  return useStore(service, (state) => {
    return groupMatches.map<MatchResult>((fixture) => {
      const result =
        state.results[fixture.matchNumber] ||
        defaultResult(fixture.matchNumber);

      return {
        ...result,
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
      };
    })
  })
  ;
}

export function useResult(matchNumber: MatchNumber) {
  const service = useResultsService();

  return useStore(service, (state) => ({
    result: state.results[matchNumber],
    updateResult: state.upsertResult,
  }));
}
