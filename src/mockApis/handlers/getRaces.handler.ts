import { getRacesService } from "../services/race.service";

export const getLanesHandler = async () => {
  return getRacesService();
};
