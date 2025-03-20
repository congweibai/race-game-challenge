import { calculateRaceResultsWithOrderSort } from "@/helpers/calculateRaceResultsWithOrderSort";
import { useStudentList } from "@/hooks/useStudentList";
import { Race } from "@/types";
import { useState } from "react";
import { RaceResultForm } from "./RaceResultForm";
import { updateRaceResultsHandler } from "@/mockApis/handlers/updateRaceResults.handler";
import { Rank } from "@/mockApis/types";

export const RaceDetails = ({
  race,
  onRefreshList,
}: {
  race: Race;
  onRefreshList: () => void;
}) => {
  const { results, id: raceId } = race;
  const { studentList } = useStudentList();
  const [showResultForm, setShowResultForm] = useState(false);

  const resultsWithNameAndOrder = calculateRaceResultsWithOrderSort({
    results: Array.isArray(results) ? results : [],
    students: studentList,
  });

  const onUpdateRaceResults = async (results: Rank[]) => {
    const payload = { raceId, results };
    await updateRaceResultsHandler(payload);
    setShowResultForm(false);
    onRefreshList();
  };

  if (resultsWithNameAndOrder.length === 0) {
    return (
      <>
        No results found!
        <div>
          {showResultForm ? (
            <RaceResultForm
              onUpdateRaceResults={onUpdateRaceResults}
              race={race}
            />
          ) : (
            <button onClick={() => setShowResultForm(true)}>Add result</button>
          )}
        </div>
      </>
    );
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
