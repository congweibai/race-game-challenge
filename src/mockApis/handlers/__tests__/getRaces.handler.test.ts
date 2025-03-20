import { getRacesService } from "@/mockApis/services/race.service";
import { describe, expect, it, Mock, vi } from "vitest";
import { getLanesHandler } from "../getRaces.handler";
import { mockPastRaces } from "@/__tests__/mock";

vi.mock("@/mockApis/services/race.service", () => ({
  getRacesService: vi.fn(),
}));

describe("createRaceHandler", () => {
  it("should call getRacesService with the correct payload", async () => {
    (getRacesService as Mock).mockResolvedValue(mockPastRaces);

    const result = await getLanesHandler();

    expect(getRacesService).toHaveBeenCalledTimes(1);
    expect(getRacesService).toHaveBeenCalledWith();
    expect(result).toEqual(mockPastRaces);
  });
});
