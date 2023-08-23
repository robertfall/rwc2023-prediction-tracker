import { PersistStorage, StorageValue } from "zustand/middleware";
import { MatchNumber, fixtures } from "../../data/fixtures";
import { decode, encode } from "../../repositories/results/compression";
import { Result } from "../../repositories/results/results-repository";
import { ResultsStore } from "./service";
import { defaultResult } from "./hooks";

const extractResultPart = (path: string) => {
  return path.split("/").at(-1);
}


export const urlParamsStorage: PersistStorage<ResultsStore> = {
  getItem: (): StorageValue<ResultsStore> => {
    const encodedValue = extractResultPart(location.pathname);

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
  setItem: (_, results): void => {
    window.history.pushState(null, "", encode(Object.values(results.state.results)));
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key);
    window.history.pushState(null, "", "");
  },
};
