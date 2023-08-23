import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { encode, decode } from "./compression";
import { MatchNumber } from "../../data/fixtures";
import {
  PristineResultData,
  Result,
  TouchedResultData,
} from "./results-repository";

const touchedResultArbitrary = fc.record<TouchedResultData>({
  homeScore: fc.integer({ min: 0, max: 127 }),
  homeTries: fc.integer({ min: 0, max: 15 }),
  awayScore: fc.integer({ min: 0, max: 127 }),
  awayTries: fc.integer({ min: 0, max: 15 }),
  touched: fc.constant(true),
});

const pristineResultArbitrary = fc.record<PristineResultData>({
  touched: fc.constant(false),
});

const resultArbitrary = fc.oneof(
  pristineResultArbitrary,
  touchedResultArbitrary
);

describe("Compressing results", () => {
  describe("With manual bit stuffing", () => {
    it.only("Works", () => {
      const result = [
        {
          homeScore: 0,
          homeTries: 0,
          awayScore: 0,
          awayTries: 0,
          touched: true,
        },
        {
          homeScore: 0,
          homeTries: 0,
          awayScore: 0,
          awayTries: 0,
          touched: true,
        },
        { touched: false },
        { touched: false },
        {
          homeScore: 0,
          homeTries: 0,
          awayScore: 0,
          awayTries: 0,
          touched: true,
        },
        { touched: false },
        { touched: false },
        {
          homeScore: 0,
          homeTries: 0,
          awayScore: 0,
          awayTries: 1,
          touched: true,
        },
      ].map((result, i) => ({
        ...result,
        matchNumber: (i + 1) as MatchNumber,
      })) as Result[];

      expect(decode(encode(result))).toEqual(result);
    });

    it("it should be valid for all possible values", () => {
      fc.assert(
        fc.property(
          fc.array(resultArbitrary, { minLength: 1, maxLength: 48 }),
          (results) => {
            const resultsWithMatchNumber: Result[] = results.map(
              (result, i) => ({
                ...result,
                matchNumber: (i + 1) as MatchNumber,
              })
            );
            expect(decode(encode(resultsWithMatchNumber))).toEqual(
              resultsWithMatchNumber
            );
          }
        )
      );
    });
  });
});
