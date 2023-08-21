import { Fixture, MatchNumber, fixtures } from "../data/fixtures";
import { Result, ResultsRepository } from "./results-repository";

export type PredictionsService = {
  getAllPredictions: () => Promise<FixtureWithResult[]>;
  getPredictionForMatch: (
    matchNumber: MatchNumber
  ) => Promise<FixtureWithResult>;
  upsertResult: (result: Result) => Promise<void>;
};

export type FixtureWithResult = Fixture & {
  result?: Result;
};

export async function upsertResult(
  repository: ResultsRepository,
  result: Result
) {
  repository.upsertResult(result);
}

export async function getAllPredictions(
  repository: ResultsRepository
): Promise<FixtureWithResult[]> {
  const results = await repository.getAllResults();

  return fixtures.map((fixture) => {
    const result = results.find(
      (result) => result.matchNumber === fixture.matchNumber
    );

    return {
      ...fixture,
      result,
    };
  });
}

export async function getPredictionForMatch(
  repository: ResultsRepository,
  matchNumber: MatchNumber
): Promise<FixtureWithResult> {
  const result = await repository.getResultForMatch(matchNumber);
  const fixture = fixtures.find(
    (fixture) => fixture.matchNumber === matchNumber
  )!;

  return {
    ...fixture,
    result: result,
  };
}

export function predictionsServiceFactory(
  resultsRepository: ResultsRepository
): PredictionsService {
  return {
    getPredictionForMatch: (matchNumber: MatchNumber) =>
      getPredictionForMatch(resultsRepository, matchNumber),
    getAllPredictions: () => getAllPredictions(resultsRepository),
    upsertResult: (result: Result) => upsertResult(resultsRepository, result),
  };
}
