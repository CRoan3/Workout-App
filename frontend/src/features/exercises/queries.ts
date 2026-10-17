import { useQuery } from "@tanstack/react-query";
import { getExerciseById, getExercises } from "./api"; //not @/api because this file is already in the exercises folder, so we can use a relative path. There is also an api.ts file in the workout-plans folder, so we need to be specific about which api.ts file we want to import from.


// Query keys: the cache;s "address" for each piece of data
// Defined in one place so queries and invalidations always match

export const execiseKeys = {
  all: ["exercises"] as const,
  detail: (id: number) => ["exercises",id] as const,
};

// All exercises query
export function useExercises() {
  return useQuery({
    queryKey: execiseKeys.all,
    queryFn: getExercises,
  });
}

// One exercise by id
export function useExercise(id: number) {
  return useQuery({
    queryKey: execiseKeys.detail(id),
    queryFn: () => getExerciseById(id),
  });
}