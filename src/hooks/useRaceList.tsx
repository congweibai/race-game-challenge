import { getLanesHandler } from "@/mockApis/handlers/getRaces.handler";
import { Race } from "@/types";
import { useEffect, useState } from "react";

export const useRaceList = () => {
  const [isLoadinng, setIsLoadng] = useState(false);
  const [raceList, setRaceList] = useState<Race[]>([]);

  const getAllLanes = async () => {
    setIsLoadng(true);
    const result: Race[] = await getLanesHandler();
    setRaceList(result);
    setIsLoadng(false);
  };

  useEffect(() => {
    getAllLanes();
  }, []);
  return {
    raceList,
    isLoadinng,
    getAllLanes,
  };
};
