import { MatchNumber } from "../data/fixtures";
import { Result, ResultsRepository } from "./results-repository";

const VERSION = 1;
const DB_KEY = "Rugby World Cup 2023 - Predictions";
const PREDICTIONS_KEY = "predictions";
function initializeDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_KEY, VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      db.createObjectStore(PREDICTIONS_KEY, { keyPath: "matchNumber" });
    };

    request.onerror = (error) => {
      reject(error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

export async function indexedDBRepositoryFactory(): Promise<ResultsRepository> {
  const db = await initializeDb();

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

  async function getResultForMatch(matchNumber: MatchNumber): Promise<Result | undefined> {
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

  async function upsertResult(result: Result) {
    db
      .transaction(PREDICTIONS_KEY)
      .objectStore(PREDICTIONS_KEY)
      .add(result);
  }

  return {
    getAllResults,
    getResultForMatch,
    upsertResult,
  };
}
