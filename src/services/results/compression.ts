import { MatchNumber } from "../../data/fixtures";
import { Result } from "./service";

function touchedBitsToBytes(touchedBits: number[]) {
  let cursor = 0;
  let step = 0;
  let currentByte = 0;
  let packedBits: number[] = [];

  while (cursor < touchedBits.length) {
    step = cursor % 8;

    if (step === 0 && cursor !== 0) {
      packedBits.push(currentByte);
      currentByte = 0;
    }

    currentByte += touchedBits[cursor] << step;
    cursor++;
  }
  packedBits.push(currentByte);

  return packedBits;
}

function touchedBytesToBits(total: number, touchedBytes: Uint8Array) {
  const totalRows = touchedBytes.length;

  let touchedBits: number[] = [];
  let row = 0;

  while (row < totalRows) {
    const lastRow = row === totalRows - 1;

    // Most rows have 8 bits
    let bitsInRow = 8;

    // The last row might have 8 bits or less
    if (lastRow && total % 8 !== 0) {
      bitsInRow = total % 8;
    }

    const currentRow = touchedBytes[row];
    let item = 0;

    while (item < bitsInRow) {
      touchedBits.push((currentRow & Math.pow(2, item)) >> item);
      item++;
    }

    row++;
  }
  return touchedBits;
}

function resultsToPackedUint8Array(results: Result[]) {
  const rawNumbers = results.flatMap((result) =>
    result.touched
      ? [
          result.homeScore,
          result.awayScore,
          // Pack tries into 4 bits each as they can't be more than 16
          (result.homeTries << 4) + result.awayTries,
        ]
      : []
  );

  const resultCount = results.length;

  const touchedBits: number[] = results.map((result) =>
    result.touched ? 1 : 0
  );

  const packedBits = touchedBitsToBytes(touchedBits);

  return new Uint8Array([resultCount, ...packedBits, ...rawNumbers]);
}

function packedUint8ArrayToResults(
  resultCount: number,
  touchedBits: number[],
  resultValues: Uint8Array
) {
  let results: Result[] = [];
  let matchIndex = 1;
  let cursor = 0;

  while (matchIndex <= resultCount) {
    const matchNumber = matchIndex++ as MatchNumber;

    if (touchedBits[matchNumber - 1]) {
      const homeScore = resultValues[cursor++];
      const awayScore = resultValues[cursor++];
      const homeTries = resultValues[cursor] >> 4;
      const awayTries = resultValues[cursor++] & 0b1111;

      results.push({
        touched: true,
        matchNumber,
        homeScore,
        awayScore,
        homeTries,
        awayTries,
      });
    } else {
      results.push({
        touched: false,
        matchNumber,
      });
    }
  }
  return results;
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

const BYTES_USED_FOR_COUNT = 1;

function getTotalCount(typedArray: Uint8Array) {
  return typedArray
    .slice(0, BYTES_USED_FOR_COUNT)
    .reduce((acc, i) => acc + i, 0);
}

export function decode(encoded: string) {
  const typedArray = stringToBinary(encoded);

  const resultCount = getTotalCount(typedArray);

  const touchedBytesCount = Math.floor(resultCount / 8);
  const touchedBits = touchedBytesToBits(
    resultCount,
    typedArray.slice(
      BYTES_USED_FOR_COUNT,
      touchedBytesCount + BYTES_USED_FOR_COUNT
    )
  );

  const resultValues = typedArray.slice(
    BYTES_USED_FOR_COUNT + touchedBytesCount
  );
  return packedUint8ArrayToResults(resultCount, touchedBits, resultValues);
}
