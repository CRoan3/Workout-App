import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkoutPlan, getWorkoutPlanById, getWorkoutPlans } from "./api";

// Query keys: the cache's "address" for each piece of data
// Defined in one place so queries and invalidations always match
export const workoutPlanKeys = {
  all: ["workout-plans"] as const,
  detail: (id: number) => ["workout-plans", id] as const,
};

// All workout plans query
export function useWorkoutPlans() {
  return useQuery({
    queryKey: workoutPlanKeys.all,
    queryFn: getWorkoutPlans,
  });
}

// One workout plan by id
export function useWorkoutPlan(id: number) {
  return useQuery({
    queryKey: workoutPlanKeys.detail(id),
    queryFn: () => getWorkoutPlanById(id),
  });
}

// Creates a workout plan, then marks the cached list as stale so it refetches with the new plan
export function useCreateWorkoutPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkoutPlan,
    onSuccess: (createdPlan) => {
      queryClient.invalidateQueries({ queryKey: workoutPlanKeys.all });
      // put the new plan straight into the cache so its detail page doesn't need to refetch it
      queryClient.setQueryData(workoutPlanKeys.detail(createdPlan.id), createdPlan);
    },
  });
}
