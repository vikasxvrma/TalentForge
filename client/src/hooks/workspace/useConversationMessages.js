import { useQuery } from "@tanstack/react-query";

import { getConversationMessages } from "../../api/workspaceApi";

export function useConversationMessages(conversationId) {
  const query = useQuery({
    queryKey: ["messages", conversationId],

    queryFn: () =>
      getConversationMessages(conversationId),

    enabled: !!conversationId,
  });

  return {
    ...query,
    messages: query.data ?? [],
  };
}