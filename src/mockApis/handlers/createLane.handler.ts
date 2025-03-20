import { createLaneService } from "../services/lane.service";
import { CreateLaneHanderPayload } from "../types";

export const createLaneHandler = async (payload: CreateLaneHanderPayload) => {
  return createLaneService(payload);
};
