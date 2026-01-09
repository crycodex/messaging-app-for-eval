import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import ChatService from "../api/domain/chat/chat.service";

const chatService = new ChatService();

interface SendImageParams {
  uri: string;
  caption: string;
}

export const useSendImageMessage = () => {
  const sendImage = useCallback(async (params: SendImageParams) => {
    return chatService.sendImageMessage(params.uri, params.caption);
  }, []);

  return useMutation({
    mutationFn: sendImage,
  });
};
