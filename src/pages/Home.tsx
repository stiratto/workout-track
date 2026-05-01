import { signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  lbs: number;
}

let setsSignal = signal(0);
let repsSignal = signal(0);
let lbsSignal = signal(0);
let exerciseSignal = signal("bench press");

export const Home = () => {
  const onChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    const length = value.split(" ").length;
    const data = value.split(" ").filter((item) => item !== "");
    console.log(data);

    // if its greater than 4, the user wrote an exercise name with spaces (e.g: "incline bench press 3 10 100")
    if (length > 4) {
      const exercise: string[] = [];
      // loop and check if item is a string
      data.forEach((item, _) => isNaN(Number(item)) && exercise.push(item));

      const [sets, reps, lbs] = data.filter((item) => !isNaN(Number(item)));
      updateSignals({ sets, reps, lbs, exercise: exercise.join(" ") });
    } else if (length === 4) {
      const [exercise, sets, reps, lbs] = data;

      updateSignals({ sets, reps, lbs, exercise });
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


  const onSubmit = (e) => {
    console.log(e.preventDefault())
  }

  return (
    <header class="mb-8 pb-18 h-screen flex flex-col">
      <div class="flex flex-col gap-24 h-full justify-center ">
        <div>
          <h1 class="mb-4 text-2xl">
            Track your workouts without the clutter.
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
      </div>
    </header>
  );
};
