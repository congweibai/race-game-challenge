import { describe, expect, it, Mock, vi } from "vitest";
import { getRacesService } from "../race.service";
import { getRacesRepo } from "@/mockApis/repos/race.repo";
import { mockPastRaces } from "@/__tests__/mock";

vi.mock("@/mockApis/repos/race.repo", () => ({
  getRacesRepo: vi.fn(),
}));

describe("createRaceService", () => {
  it("should call `createRaceRepo` with a valid transformed payload with ids", () => {
    (getRacesRepo as Mock).mockResolvedValue(mockPastRaces);

    const result = getRacesService();

    expect(getRacesRepo).toBeCalledTimes(1);
    expect(getRacesRepo).toHaveBeenCalledWith();

    expect(result).resolves.toEqual(mockPastRaces);
  });
});
