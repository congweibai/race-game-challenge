export type Student = {
  id: string;
  name: string;
};

export type Lane = {
  id: string;
  laneName: string;
  order?: number;
  studentId: string;
};

export type ResultRecord = {
  studentId: string;
  order: number;
};

export type Race = {
  id: string;
  raceName: string;
  lanes: Lane[];
  results?: ResultRecord[];
};
