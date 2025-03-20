import { Race, Student } from "@/types";

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Wyatt",
  },
  {
    id: "2",
    name: "Tom",
  },
  {
    id: "3",
    name: "Jack",
  },
  {
    id: "4",
    name: "James",
  },
  {
    id: "5",
    name: "Kevin",
  },
  {
    id: "6",
    name: "Martin",
  },
  {
    id: "7",
    name: "Lee",
  },
  {
    id: "8",
    name: "Test",
  },
  {
    id: "9",
    name: "Jarrad",
  },
];

export const mockPastRaces: Race[] = [
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
  {
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
  },
  {
    id: "3",
    raceName: "Race 3",
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
    results: [
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
    ],
  },
];
