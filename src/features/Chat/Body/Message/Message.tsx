import React from "react";

import { StyleSheet, View } from "react-native";
import * as MessageView from "../../../../components/MessageView/MessageView";
import { getChatEventPropertyById } from "../../../../redux/chat/chat.selector";
import { useAppSelector } from "../../../../redux/hooks";
import ImageLayout from "./Layout/Image";
import Regular from "./Layout/Regular";
import { MessageProvider } from "./Provider";
import { MessageProps } from "./types";

function Message(props: MessageProps) {
  const { id } = props;

  const isAutoResponse = useAppSelector(
    getChatEventPropertyById(id, "isAutoResponse")
  );

  const timestamp = useAppSelector(getChatEventPropertyById(id, "timestamp"));

  const type = useAppSelector(getChatEventPropertyById(id, "type"));

  const isReceived = !!isAutoResponse;
  const isImage = type === "image";

  return (
    <MessageProvider id={id}>
      <MessageView.Root isReceived={isReceived}>
        <View style={styles.messageContent}>
          {isImage ? <ImageLayout /> : <Regular />}
        </View>

        <MessageView.BottomComposer
          icon={"check.fill"}
          isReceived={isReceived}
          timestamp={new Date(timestamp ?? Date.now())}
        />
      </MessageView.Root>
    </MessageProvider>
  );
}

export default React.memo(Message);

const styles = StyleSheet.create({
  messageContent: {
    paddingHorizontal: 6,
    width: "100%",
    alignContent: "flex-start",
  },
});
