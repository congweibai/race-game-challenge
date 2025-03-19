import { calculateRaceResultsWithOrderSort } from "@/helpes/calculateRaceResultsWithOrderSort";
import { useStudentList } from "@/hooks/useStudentList";
import { Race } from "@/types";

export const RaceDetails = ({ race }: { race: Race }) => {
  const { results } = race;
  const { studentList } = useStudentList();
  const resultsWithNameAndOrder = calculateRaceResultsWithOrderSort({
    results: Array.isArray(results) ? results : [],
    students: studentList,
  });
  if (resultsWithNameAndOrder.length === 0) {
    return <>No results found!</>;
  }
  return (
    <ul>
      {resultsWithNameAndOrder.map((result) => {
        return (
          <li key={result.studentId}>
            Rank:{result.order + 1}, {result.studentName}
          </li>
        );
      })}
    </ul>
  );
};
