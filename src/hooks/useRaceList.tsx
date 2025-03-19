import { mockPastRaces } from "@/__tests__/mock";
import { useState } from "react";

export const useRaceList = () => {
  const [raceList] = useState(() => mockPastRaces);
  return {
    raceList,
  };
};
