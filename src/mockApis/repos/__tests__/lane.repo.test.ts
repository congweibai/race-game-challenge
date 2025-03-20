import { beforeEach, describe, expect, it } from "vitest";
import { Race } from "@/types";
import { createLaneRepo, getLanesRepo } from "../lane.repo";

describe("getLanesRepo", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array if no races are stored", () => {
    expect(getLanesRepo()).toEqual([]);
  });

  it("should return the stored races", () => {
    const mockRaces: Race[] = [
      {
        id: "1",
        raceName: "Race 1",
        lanes: [
          {
            id: "1",
            laneId: "Lane 1",
            studentId: "1",
          },
          {
            id: "2",
            laneId: "Lane 2",
            studentId: "2",
          },
          {
            id: "3",
            laneId: "Lane 3",
            studentId: "3",
          },
          {
            id: "4",
            laneId: "Lane 4",
            studentId: "4",
          },
        ],
      },
    ];
    localStorage.setItem("races", JSON.stringify(mockRaces));

    expect(getLanesRepo()).toEqual(mockRaces);
  });
});

describe("createLaneRepo", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a new race to localStorage", () => {
    const mockRace: Race = {
      id: "2",
      raceName: "Race 2",
      lanes: [
        {
          id: "1",
          laneId: "Lane 1",
          studentId: "5",
          order: 0,
        },
        {
          id: "2",
          laneId: "Lane 2",
          studentId: "2",
          order: 2,
        },
        {
          id: "3",
          laneId: "Lane 3",
          studentId: "7",
          order: 1,
        },
        {
          id: "4",
          laneId: "Lane 4",
          studentId: "4",
          order: 3,
        },
        {
          id: "1",
          laneId: "Lane 5",
          studentId: "1",
          order: 4,
        },
      ],
    };

    createLaneRepo(mockRace);

    expect(JSON.parse(localStorage.getItem("races") || "[]")).toEqual([
      mockRace,
    ]);
  });

  it("should append a new race to existing races", () => {
    const initialRaces: Race[] = [
      {
        id: "1",
        raceName: "Race 1",
        lanes: [
          {
            id: "1",
            laneId: "Lane 1",
            studentId: "1",
          },
          {
            id: "2",
            laneId: "Lane 2",
            studentId: "2",
          },
          {
            id: "3",
            laneId: "Lane 3",
            studentId: "3",
          },
          {
            id: "4",
            laneId: "Lane 4",
            studentId: "4",
          },
        ],
      },
    ];
    localStorage.setItem("races", JSON.stringify(initialRaces));

    const newRace: Race = {
      id: "2",
      raceName: "Race 2",
      lanes: [
        {
          id: "1",
          laneId: "Lane 1",
          studentId: "5",
          order: 0,
        },
        {
          id: "2",
          laneId: "Lane 2",
          studentId: "2",
          order: 2,
        },
        {
          id: "3",
          laneId: "Lane 3",
          studentId: "7",
          order: 1,
        },
        {
          id: "4",
          laneId: "Lane 4",
          studentId: "4",
          order: 3,
        },
        {
          id: "1",
          laneId: "Lane 5",
          studentId: "1",
          order: 4,
        },
      ],
    };
    createLaneRepo(newRace);

    expect(JSON.parse(localStorage.getItem("races") || "[]")).toEqual([
      ...initialRaces,
      newRace,
    ]);
  });
});
