import "./App.css";
import { RacePanel } from "./components/race/RacePanel";
import { StudentsList } from "./components/StudentsList/StudentsList";

function App() {
  return (
    <>
      <h1 className="app-header">Race system</h1>
      <div className="row">
        <div className="column-1-3">
          <StudentsList />
        </div>
        <div className="column-2-3">
          <RacePanel />
        </div>
      </div>
    </>
  );
}

export default App;
