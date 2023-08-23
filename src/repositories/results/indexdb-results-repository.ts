import { MatchNumber } from "../../data/fixtures";
import { Result, ResultsRepository } from "./results-repository";


export const PREDICTIONS_KEY = "predictions";


export async function indexedDBRepositoryFactory(db: IDBDatabase): Promise<ResultsRepository> {
  async function getAllResults(): Promise<Result[]> {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(PREDICTIONS_KEY)
        .objectStore(PREDICTIONS_KEY)
        .getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async function getResultForMatch(
    matchNumber: MatchNumber
  ): Promise<Result | undefined> {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(PREDICTIONS_KEY)
        .objectStore(PREDICTIONS_KEY)
        .get(matchNumber);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  async function upsertResult(result: Partial<Result>): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(PREDICTIONS_KEY, "readwrite")
        .objectStore(PREDICTIONS_KEY)
        .put(result);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }

  return {
    getAllResults,
    getResultForMatch,
    upsertResult,
  };
}
