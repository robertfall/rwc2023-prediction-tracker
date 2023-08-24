import { describe, it, expect } from "vitest";

import { getPoints } from "./points";

const matchNumber = 1 as const;

describe("getPoints", () => {
  describe("home loss", () => {
    describe("with less than 4 tries", () => {
      it("returns the correct points", () => {
        const { homePoints, awayPoints } = getPoints({
          touched: true,
          matchNumber,
          homeScore: 10,
          homeTries: 2,
          awayScore: 15,
          awayTries: 3,
        });
        expect(homePoints).toEqual(0);
        expect(awayPoints).toEqual(4);
      });
    });

    describe("with 4 or more tries", () => {
      it("returns the correct points", () => {
        const { homePoints, awayPoints } = getPoints({
          touched: true,
          matchNumber,
          homeScore: 20,
          homeTries: 4,
          awayScore: 25,
          awayTries: 5,
        });
        expect(homePoints).toEqual(1);
        expect(awayPoints).toEqual(5);
      });
    });
  });

  describe("home win", () => {
    describe("with less than 4 tries", () => {
      it("returns the correct points", () => {
        const { homePoints, awayPoints } = getPoints({
          touched: true,
          matchNumber,
          homeScore: 18,
          homeTries: 3,
          awayScore: 15,
          awayTries: 3,
        });
        expect(homePoints).toEqual(4);
        expect(awayPoints).toEqual(0);
      });
    });

    describe("with 4 or more tries", () => {
      it("returns the correct points", () => {
        const { homePoints, awayPoints } = getPoints({
          touched: true,
          matchNumber,
          homeScore: 22,
          homeTries: 4,
          awayScore: 20,
          awayTries: 4,
        });
        expect(homePoints).toEqual(5);
        expect(awayPoints).toEqual(1);
      });
    });
  });

  describe("draw", () => {
    describe("with less than 4 tries", () => {
      it("returns the correct points", () => {
        const { homePoints, awayPoints } = getPoints({
          touched: true,
          matchNumber,
          homeScore: 15,
          homeTries: 3,
          awayScore: 15,
          awayTries: 3,
        });
        expect(homePoints).toEqual(2);
        expect(awayPoints).toEqual(2);
      });
    });
    describe("with 4 or more tries", () => {
      it("returns the correct points", () => {
        const { homePoints, awayPoints } = getPoints({
          touched: true,
          matchNumber,
          homeScore: 20,
          homeTries: 4,
          awayScore: 20,
          awayTries: 4,
        });
        expect(homePoints).toEqual(3);
        expect(awayPoints).toEqual(3);
      });
    });
  });
});
