import { ChangeEvent, useCallback } from "react";
import { MatchNumber } from "../data/fixtures";
import { useResult } from "../services/results/hooks";
import "./PointsResult.css";
export function PointsResult({
  matchNumber,
}: {
  matchNumber: MatchNumber;
}) {
  const { result, updateResult } = useResult(matchNumber);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (!result.matchNumber) return;

      updateResult({
        ...result,
        [name]: value,
      });
    },
    [updateResult]
  );

  const { homeScore, homeTries, awayScore, awayTries } = result;

  return (
    <div className="points-result">
      <div>
        <label htmlFor="homeScore">Points</label>
        <input
          type="text"
          name="homeScore"
          placeholder="eg. 32"
          value={homeScore || ""}
          onChange={onChange}
        />
        <label htmlFor="homeTries">Tries</label>
        <input
          type="text"
          name="homeTries"
          placeholder="eg. 4"
          value={homeTries || ""}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="awayScore">Points</label>
        <input
          type="text"
          name="awayScore"
          placeholder="eg. 32"
          value={awayScore || ""}
          onChange={onChange}
        />
        <label htmlFor="awayTries">Tries</label>
        <input
          type="text"
          name="awayTries"
          placeholder="eg. 4"
          value={awayTries || ""}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
