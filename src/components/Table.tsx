import type { Exercise } from "../types";

interface TableProps {
  exercises: Exercise[];
  emptyMessage?: string;
}

export const Table = ({ exercises, emptyMessage = "no exercises yet" }: TableProps) => {
  return (
    <table class="w-full mt-8 border">
      <thead>
        <tr class="border-b">
          <th class="text-left p-2">exercise</th>
          <th class="text-center p-2">sets</th>
          <th class="text-center p-2">reps</th>
          <th class="text-right p-2">lbs</th>
        </tr>
      </thead>
      <tbody>
        {exercises.length === 0 ? (
          <tr>
            <td colspan={4} class="text-center p-4 text-gray-500">{emptyMessage}</td>
          </tr>
        ) : (
          exercises.map((ex, i) => (
            <tr key={i} class="border-b">
              <td class="p-2">{ex.name}</td>
              <td class="text-center p-2">{ex.sets}</td>
              <td class="text-center p-2">{ex.reps}</td>
              <td class="text-right p-2">{ex.lbs}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};