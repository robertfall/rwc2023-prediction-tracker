import { Fixture } from "../data/fixtures";
import { ResultsRepository } from "../services/results-repository";
import { FixtureSummary } from "./FixtureSummary";
import "./GroupStageFixtures.css";

export type GroupStageFixturesProps = {
  resultsRepository: ResultsRepository;
  fixtures: Fixture[];
};
export function GroupStageFixtures({
  resultsRepository,
  fixtures,
}: GroupStageFixturesProps) {
  return (
    <div className="group-stage-fixtures">
      {fixtures.map((fixture) => (
        <FixtureSummary key={fixture.matchNumber} {...fixture} />
      ))}
    </div>
  );
}
