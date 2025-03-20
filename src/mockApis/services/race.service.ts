import { uid } from "uid";
import {
  createRaceRepo,
  getRacesRepo,
  updateRaceResultsByIdRepo,
} from "../repos/race.repo";
import {
  CreateRaceHanderPayload,
  Rank,
  UpdateRaceResultsPayload,
} from "../types";
import { ResultRecord } from "@/types";

export const validateCreateRacePayload = (payload: CreateRaceHanderPayload) => {
  const { lanes } = payload;
  if (lanes.length < 2) {
    // A race can only be created with at least 2 students.
    return false;
  }
  const selectedStudentsSet = lanes.reduce((accumulator, laneField) => {
    if (laneField.studentId) {
      accumulator.add(laneField.studentId);
    }
    return accumulator;
  }, new Set());
  if (selectedStudentsSet.size !== lanes.length) {
    // The same student cannot be assigned to more than one lane in the same race.
    return false;
  }

  // TO-DO: validate studentId

  return true;
};

export function transformRaceResults(ranks: Rank[]) {
  let newOrder = 0;
  const transformedResults = [];

  for (const rank of ranks) {
    if (rank.studentIds.length > 0) {
      for (const studentId of rank.studentIds) {
        transformedResults.push({
          studentId: studentId,
          order: newOrder,
        });
      }
      newOrder += rank.studentIds.length; // Move to the next rank, skipping tied places
    }
  }

  return transformedResults;
}

export function isValidRacePlacements(athletes: ResultRecord[]) {
  athletes.sort((a, b) => a.order - b.order);

  let expectedRank = 0;
  let i = 0;

  while (i < athletes.length) {
    let tiedCount = 1;

    // Count ties
    while (
      i + 1 < athletes.length &&
      athletes[i].order === athletes[i + 1].order
    ) {
      tiedCount++;
      i++;
    }

    // Check if the next available rank is correct
    if (athletes[i].order !== expectedRank) {
      return false; // Invalid placement
    }

    // Move to the next expected rank, skipping tied athletes
    expectedRank += tiedCount;
    i++;
  }

  return true; // Valid placement
}

export const createRaceService = (payload: CreateRaceHanderPayload) => {
  const isValid = validateCreateRacePayload(payload);
  if (isValid) {
    const raceWithIds = {
      ...payload,
      id: uid(),
      lanes: payload.lanes.map((lane) => {
        return {
          ...lane,
          id: uid(),
        };
      }),
    };
    return createRaceRepo(raceWithIds);
  }
  return "Payload is not correct";
};

export const getRacesService = () => {
  return getRacesRepo();
};

export const updateRaceResultsService = (payload: UpdateRaceResultsPayload) => {
  const transformedResults = transformRaceResults(payload.results);
  const isValid = isValidRacePlacements(transformedResults);
  console.log("isValid??", isValid);
  if (isValid) {
    return updateRaceResultsByIdRepo(payload.raceId, transformedResults);
  }
  return "Payload is not correct";
};
