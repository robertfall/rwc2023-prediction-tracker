import { beforeEach, describe, expect, it } from "vitest";
import { createResultsService } from "./service";
import { memoryResultsRepositoryFactory } from "../memory-results-repository";

describe("resultsService", () => {
  let service: ReturnType<typeof createResultsService>;

  beforeEach(async () => {
    service = createResultsService(memoryResultsRepositoryFactory());
  });

  describe("when empty", () => {
    it("returns all fixtures without results", () => {
      expect(service.getState().results).toEqual({});
    });
  });

  describe("upsertResult", () => {
    describe("when the result doesn't exist", () => {
      it("persists the result", () => {
        const result = {
          matchNumber: 1,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        } as const;

        service.getState().upsertResult(result);
        expect(service.getState().results[1]).toEqual(result);
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
        service.getState().upsertResult(result);
        service.getState().upsertResult({ ...result, homeScore: 14 });

        expect(service.getState().results[1]).toEqual({
          ...result,
          homeScore: 14,
        });
      });
    });
  });
});
