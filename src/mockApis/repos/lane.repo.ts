import { Race } from "@/types";

export const createLaneRepo = (race: Race) => {
  const existingLanes = getLanesRepo();
  const updatedLanes = [...existingLanes, race];
  return localStorage.setItem("races", JSON.stringify(updatedLanes));
};

export const getLanesRepo = (): Race[] => {
  return JSON.parse(localStorage.getItem("races") || "[]");
};
