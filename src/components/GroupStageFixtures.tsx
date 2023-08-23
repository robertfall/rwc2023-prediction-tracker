import { Fixture } from "../data/fixtures";
import { useGroupStageFixtures } from "../services/fixtures/hooks";
import { FixtureSummary } from "./FixtureSummary";
import { GroupLog } from "./GroupLog";
import "./GroupStageFixtures.css";

export type GroupStageFixturesProps = {
  fixtures: Fixture[];
};
export function GroupStageFixtures() {
  const groupStageFixtures = useGroupStageFixtures();
  return (
    <div className="group-stage-fixtures">
      {groupStageFixtures.map((fixture) => (
        <div className="fixture-row" key={fixture.matchNumber}>
          <FixtureSummary {...fixture} />
          <GroupLog fixture={fixture} />
        </div>
      ))}
    </div>
  );
}
