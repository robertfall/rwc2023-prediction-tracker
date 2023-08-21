import './PointsPrediction.css';
export function PointsPrediction() {
  return (
    <div className="points-prediction">
      <div>
        <label htmlFor="home-points">Points</label>
        <input type="text" name="home-points" placeholder="eg. 32" />
        <label htmlFor="home-tries">Tries</label>
        <input type="text" name="home-tries" placeholder="eg. 4" />
      </div>
      <div>
        <label htmlFor="away-points">Points</label>
        <input type="text" name="away-points" placeholder="eg. 32" />
        <label htmlFor="away-tries">Tries</label>
        <input type="text" name="away-tries" placeholder="eg. 4" />
      </div>
    </div>
  );
}
