import { Fixture } from "../data/fixtures";
import { ResultsRepository } from "../repositories/results/results-repository";
import { useGroupStageFixtures } from "../services/fixtures/hooks";
import { FixtureSummary } from "./FixtureSummary";
import "./GroupStageFixtures.css";

export type GroupStageFixturesProps = {
  resultsRepository: ResultsRepository;
  fixtures: Fixture[];
};
export function GroupStageFixtures() {
  const groupStageFixtures = useGroupStageFixtures();
  return (
    <div className="group-stage-fixtures">
      {groupStageFixtures.map((fixture) => (
        <div className="fixture-row" key={fixture.matchNumber}>
          <FixtureSummary {...fixture} />
          <div className="log">
            <table>
              <thead>
                <tr>
                  <th>{fixture.group}</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
