import { GroupName, TeamName, groups } from "./data/teams";
import { Result } from "./repositories/results/results-repository";

export type LogEntry = {
  team: TeamName;
  points: number;
  tries: number;
  pointsDifference: number;
  matchesPlayed: number;
};

export function defaultLogEntry(team: TeamName): LogEntry {
  return {
    team,
    points: 0,
    tries: 0,
    pointsDifference: 0,
    matchesPlayed: 0,
  };
}

export function logTableForPoolAtMatch(
  groupName: GroupName,
  matchNumber: number = 0,
  results: Result[] = []
): LogEntry[] {
  const teams = groups[groupName];
  return teams.map(defaultLogEntry);
}
