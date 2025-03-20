import { uid } from "uid";
import { createLaneRepo } from "../repos/lane.repo";
import { CreateLaneHanderPayload } from "../types";

export const validateCreateLanePayload = (payload: CreateLaneHanderPayload) => {
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

export const createLaneService = (payload: CreateLaneHanderPayload) => {
  const isValid = validateCreateLanePayload(payload);
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
    return createLaneRepo(raceWithIds);
  }
  return "Payload is not correct";
};
