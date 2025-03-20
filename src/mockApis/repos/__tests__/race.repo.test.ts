import { beforeEach, describe, expect, it } from "vitest";
import { Race } from "@/types";
import {
  createRaceRepo,
  getRaceByIdRepo,
  getRacesRepo,
  updateRaceResultsByIdRepo,
} from "../race.repo";

describe("getRacesRepo", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array if no races are stored", () => {
    expect(getRacesRepo()).toEqual([]);
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

    expect(getRacesRepo()).toEqual(mockRaces);
  });
});

describe("createRaceRepo", () => {
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

    createRaceRepo(mockRace);

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
    createRaceRepo(newRace);

    expect(JSON.parse(localStorage.getItem("races") || "[]")).toEqual([
      ...initialRaces,
      newRace,
    ]);
  });
});

describe("getRaceByIdRepo", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an undefined", () => {
    expect(getRaceByIdRepo("1")).toEqual(undefined);
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

    expect(getRaceByIdRepo("1")).toEqual(mockRaces[0]);
  });
});

describe("updateRaceResultsByIdRepo", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should update results to localStorage", () => {
    const mockRace: Race = {
      id: "1",
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

    const results = [
      {
        studentId: "3",
        order: 0,
      },
      {
        studentId: "2",
        order: 1,
      },
      {
        studentId: "1",
        order: 4,
      },
      {
        studentId: "4",
        order: 2,
      },
      {
        studentId: "5",
        order: 2,
      },
    ];

    localStorage.setItem("races", JSON.stringify([mockRace]));

    updateRaceResultsByIdRepo("1", results);

    expect(JSON.parse(localStorage.getItem("races") || "[]")).toEqual([
      {
        ...mockRace,
        results,
      },
    ]);
  });

  it("should not update results if targeted race not exisited", () => {
    const results = [
      {
        studentId: "3",
        order: 0,
      },
      {
        studentId: "2",
        order: 1,
      },
      {
        studentId: "1",
        order: 4,
      },
      {
        studentId: "4",
        order: 2,
      },
      {
        studentId: "5",
        order: 2,
      },
    ];

    localStorage.setItem("races", JSON.stringify([]));

    updateRaceResultsByIdRepo("1", results);

    expect(JSON.parse(localStorage.getItem("races") || "[]")).toEqual([]);
  });
});
