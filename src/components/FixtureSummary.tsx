import { Fixture, FixtureTeam } from "../data/fixtures";
import { PointsPrediction } from "./PointsPrediction";
import "./FixtureSummary.css";
import { CountryName, getCountryByName } from "../data/countries";
function teamLabel(fixtureTeam: FixtureTeam): string {
  if (typeof fixtureTeam === "string") {
    return fixtureTeam;
  } else if ("pool" in fixtureTeam) {
    return `${fixtureTeam.pool} ${fixtureTeam.position}`;
  } else {
    return `${fixtureTeam.team} ${fixtureTeam.matchNumber}`;
  }
}

const dateFormatter = new Intl.DateTimeFormat(
  Intl.DateTimeFormat().resolvedOptions().locale,
  {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
);

export type FixtureProps = Fixture;
export function FixtureSummary(fixture: FixtureProps) {
  const { homeTeam, awayTeam, location, dateUtc, matchNumber } = fixture;

  const homeCountry = getCountryByName(homeTeam as CountryName)!;
  const awayCountry = getCountryByName(awayTeam as CountryName)!;

  return (
    <div className="fixture-summary">
      <div className="details">
        <div>{location}</div>
        <div>{dateFormatter.format(new Date(dateUtc))}</div>
      </div>
      <div className="title">
        <div className="home-team">
          <img
            src={`/flags/4x3/${homeCountry["alpha-2"].toLocaleLowerCase()}.svg`}
            alt={`${homeCountry.name} Flag`}
          />
          {teamLabel(homeTeam)}
        </div>
        <div className="vs">vs</div>
        <div className="away-team">
          {teamLabel(awayTeam)}
          <img
            src={`/flags/4x3/${awayCountry["alpha-2"].toLocaleLowerCase()}.svg`}
            alt={`${homeCountry.name} Flag`}
          />
        </div>
      </div>
      <PointsPrediction matchNumber={matchNumber} />
    </div>
  );
}
