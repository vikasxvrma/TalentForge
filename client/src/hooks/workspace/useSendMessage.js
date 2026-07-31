import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../api/workspaceApi";

export function useSendMessage(options = {}) {
  return useMutation({
    mutationFn: sendMessage,
    ...options,
  });
}