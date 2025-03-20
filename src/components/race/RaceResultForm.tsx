import { adjustRacePlacements } from "@/helpers/adjustRacePlacements";
import { createRaceArray } from "@/helpers/createRaceArray";
import { useStudentList } from "@/hooks/useStudentList";
import { Rank } from "@/mockApis/types";
import { Race } from "@/types";
import { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Select from "react-select";
export type RaceResultsInputs = {
  ranks: {
    // same with index to assure order
    order: number;
    studentIds: string[];
  }[];
};

export const RaceResultForm = ({
  race,
  onUpdateRaceResults,
}: {
  race: Race;
  onUpdateRaceResults: (rank: Rank[]) => void;
}) => {
  const { lanes } = race;
  const studentsInGame = lanes.reduce((accumulator, laneField) => {
    if (laneField.studentId) {
      accumulator.add(laneField.studentId);
    }
    return accumulator;
  }, new Set());
  const maximumCount = lanes.length;
  const { studentList } = useStudentList();

  const allStudentOptions = studentList.map((student) => {
    return {
      value: student.id,
      label: student.name,
    };
  });

  const studentInGameOptions = allStudentOptions.filter((student) =>
    studentsInGame.has(student.value)
  );

  const { control, register, handleSubmit, watch, trigger } =
    useForm<RaceResultsInputs>({
      mode: "onChange",
      defaultValues: {
        ranks: createRaceArray(maximumCount),
      },
    });

  const { fields: raceResultFields } = useFieldArray({
    control,
    name: "ranks",
  });

  const watchRanks = watch("ranks");
  const selectedStudentsSet = watchRanks.reduce((accumulator, laneField) => {
    if (laneField.studentIds.length > 0) {
      laneField.studentIds.forEach((studentId) => accumulator.add(studentId));
    }
    return accumulator;
  }, new Set());

  const filteredStudentsOptions = studentInGameOptions.filter(
    (student) => !selectedStudentsSet.has(student.value)
  );

  const onSubmit: SubmitHandler<RaceResultsInputs> = (data) => {
    // mock api;
    const trimEmptyRankAndReorder = adjustRacePlacements(data.ranks);
    onUpdateRaceResults(trimEmptyRankAndReorder);
  };

  useEffect(() => {
    trigger(); // Manually triggers validation when component mounts
  }, [trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {raceResultFields.map((aceResultField, index) => (
        <div
          key={aceResultField.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{`Rank ${index + 1}`}:</div>
          <div style={{ width: "80%" }}>
            <Controller
              control={control}
              {...register(`ranks.${index}.studentIds`)}
              render={({ field: { onChange, value } }) => (
                <Select
                  classNamePrefix="addl-class"
                  options={filteredStudentsOptions}
                  isMulti={true}
                  value={studentInGameOptions.filter((option) =>
                    value?.includes(option.value)
                  )}
                  isDisabled={
                    (index > 0 &&
                      !watch(`ranks.${index - 1}.studentIds`)?.length) ||
                    !!watch(`ranks.${index + 1}.studentIds`)?.length
                  }
                  closeMenuOnSelect={false}
                  onChange={(val) => {
                    const values = val.map((item) => item.value);
                    onChange(values);
                  }}
                  styles={{
                    option: (provided, state) => ({
                      ...provided,
                      borderBottom: "1px dotted pink",
                      color: state.isSelected ? "black" : "black",
                      padding: 20,
                    }),
                  }}
                />
              )}
            />
          </div>
        </div>
      ))}
      <div>
        <button
          type="submit"
          // all students should be selected before submitting
          disabled={maximumCount !== selectedStudentsSet.size}
        >
          Save result
        </button>
      </div>
    </form>
  );
};
