import { useEffect, useState } from "preact/hooks";
import type { Exercise } from "../types";
import { Input } from "./Input";

interface ListTableProps {
  exercises: Exercise[];
  emptyMessage?: string;
}

export const ListTable = ({ exercises, emptyMessage = "no exercises yet" }: ListTableProps) => {
  const [isEditing, setIsEditing] = useState<boolean | Exercise>(false)


  if (exercises.length === 0) {
    return <p class="text-center p-4 text-gray-500">{emptyMessage}</p>;
  }


  const onExerciseClick = (exercise: Exercise) => {
    setIsEditing(exercise)
    console.log("user wants to edit this exercise", exercise.name)
  }


  // function ran when user leaves the input
  const onDeFocus = () => {
    setIsEditing(false)
  }


  // function ran when user types in the input
  const onChange = (e) => {
    console.log(e.target.value)
  }

  const getExerciseString = (ex: Exercise) => {
    return ex.name + " " + ex.sets + " " + ex.sets + " " + ex.lbs
  }

  return (
    <ul class="flex flex-col gap-2">
      {/*  we want to keep all exercises the same but the exercise that is being edited */}
      {exercises.map((ex, i) =>
        // user is editing
        isEditing && (isEditing as boolean) &&
          (isEditing as Exercise).name === ex.name
          ?
          <Input
            name="edit"
            placeholder="edit"
            value={getExerciseString(ex)}
            onInput={onChange}
            onFocusOut={onDeFocus} />

          : (
            <li
              key={i}
              class="flex flex-col gap-2 p-2 w-full"
              onClick={() => onExerciseClick(ex)}
            >

              <div class="flex w-full">
                <span class="break-all">{ex.name}</span>
              </div>
              <div class="flex self-start gap-4">
                <span>{ex.sets}x{ex.reps}</span>
                <span>{ex.lbs}lbs</span>
              </div>
            </li>
          ))
      }
    </ul >
  );
};
