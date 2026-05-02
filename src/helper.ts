const MAX_VAL = 999;
const MAX_LBS = 9999;

const errors = {
  notPositive: "sets, reps, lbs must be positive numbers",
  maxValue: "max 999",
};

export const validateNums = (nums: string[]): string | null => {
  // checks if there are strings in nums or if nums are negative
  if (nums.some(n => isNaN(Number(n)) || Number(n) <= 0)) return errors.notPositive;

  // user can do more than 999 lbs
  if (Number(nums[2]) > MAX_LBS) return `max lbs ${MAX_LBS}`

  // checks if a number exceeds max val (user does not do 99999 reps, i think (? ), nums excludes the last item which is lbs, lbs is checked separately
  if (nums.slice(0, 2).some(n => Number(n) > MAX_VAL)) return errors.maxValue;
  return null;
};

export const errorMessages = {
  missingNums: "enter exercise, sets, reps, lbs",
  format: "format: exercise sets reps lbs",
};
