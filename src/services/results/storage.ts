import { PersistStorage, StorageValue } from "zustand/middleware";
import { MatchNumber, fixtures } from "../../data/fixtures";
import { decode, encode } from "../../repositories/results/compression";
import { Result } from "../../repositories/results/results-repository";
import { ResultsStore } from "./service";
import { defaultResult } from "./hooks";

export const urlParamsStorage: PersistStorage<ResultsStore> = {
  getItem: (key: string): StorageValue<ResultsStore> => {
    const searchParams = new URLSearchParams(location.search);
    const encodedValue = searchParams.get(key);
    const rawResults = encodedValue
      ? decode(encodedValue)
      : fixtures.map((fixture) => defaultResult(fixture.matchNumber));

    const resultsByMatchNumber = rawResults.reduce(
      (acc, result) => ({
        ...acc,
        [result.matchNumber]: result,
      }),
      {} as Record<MatchNumber, Result>
    );

    return {
      state: { results: resultsByMatchNumber },
      version: 0,
    } as StorageValue<ResultsStore>;
  },
  setItem: (key, results): void => {
    const searchParams = new URLSearchParams(location.search);
    results.state.results;
    searchParams.set(key, encode(Object.values(results.state.results)));
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  },
};
