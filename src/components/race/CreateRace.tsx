import { useStudentList } from "@/hooks/useStudentList";
import { createRaceHandler } from "@/mockApis/handlers/createRace.handler";
import { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Select from "react-select";
import { uid } from "uid";

type RaceInputs = {
  lanes: {
    laneId: string;
    studentId: string;
  }[];
  raceName: string;
};

export const CreateRace = ({ onFinshed }: { onFinshed: () => void }) => {
  const { studentList } = useStudentList();
  const allStudentOptions = studentList.map((student) => {
    return {
      value: student.id,
      label: student.name,
    };
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<RaceInputs>({
    mode: "onChange",
    defaultValues: {
      raceName: "New Race Game!",
      lanes: [
        {
          laneId: uid(),
          studentId: "",
        },
        {
          laneId: uid(),
          studentId: "",
        },
      ],
    },
  });
  const {
    fields: laneFields,
    append: appendLane,
    remove: removeLane,
  } = useFieldArray({
    control,
    name: "lanes",
  });

  const watchLanes = watch("lanes");
  const selectedStudentsSet = watchLanes.reduce((accumulator, laneField) => {
    if (laneField.studentId) {
      accumulator.add(laneField.studentId);
    }
    return accumulator;
  }, new Set());

  const filteredStudentsOptions = allStudentOptions.filter(
    (student) => !selectedStudentsSet.has(student.value)
  );

  const onAddMoreLane = () => {
    appendLane({
      laneId: uid(),
      studentId: "",
    });
  };
  const onRemoveLane = (index: number) => {
    removeLane(index);
  };
  const onSubmit: SubmitHandler<RaceInputs> = (data) => {
    // mock api;
    console.log(data);

    createRaceHandler(data);
    onFinshed();
  };

  useEffect(() => {
    trigger(); // Manually triggers validation when component mounts
  }, [trigger]);

  return (
    <>
      <div>Create a race:</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="please input race name"
            {...register("raceName", { required: true })}
          />
        </div>

        {laneFields.map((laneField, index) => (
          <div
            key={laneField.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>{`Lane ${index + 1}`}:</div>
            <div style={{ width: "80%" }}>
              <Controller
                control={control}
                {...register(`lanes.${index}.studentId`, { required: true })}
                render={({ field: { onChange, value } }) => (
                  <Select
                    classNamePrefix="addl-class"
                    options={filteredStudentsOptions}
                    value={allStudentOptions.find((c) => c.value === value)}
                    onChange={(val) => {
                      if (val?.value) {
                        onChange(val.value);
                      }
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
            <button
              onClick={() => onRemoveLane(index)}
              disabled={laneFields.length === 2}
            >
              Remove
            </button>
          </div>
        ))}

        <button onClick={onAddMoreLane}>Add lane</button>

        <div>
          <button type="submit" disabled={Object.keys(errors).length !== 0}>
            submit
          </button>
        </div>
      </form>
    </>
  );
};
