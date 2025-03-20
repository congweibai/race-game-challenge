export interface CreateLaneHanderPayload {
  raceName: string;
  lanes: {
    laneId: string;
    studentId: string;
  }[];
}
