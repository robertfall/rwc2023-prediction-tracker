import { describe, expect, it } from "vitest";
import { defaultLogEntry, logTableForPoolAtMatch } from "./logs";
import { poolA, poolD } from "./data/teams";
import { Result } from "./repositories/results/results-repository";

describe("logTableForPoolAtMatch", () => {
  describe("with no results", () => {
    it("returns an empty table", () => {
      expect(logTableForPoolAtMatch("A")).toEqual(poolA.map(defaultLogEntry));
    });
  });

  describe("with results from another pool", () => {
    it("returns an empty table", () => {
      const results: Result[] = [
        {
          matchNumber: 1,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        },

        {
          matchNumber: 2,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        },

        {
          matchNumber: 3,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        },

        {
          matchNumber: 4,
          homeScore: 10,
          awayScore: 5,
          homeTries: 2,
          awayTries: 1,
        },
      ];
      expect(logTableForPoolAtMatch("D", 4, results)).toEqual(
        poolD.map(defaultLogEntry)
      );
    });
  });
});
