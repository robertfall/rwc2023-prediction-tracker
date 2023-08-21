import { createContext, useContext } from "react";
import { ResultsRepository } from "./results-repository";
import {
  ResultsService,
  createResultsService,
} from "./results/service";
import { indexedDBRepositoryFactory } from "./indexdb-results-repository";

export type AppContext = {
  resultsRepository: ResultsRepository;
  resultsService: ResultsService;
};
export const AppContext = createContext<AppContext>({} as AppContext);

export const useResultsService = () =>
  useContext(AppContext).resultsService;

export async function initializeAppContext() {
  const resultsRepository = await indexedDBRepositoryFactory();
  const resultsService = createResultsService(resultsRepository);

  resultsService.getState().initialize();

  return {
    resultsRepository,
    resultsService,
  };
}
