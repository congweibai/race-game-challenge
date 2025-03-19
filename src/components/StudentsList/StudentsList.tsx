import { useStudentList } from "@/hooks/useStudentList";
export const StudentsList = () => {
  const { studentList } = useStudentList();
  return (
    <div>
      <div>Student list:</div>
      <ul>
        {studentList.map((student) => {
          return <li key={student.id}>{student.name}</li>;
        })}
      </ul>
    </div>
  );
};
