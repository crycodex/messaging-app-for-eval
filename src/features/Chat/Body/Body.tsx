import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { Message as MessageType } from "../../../api/domain/chat/chat.types";
import Paginated from "../../../api/types/paginated";
import { DEFAULT_LIMIT } from "../../../constants/pagination";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { setChatEvents, setChatPagination } from "../../../redux/chat";
import {
  getChatEvents,
  getChatPagination,
} from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Message from "./Message/Message";

function Body() {
  const events = useAppSelector(getChatEvents);
  const pagination = useAppSelector(getChatPagination);
  const dispatch = useAppDispatch();

  const { mutate: getEvents, isPending: isLoadingMore } = useGetEvents();

  const sortedMessages = useMemo(() => {
    return Object.values(events || {}).sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [events]);

  const handleLoadMore = useCallback(() => {
    if (!pagination?.hasNextPage || isLoadingMore) {
      return;
    }

    const newOffset = (pagination.offset || 0) + DEFAULT_LIMIT;

    getEvents(
      { limit: DEFAULT_LIMIT, offset: newOffset },
      {
        onSuccess: (data: Paginated<MessageType>) => {
          const { elements, ...newPagination } = data;

          const existingEvents = events || {};
          const newEvents = elements.reduce((acc, message) => {
            acc[message.id] = message;
            return acc;
          }, {} as Record<string, MessageType>);

          dispatch(
            setChatEvents(
              Object.values({ ...existingEvents, ...newEvents })
            )
          );
          dispatch(setChatPagination(newPagination));
        },
      }
    );
  }, [pagination, isLoadingMore, events, getEvents, dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: MessageType }) => <Message id={item.id} />,
    []
  );

  const keyExtractor = useCallback((item: MessageType) => item.id.toString(), []);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  }, [isLoadingMore]);

  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      style={styles.bodyContainer}
      resizeMode="repeat"
    >
      <FlatList
        data={sortedMessages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        inverted
        overScrollMode="never"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </ImageBackground>
  );
}

export default React.memo(Body);

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  loadingFooter: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
