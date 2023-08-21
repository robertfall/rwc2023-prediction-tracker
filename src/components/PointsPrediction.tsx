import { ChangeEvent, useCallback } from "react";
import { MatchNumber } from "../data/fixtures";
import { usePrediction } from "../services/predictions/hooks";
import "./PointsPrediction.css";
export function PointsPrediction({
  matchNumber,
}: {
  matchNumber: MatchNumber;
}) {
  const { prediction, updatePrediction } = usePrediction(matchNumber);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (!prediction.matchNumber) return;

      updatePrediction({
        ...prediction,
        [name]: value,
      });
    },
    [updatePrediction]
  );

  const { homeScore, homeTries, awayScore, awayTries } = prediction;

  return (
    <div className="points-prediction">
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
