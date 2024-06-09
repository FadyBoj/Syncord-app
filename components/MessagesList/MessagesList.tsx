import {View, Text, VirtualizedList, ActivityIndicator} from 'react-native';
import {FC, memo, useCallback, useMemo} from 'react';
import styles from '../../styles/SingleChatStyles';
import MessageChunk from '../MessageChunk/MessageChunk';
import ChatBeginning from '../ChatBeginning/ChatBeginning';

interface IFriend {
  friendShipId: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
  image: string;
}

interface Chunk {
  userId: string;
  messages: {id: string; text: string; createdAt: string}[];
  timestampSpace: string | boolean;
  id: string;
  isLoading?: boolean;
}

interface Props {
  friend: IFriend;
  chatChunks: Chunk[];
  handleReachEnd: () => void;
  isFetchingPreviousMsgs: boolean;
  isRecordsEnded: boolean;
}

const MessagesList: FC<Props> = ({
  friend,
  chatChunks,
  handleReachEnd,
  isFetchingPreviousMsgs,
  isRecordsEnded,
}) => {

  // Memoize the renderItem function to ensure stable reference
  const renderItem = useCallback(({item, index}:{item:Chunk,index:number}) => (
    <MessageChunk
      friendPfp={friend?.image}
      friendId={friend?.userId}
      chunk={item}
      friend={friend}
      index={index}
      length={chatChunks.length}
    />
  ), [friend, chatChunks]);

  // Memoize ItemSeparatorComponent
  const ItemSeparatorComponent = useCallback(() => <View style={{height: 20}} />, []);

  // Memoize ListFooterComponent
  const ListFooterComponent = useMemo(() => (
    <>
      {isFetchingPreviousMsgs ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={30} color="gray" />
        </View>
      ) : isRecordsEnded ? (
        <ChatBeginning friend={friend} />
      ) : (
        <></>
      )}
    </>
  ), [isFetchingPreviousMsgs, isRecordsEnded, friend]);


  return (
    <VirtualizedList
      data={chatChunks}
      inverted
      onEndReached={handleReachEnd}
      getItemCount={() => chatChunks.length}
      getItem={(data, index) => data[index]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={styles.messagesList}
      onEndReachedThreshold={0.9}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export default memo(MessagesList)