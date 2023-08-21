import { createContext, useContext } from "react";
import { ResultsRepository } from "./results-repository";
import {
  PredictionsService,
  createPredictionsService,
} from "./predictions/service";
import { indexedDBRepositoryFactory } from "./indexdb-results-repository";

export type AppContext = {
  resultsRepository: ResultsRepository;
  predictionsService: PredictionsService;
};
export const AppContext = createContext<AppContext>({} as AppContext);

export const usePredictionsService = () =>
  useContext(AppContext).predictionsService;

export async function initializeAppContext() {
  const resultsRepository = await indexedDBRepositoryFactory();
  const predictionsService = createPredictionsService(resultsRepository);

  predictionsService.getState().initialize();

  return {
    resultsRepository,
    predictionsService,
  };
}
