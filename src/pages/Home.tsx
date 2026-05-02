import { signal } from "@preact/signals";
import type { Exercise, Errors } from "../types";
import { validateNums, errorMessages } from "../helper";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Table } from "../components/Table";

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


      if (nums.length !== 3) {
        errorsSignal.value = { input: errorMessages.missingNums };
        return;
      }

      const err = validateNums(nums);
      if (err) {
        errorsSignal.value = { input: err };
        return;
      }

      const [sets, reps, lbs] = nums;
      errorsSignal.value = {};
      updateSignals({ sets, reps, lbs, exercise: exercise.join(" ") });
    } else if (length === 4) {
      const [exercise, sets, reps, lbs] = data;
      const nums = [sets, reps, lbs];
      const err = validateNums(nums);
      if (err) {
        errorsSignal.value = { input: err };
        return;
      }
      errorsSignal.value = {};
      updateSignals({ sets, reps, lbs, exercise });
    } else {
      errorsSignal.value = { input: errorMessages.format };
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
    if (errorsSignal.value.input?.length ?? 0 > 0) return

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
      <div class="flex flex-col gap-12 h-full justify-center">
        <div class="h-[40vh] flex flex-col ">
          <h1 class="mb-4 text-2xl">
            Track your workout without the clutter.
          </h1>
          <p class="text-left mx-auto w-full">
            A clean, fast workout tracker focused on what actually matters:{" "}
            <span class="">your progress.</span>
          </p>
          <a href="/app">
            <Button className="w-max">I want it</Button>
          </a>
        </div>
        <div class="">
          <form class="relative w-full" onSubmit={onSubmit}>
            <span class="lowercase">-- Try it </span>
            <Input
              name="try"
              placeholder="e.g: bench press 3 10 100"
              className="max-w-lg"
              onInput={onChange}
            />
            {errorsSignal.value.input && (
              <p class="text-red-500 text-sm mt-1">{errorsSignal.value.input}</p>
            )}
            <Button type="submit">finish</Button>
          </form>

          <div class="flex justify-around border mt-4 p-2 items-center border-dashed">
            <p class="w-24 break-all">{exerciseSignal.value}</p>
            <div class="flex flex-col gap-1 text-center">
              <p class="text-lg truncate max-w-24">[{setsSignal.value}]</p>
              <p class="uppercase bold text-xs">sets</p>
            </div>

            <div class="flex flex-col gap-1 text-center">
              <p class="text-lg truncate max-w-24">[{repsSignal.value}]</p>
              <p class="uppercase bold text-xs">reps</p>
            </div>
            <div class="flex flex-col gap-1 text-center">
              <p class="text-lg truncate max-w-24">[{lbsSignal.value}]</p>
              <p class="uppercase bold text-xs">lbs</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

        <Table exercises={exercisesSignal.value} />
      </div>
    </header>
  );
};
