import { beforeEach, describe, expect, it } from "vitest";
import {
  PredictionsService,
  predictionsServiceFactory,
} from "./predictions-service";
import { memoryResultsRepositoryFactory } from "./memory-results-repository";
import { fixtures } from "../data/fixtures";

describe("predictionsService", () => {
  let service: PredictionsService;

  beforeEach(() => {
    service = predictionsServiceFactory(memoryResultsRepositoryFactory());
  });

  describe("getAllResults", () => {
    it("returns all fixtures without results", () => {
      expect(service.getAllPredictions()).resolves.toEqual(fixtures);
    });
  });

  describe("getResultForMatch", () => {
    describe("when the result doesn't exist", () => {
      it("returns a fixture without a result", () => {
        expect(service.getPredictionForMatch(1)).resolves.toEqual(fixtures[0]);
      });
    });

    describe("when the result exists", () => {
      it("returns a fixture with a result", () => {
        const result = {
          matchNumber: 1 as const,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        };
        service.upsertResult(result);

        expect(service.getPredictionForMatch(1)).resolves.toEqual({
          ...fixtures[0],
          result,
        });
      });
    });
  });

  describe("upsertResult", () => {
    describe("when the result doesn't exist", () => {
      it("persists the result", () => {
        const result = {
          matchNumber: 1 as const,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        };
        service.upsertResult(result);

        expect(service.getPredictionForMatch(1)).resolves.toEqual({
          ...fixtures[0],
          result,
        });
      });
    });

    describe("when the result exists", () => {
      it("updates the result", () => {
        const result = {
          matchNumber: 1 as const,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        };
        service.upsertResult(result);
        service.upsertResult({ ...result, homeScore: 14 });

        expect(service.getPredictionForMatch(1)).resolves.toEqual({
          ...fixtures[0],
          result: { ...result, homeScore: 14 },
        });
      });
    });
  });
});
