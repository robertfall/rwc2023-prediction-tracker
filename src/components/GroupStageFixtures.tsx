import { Fixture, fixtures } from "../data/fixtures";
import { ResultsRepository } from "../services/results-repository";
import { FixtureSummary } from "./FixtureSummary";
import "./GroupStageFixtures.css";

export type GroupStageFixturesProps = {
  resultsRepository: ResultsRepository;
  fixtures: Fixture[];
};
export function GroupStageFixtures() {
  return (
    <div className="group-stage-fixtures">
      {fixtures
        .filter((f) => "group" in f)
        .slice(0, 10)
        .map((fixture) => (
          <FixtureSummary key={fixture.matchNumber} {...fixture} />
        ))}
    </div>
  );
}
