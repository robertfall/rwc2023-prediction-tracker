import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { encode, decode } from "./compression";
import { MatchNumber } from "../../data/fixtures";

const resultArbitrary = fc.record({
  homeScore: fc.integer({ min: 0, max: 127 }),
  homeTries: fc.integer({ min: 0, max: 15 }),
  awayScore: fc.integer({ min: 0, max: 127 }),
  awayTries: fc.integer({ min: 0, max: 15 }),
  touched: fc.boolean(),
});

describe("Compressing results", () => {
  describe("With manual bit stuffing", () => {
    it("it should be valid for all possible values", () => {
      fc.assert(
        fc.property(
          fc.array(resultArbitrary, { minLength: 1, maxLength: 48 }),
          (results) => {
            const resultsWithMatchNumber = results.map((result, i) => ({
              ...result,
              matchNumber: (i + 1) as MatchNumber,
            }));
            expect(decode(encode(resultsWithMatchNumber))).toEqual(
              resultsWithMatchNumber
            );
          }
        )
      );
    });
  });
});
