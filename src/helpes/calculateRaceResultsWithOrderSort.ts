import { ResultRecord, Student } from "@/types";

type ResultRecordWithStudentName = ResultRecord & {
  studentName: string;
};
export const calculateRaceResultsWithOrderSort = ({
  results,
  students,
}: {
  results: ResultRecord[];
  students: Student[];
}): ResultRecordWithStudentName[] => {
  const studentsMap = new Map();
  students.forEach((student) => {
    studentsMap.set(student.id, student.name);
  });

  return results
    .map((item) => {
      return {
        ...item,
        studentName: studentsMap.get(item.studentId) || "No Record",
      };
    })
    .sort((a, b) => a.order - b.order);
};
