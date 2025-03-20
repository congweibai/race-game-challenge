import { createRaceService } from "../services/race.service";
import { CreateRaceHanderPayload } from "../types";

export const createRaceHandler = async (payload: CreateRaceHanderPayload) => {
  return createRaceService(payload);
};
