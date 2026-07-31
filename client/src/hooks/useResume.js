import { useQuery } from "@tanstack/react-query";
import { getLatestResume } from "../api/resumeApi";

export function useResume() {
  const query = useQuery({
    queryKey: ["resume"],
    queryFn: getLatestResume,

    refetchInterval: ({ state }) => {
      const status = state.data?.status;

      return ["UPLOADED", "PROCESSING"].includes(status)
        ? 2000
        : false;
    },
  });

  return {
    ...query,

    resume: query.data,

    isResumeReady: query.data?.status === "COMPLETED",

    isProcessing: ["UPLOADED", "PROCESSING"].includes(
      query.data?.status
    ),

    hasResume: !!query.data,
  };
}