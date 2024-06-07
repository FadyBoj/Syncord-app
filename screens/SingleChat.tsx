import {
  View,
  Text,
  VirtualizedList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FC, useContext, useEffect, useRef, useState, memo, useCallback} from 'react';
import {RouteProp} from '@react-navigation/native';
import styles from '../styles/SingleChatStyles';
import Header from '../components/Header/SingleChatHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {DashboardContext} from '../context/DashboardContext';
import moment from 'moment-timezone';

//Components
import MessageChunk from '../components/MessageChunk/MessageChunk';

//Utils
import generateChunks from '../utils/generateChunks';

//Assets
import sendIcon from '../assets/send.png';

interface IFriend {
  friendShipId: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
  image: string;
}

interface Props {
  route?: RouteProp<
    {
      params: {
        friend: IFriend;
      };
    },
    'params'
  >;
}

interface Message {
  id: string;
  isSent: boolean;
  text: string;
  createdAt: Date;
  senderId: string;
}

interface Chunk {
  userId: string;
  messages: {id: string | null; text: string; createdAt: string}[];
  timestampSpace: string | boolean;
  id: string;
  isLoading?: boolean;
}

const SingleChat: FC<Props> = ({route}) => {
  const friend = route?.params.friend;

  const [messages, setMessages] = useState<null | Message[]>(null);
  const [chatChunks, setChatChunks] = useState<Chunk[] | null>(null);
  const [inputMsg, setInputMsg] = useState('');
  const connection = useContext(DashboardContext)?.connection;
  const user = useContext(DashboardContext)?.user;

  // Fetch messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response: {data: Message[]} = await axios.get(
          `https://syncord.runasp.net/chat/${friend?.friendShipId}?skip=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const messages = response.data;
        setMessages(messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [0]);

  useEffect(() => {
    if (messages) {
      const chunks = generateChunks(messages);
      setChatChunks(chunks.reverse());
    }
  }, [messages]);

  // Handle real-time connection
  const flatListRef = useRef<VirtualizedList<Chunk> | null>(null);

  const handleRecieveMessage = (message: Message) => {
    const newMessage: Message = message;
    setMessages(prevData => {
      if (!prevData) return prevData;
      return [prevData, newMessage].flat();
    });
  };

  useEffect(() => {
    connection?.on('RecieveMessage', handleRecieveMessage);
  }, [0]);

  // Handle message input change
  const handleChange = (text: string) => {
    setInputMsg(text);
  };

  const inputRef = useRef<TextInput | null>(null);

  const sendMessage = async () => {
    if (!user || inputMsg.length === 0) return;
    try {
      const newChunk: Chunk = {
        id: Math.random().toString(),
        userId: user.id.toString(),
        messages: [
          {id: null, text: inputMsg, createdAt: new Date().toString()},
        ],
        timestampSpace: false,
        isLoading: true,
      };  
      setChatChunks(prevChunks => {
        if (!prevChunks) return prevChunks;
        return [newChunk, ...prevChunks];
      });
      const tempMsg = inputMsg;
      setInputMsg('');
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const response = await axios.post('https://syncord.runasp.net/chat', {
        friendShipId: friend?.friendShipId,
        message: tempMsg,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      const newMessage: Message = {
        id: response.data.id,
        text: tempMsg,
        isSent: true,
        senderId: user.id,
        createdAt: response.data.createdAt
      };
      setMessages(prevData => {
        if (!prevData) return prevData;
        return [prevData, newMessage].flat();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const MemoizedVirtualizedList = memo(({data}: {data: Chunk[]}) => (
    <VirtualizedList
      ref={flatListRef}
      inverted
      data={data}
      getItemCount={() => data.length}
      removeClippedSubviews={true}
      windowSize={5}
      getItem={(data, index) => data[index]}
      initialNumToRender={10}
      renderItem={({item, index}) => (
        <MessageChunk
          friendPfp={friend?.image}
          friendId={friend?.userId}
          chunk={item}
          friend={friend}
          index={index}
          length={data.length}
        />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{height: 20}} />}
      contentContainerStyle={styles.messagesList}
    />
  ));

  const memoizedList = useCallback(() => {
    return <MemoizedVirtualizedList data={chatChunks || []} />;
  }, [chatChunks]);

  return (
    <View style={styles.wrapper}>
      <Header friendName={friend?.firstname} />
      <View style={styles.container}>
        {chatChunks && memoizedList()}
        <View style={styles.chatInputContainer}>
          <TextInput
            placeholder={`Message @${friend?.firstname}`}
            placeholderTextColor={'gray'}
            style={styles.msgInput}
            onChangeText={handleChange}
            value={inputMsg}
            ref={inputRef}
          />
          <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={inputMsg.length > 0 ? 0.2 : 1}
            style={[
              styles.sendIconContainer,
              {
                backgroundColor: inputMsg.length > 0 ? 'green' : '#6f6f6f',
              },
            ]}>
            <Image
              source={sendIcon}
              style={[
                styles.sendIcon,
                {tintColor: inputMsg.length > 0 ? 'white' : '#919197'},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SingleChat;
