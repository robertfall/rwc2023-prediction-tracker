import { create } from "zustand";
import { MatchNumber } from "../../data/fixtures";
import { TeamName } from "../../data/teams";
import { ResultsService } from "../results/service";

export type LogsStore = {
  logs: Partial<Record<MatchNumber, Log>>;
};

export type Log = LogEntry[];
export type LogEntry = {
  team: TeamName;
  points: number;
  tries: number;
  pointsDifference: number;
  matchesPlayed: number;
};

export function createLogsService(resultsService: ResultsService) {
  const store = create<LogsStore>()(() => ({
    logs: {},
  }));

  resultsService.subscribe((results) => {
    console.log(results);
  });

  return store;
}
