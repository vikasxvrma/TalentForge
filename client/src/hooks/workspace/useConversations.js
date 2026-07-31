import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../api/workspaceApi";

export function useConversations() {
  const query = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...query,
    conversations: query.data ?? [],
  };
}