import { GroupFixture } from "../data/fixtures";
import { createLogEntries } from "../services/logs/create-logs";
import { useResultsForMatch } from "../services/results/hooks";
import "./GroupLog.css";

export type GroupLogProps = { fixture: GroupFixture };
export function GroupLog({ fixture }: GroupLogProps) {
  const results = useResultsForMatch(fixture.matchNumber);
  const logEntries = createLogEntries(results);

  return (
    <div className="group-log">
      <h2>Group {fixture.group}</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th title="Points">PT</th>
            <th title="Played">P</th>
            <th title="Won">W</th>
            <th title="Lost">L</th>
            <th title="Draw">D</th>
            <th title="Point Difference">PD</th>
            <th title="Tries">T</th>
          </tr>
        </thead>
        <tbody>
          {logEntries.map((log) => (
            <tr>
              <td>{log.team}</td>
              <td>{log.points}</td>
              <td>{log.matchesPlayed}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{log.pointsDifference}</td>
              <td>{log.tries}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
