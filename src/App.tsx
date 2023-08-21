import "./App.css";
import { GroupStageFixtures } from "./components/GroupStageFixtures";
import { fixtures } from "./data/fixtures";
import { ResultsRepository } from "./services/results-repository";

function App({ resultsRepository }: { resultsRepository: ResultsRepository }) {
  return (
    <>
      <GroupStageFixtures
        resultsRepository={resultsRepository}
        fixtures={fixtures.slice(0, 3)}
      />
    </>
  );
}

export default App;
