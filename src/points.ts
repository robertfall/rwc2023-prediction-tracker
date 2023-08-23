import { Result } from "./repositories/results/results-repository";

export function getPoints(result: Result) {
  const { homeScore, homeTries, awayScore, awayTries } = result;

  let homePoints = homeTries >= 4 ? 1 : 0;
  let awayPoints = awayTries >= 4 ? 1 : 0;

  if (homeScore > awayScore) {
    homePoints += 4;
  } else if (awayScore > homeScore) {
    awayPoints += 4;
  } else {
    homePoints += 2;
    awayPoints += 2;
  }

  return { homePoints, awayPoints };
}
