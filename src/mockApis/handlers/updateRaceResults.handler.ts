import { updateRaceResultsService } from "../services/race.service";
import { UpdateRaceResultsPayload } from "../types";

export const updateRaceResultsHandler = async (
  payload: UpdateRaceResultsPayload
) => {
  return updateRaceResultsService(payload);
};
