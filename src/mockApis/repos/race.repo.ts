import { Race, ResultRecord } from "@/types";

export const createRaceRepo = (race: Race) => {
  const existingLanes = getRacesRepo();
  const updatedLanes = [...existingLanes, race];
  return localStorage.setItem("races", JSON.stringify(updatedLanes));
};

export const getRacesRepo = (): Race[] => {
  return JSON.parse(localStorage.getItem("races") || "[]");
};

export const getRaceByIdRepo = (raceId: string): Race | undefined => {
  const allResults: Race[] = JSON.parse(localStorage.getItem("races") || "[]");
  return allResults.find((race) => race.id === raceId);
};

export const updateRaceResultsByIdRepo = (
  raceId: string,
  results: ResultRecord[]
): Race | undefined => {
  const itemToUpdate = getRaceByIdRepo(raceId);
  if (itemToUpdate) {
    const newItem = {
      ...itemToUpdate,
      results: results,
    };
    const allResults = getRacesRepo();
    const newAllResults = allResults.map((item) => {
      if (item.id === newItem.id) {
        return newItem;
      }
      return item;
    });
    localStorage.setItem("races", JSON.stringify(newAllResults));
    return newItem;
  }
  return;
};
