export interface CreateRaceHanderPayload {
  raceName: string;
  lanes: {
    laneId: string;
    studentId: string;
  }[];
}

export interface Rank {
  order: number;
  studentIds: string[];
}
export interface UpdateRaceResultsPayload {
  results: Rank[];
  raceId: string;
}
