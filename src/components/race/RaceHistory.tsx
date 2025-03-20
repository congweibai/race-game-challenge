import { useRaceList } from "@/hooks/useRaceList";
import { useState } from "react";
import { RaceDetails } from "./RaceDetails";

export const RaceHistory = () => {
  const { raceList, getAllLanes: refreshRaceList } = useRaceList();
  const [activeRaceId, setActiveRaceId] = useState<string | null>(null);

  return (
    <>
      <div>Race history:</div>
      <ul>
        {raceList.map((race) => {
          return (
            <li key={race.id}>
              <button onClick={() => setActiveRaceId(race.id)}>
                {race.raceName}
              </button>
              <div>
                {activeRaceId === race.id ? (
                  <RaceDetails race={race} onRefreshList={refreshRaceList} />
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
