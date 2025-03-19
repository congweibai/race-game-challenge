import { mockStudents } from "@/__tests__/mock";
import { useState } from "react";

export const useStudentList = () => {
  const [studentList] = useState(() => mockStudents);
  return {
    studentList,
  };
};
