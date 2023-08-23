import { createContext, useContext } from "react";
import { FixturesService, createFixturesService } from "./fixtures/service";
import { ResultsService, createResultsService } from "./results/service";
import { fixtures } from "../data/fixtures";

export type AppContext = { fixturesService: FixturesService, resultsService: ResultsService };
export const AppContext = createContext<AppContext>({} as AppContext);

export const useFixturesService = () => useContext(AppContext).fixturesService;

export async function initializeAppContext(): Promise<AppContext> {
  const fixturesService = createFixturesService(fixtures);
  const resultsService = createResultsService();

  return {
    fixturesService,
    resultsService,
  };
}
