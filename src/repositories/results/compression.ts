import { MatchNumber } from "../../data/fixtures";
import { Result } from "./results-repository";

function resultsToPackedUint8Array(results: Result[]) {
  const rawNumbers = results.flatMap((result) => result.touched ? [
    result.homeScore,
    result.awayScore,
    // Pack tries into 4 bits each as they can't be more than 16
    (result.homeTries << 4) + result.awayTries,
  ] : []);

  const resultCount = results.length;

  const touchedBits: number[] = results.map((result) =>
    result.touched ? 1 : 0
  );

  return new Uint8Array([resultCount, ...touchedBits, ...rawNumbers]);
}

function binaryToString(buffer: Uint8Array) {
  return btoa(
    buffer.reduce((acc, i) => {
      acc += String.fromCodePoint(i);
      return acc;
    }, "")
  );
}

function stringToBinary(str: string) {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

export function d2b(d: number, length: number = 8) {
  return d.toString(2).padStart(length, "0");
}

export function encode(results: Result[]) {
  const packed = resultsToPackedUint8Array(results);
  return binaryToString(packed);
}

export function decode(encoded: string) {
  const typedArray = stringToBinary(encoded);

  const resultCount = typedArray[0];
  const touchedBits = typedArray.slice(1, 1 + resultCount);
  const resultValues = typedArray.slice(resultCount + 1);

  let results: Result[] = [];
  let matchIndex = 1;

  for (let index = 0; index < resultValues.length; index++) {
    const matchNumber = matchIndex++ as MatchNumber;
    const homeScore = resultValues[index++];
    const awayScore = resultValues[index++];
    const homeTries = resultValues[index] >> 4;
    const awayTries = resultValues[index] & 0b1111;

    results.push({
      touched: Boolean(touchedBits[matchNumber - 1]),
      matchNumber,
      homeScore,
      awayScore,
      homeTries,
      awayTries,
    });
  }

  return results;
}
