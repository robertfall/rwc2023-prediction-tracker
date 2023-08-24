import { MatchTeams, TeamName } from "../../data/teams";
import { Result } from "../results/service";
import { getPoints } from "./points";
import { LogEntry } from "./service";

export function defaultLogEntry(team: TeamName): LogEntry {
  return {
    team,
    points: 0,
    tries: 0,
    pointsDifference: 0,
    matchesPlayed: 0,
  };
}
export type MatchResult = Result & MatchTeams;
export function createLogEntries(results: MatchResult[]): LogEntry[] {
  const logEntries = results.reduce((acc, result) => {
    if (!result.touched) return acc;

    const { homePoints, awayPoints } = getPoints(result);
    const { homeTeam, awayTeam, homeScore, awayScore, homeTries, awayTries } =
      result;

    let homeLogEntry = acc[homeTeam];
    if (!homeLogEntry) {
      acc[homeTeam] = defaultLogEntry(homeTeam);
      homeLogEntry = acc[homeTeam];
    }
    homeLogEntry.points += homePoints;
    homeLogEntry.tries += homeTries;
    homeLogEntry.pointsDifference += homeScore - awayScore;

    let awayLogEntry = acc[awayTeam];
    if (!awayLogEntry) {
      acc[awayTeam] = defaultLogEntry(awayTeam);
      awayLogEntry = acc[awayTeam];
    }
    awayLogEntry.points += awayPoints;
    awayLogEntry.tries += awayTries;
    awayLogEntry.pointsDifference += awayScore - homeScore;

    return acc;
  }, {} as Record<TeamName, LogEntry>);

  return Object.values(logEntries).sort((a, b) => b.points - a.points);
}
