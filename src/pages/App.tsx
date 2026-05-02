import { Input } from "../components/Input";
import { ListTable } from "../components/ListTable";

export const App = () => {
  const exercises = [
    { name: "bench press", sets: 3, reps: 10, lbs: 100 },
    { name: "squat", sets: 4, reps: 8, lbs: 150 },
  ];

  return (
    <div class="h-full w-full p-4">
      <h1 class="text-2xl mb-4">Track your set.</h1>
      <Input
        name="type"
        placeholder="e.g: bench press 3 10 100"
        className="max-w-lg mb-8"
      />
      <h2 class="border-b">today</h2>
      <ListTable exercises={exercises} />
      <h2 class="border-b">yesterday</h2>
      <ListTable exercises={exercises} />

    </div>
  );
};
