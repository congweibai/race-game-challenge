import { useState } from "react";
import { CreateRace } from "./CreateRace";
import { RaceHistory } from "./RaceHistory";

enum RacePaneTab {
  CREATE_NEW_RACE = "create-new-race",
  RACE_HISTORY = "race-history",
}

export const RacePanel = () => {
  const [tab, setTab] = useState(RacePaneTab.CREATE_NEW_RACE);
  return (
    <div>
      <div>
        <button
          disabled={tab === RacePaneTab.CREATE_NEW_RACE}
          onClick={() => setTab(RacePaneTab.CREATE_NEW_RACE)}
        >
          Create new race
        </button>
        <button
          disabled={tab === RacePaneTab.RACE_HISTORY}
          onClick={() => setTab(RacePaneTab.RACE_HISTORY)}
        >
          Race history
        </button>
      </div>
      {tab === RacePaneTab.CREATE_NEW_RACE ? <CreateRace /> : null}
      {tab === RacePaneTab.RACE_HISTORY ? <RaceHistory /> : null}
    </div>
  );
};
