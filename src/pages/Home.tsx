import { signal } from "@preact/signals";
import type { Exercise, Errors } from "../types";

const errors = {
  missingNums: "enter exercise, sets, reps, lbs",
  notPositive: "sets, reps, lbs must be positive numbers",
  format: "format: exercise sets reps lbs",
};

let setsSignal = signal(0);
let repsSignal = signal(0);
let lbsSignal = signal(0);
let exerciseSignal = signal("bench press");
let errorsSignal = signal<Errors>({});
let exercisesSignal = signal<Exercise[]>([]);

export const Home = () => {
  const onChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const length = value.split(" ").length;
    const data = value.split(" ").filter((item) => item !== "");

    if (data.length === 0) {
      errorsSignal.value = {};
      return;
    }

    // if its greater than 4, the user wrote an exercise name with spaces (e.g: "incline bench press 3 10 100")
    if (length > 4) {
      const exercise: string[] = [];
      // loop and check if item is a string
      data.forEach((item, _) => isNaN(Number(item)) && exercise.push(item));

      // extracts only the number items from the exercise
      const nums = data.filter((item) => !isNaN(Number(item)));

      if (nums.length !== 3 || nums.some(n => Number(n) <= 0)) {
        errorsSignal.value = { input: errors.missingNums };
        return;
      }

      const [sets, reps, lbs] = nums;
      errorsSignal.value = {};
      updateSignals({ sets, reps, lbs, exercise: exercise.join(" ") });
    } else if (length === 4) {
      const [exercise, sets, reps, lbs] = data;
      const nums = [sets, reps, lbs];
      if (nums.some(n => isNaN(Number(n)) || Number(n) <= 0)) {
        errorsSignal.value = { input: errors.notPositive };
        return;
      }
      errorsSignal.value = {};
      updateSignals({ sets, reps, lbs, exercise });
    } else {
      errorsSignal.value = { input: errors.format };
    }
  };

  const updateSignals = ({
    sets,
    reps,
    lbs,
    exercise,
  }: {
    sets: string;
    reps: string;
    lbs: string;
    exercise: string;
  }) => {
    setsSignal.value = Number(sets) || 0;
    repsSignal.value = Number(reps) || 0;
    lbsSignal.value = Number(lbs) || 0;
    exerciseSignal.value = exercise;
  };


  const onSubmit = (e: Event) => {
    e.preventDefault();
    if (setsSignal.value === 0 && repsSignal.value === 0 && lbsSignal.value === 0) {
      return;
    }
    exercisesSignal.value = [
      ...exercisesSignal.value,
      {
        name: exerciseSignal.value,
        sets: setsSignal.value,
        reps: repsSignal.value,
        lbs: lbsSignal.value,
      },
    ];
    (e.target as HTMLFormElement).reset();
  };

  return (
    <header class="mb-8 pb-18 flex flex-col">
      <div class="flex flex-col gap-12 h-full justify-center ">
        <div>
          <h1 class="mb-4 text-2xl">
            Minimal gains.
          </h1>
          <p class="text-left mx-auto w-full">
            A clean, fast workout tracker focused on what actually matters:{" "}
            <span class="">your progress.</span>
          </p>
        </div>
        <div class="">
          <form class="relative w-full" onSubmit={onSubmit}>
            <span class="lowercase">-- Try it </span>
            <input
              name="try"
              placeholder="e.g: bench press 3 10 100"
              class="px-2 py-4 border border-dashed w-full mt-2"
              onInput={onChange}
            />
            {errorsSignal.value.input && (
              <p class="text-red-500 text-sm mt-1">{errorsSignal.value.input}</p>
            )}
            <button class="relative w-full border p-2 mt-2 hover-effect" type="submit">finish</button>
          </form>

          <div class="flex justify-around border mt-4 p-2 items-center border-dashed">
            <p class="w-24 break-all">{exerciseSignal.value}</p>
            <div class="flex flex-col gap-1 text-center">
              <p class="text-lg">[{setsSignal.value}]</p>
              <p class="uppercase bold text-xs">sets</p>
            </div>

            <div class="flex flex-col gap-1 text-center">
              <p class="text-lg">[{repsSignal.value}]</p>
              <p class="uppercase bold text-xs">reps</p>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <p class="text-lg">[{lbsSignal.value}]</p>
              <p class="uppercase bold text-xs">lbs</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

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
            {exercisesSignal.value.length === 0 ? (
              <tr>
                <td colspan="4" class="text-center p-4 text-gray-500">no exercises yet</td>
              </tr>
            ) : (
              exercisesSignal.value.map((ex, i) => (
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
      </div>
    </header>
  );
};
