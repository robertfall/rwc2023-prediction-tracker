import { MatchNumber } from "../../data/fixtures";
import { Result, ResultsRepository } from "./results-repository";

export function memoryResultsRepositoryFactory(): ResultsRepository {
  let results: Partial<Record<MatchNumber, Result>> = {};

  async function getAllResults() {
    return Object.values(results);
  }

  async function getResultForMatch(matchNumber: MatchNumber) {
    return results[matchNumber];
  }

  async function upsertResult(result: Partial<Result>) {
    results[result.matchNumber!] = result as Result;
  }

  return {
    getAllResults,
    getResultForMatch,
    upsertResult,
  };
}
