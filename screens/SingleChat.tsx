import {
  View,
  Text,
  VirtualizedList,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
} from 'react';
import {RouteProp} from '@react-navigation/native';
import styles from '../styles/SingleChatStyles';
import Header from '../components/Header/SingleChatHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {DashboardContext} from '../context/DashboardContext';
import moment from 'moment-timezone';

//Components
import MessagesList from '../components/MessagesList/MessagesList';
import ChatSkeleton from '../components/Skeletons/ChatSkeleton';

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
  messages: {id: string; text: string; createdAt: string}[];
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
  const [isFetchingPreviousMsgs, setIsFetchingPreviousMsgs] = useState(false);
  const [isRecordsEnded, setIsRecordsEnded] = useState(false);
  const [skip, setSkip] = useState(50);

  // Fetch messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response: {data: Message[]} = await axios.get(
          `https://syncord.runasp.net/chat/${friend?.friendShipId}?skip=0&take=50`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const messages = response.data;
        setMessages(messages);
        const checkEnd: {data: Message[]} = await axios.get(
          `https://syncord.runasp.net/chat/${friend?.friendShipId}?skip=50&take=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (checkEnd.data.length === 0) setIsRecordsEnded(true);
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
    if (!user || inputMsg.length === 0 || !chatChunks) return;
    try {
      const newChunk: Chunk = {
        id: Math.random().toString(),
        userId: user.id.toString(),
        messages: [
          {
            id: Math.random().toString(),
            text: inputMsg,
            createdAt: new Date().toString(),
          },
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
      const response = await axios.post(
        'https://syncord.runasp.net/chat',
        {
          friendShipId: friend?.friendShipId,
          message: tempMsg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newMessage: Message = {
        id: response.data.id,
        text: tempMsg,
        isSent: true,
        senderId: user.id,
        createdAt: response.data.createdAt,
      };
      setMessages(prevData => {
        if (!prevData) return prevData;
        return [prevData, newMessage].flat();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReachEnd = async () => {
    if (isRecordsEnded) return;
    setIsFetchingPreviousMsgs(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response: {data: Message[]} = await axios.get(
        `https://syncord.runasp.net/chat/${friend?.friendShipId}?skip=${skip}&take=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSkip(skip + 50);
      const newMessages: Message[] = response.data;

      setMessages(prevMessages => {
        if (!prevMessages) return prevMessages;

        const messageIds = prevMessages.map(msg => msg.id);
        const filteredNewMessages = newMessages.filter(
          msg => !messageIds.includes(msg.id),
        );
        return [...filteredNewMessages, ...prevMessages];
      });
      setIsFetchingPreviousMsgs(false);
      const checkEnd: {data: Message[]} = await axios.get(
        `https://syncord.runasp.net/chat/${friend?.friendShipId}?skip=${
          skip + 50
        }&take=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (checkEnd.data.length === 0) setIsRecordsEnded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header friendName={friend?.firstname} />

      <View style={styles.container}>
        <View style={styles.content}>
          {chatChunks && friend && (
            <MessagesList
              friend={friend}
              chatChunks={chatChunks}
              handleReachEnd={handleReachEnd}
              isFetchingPreviousMsgs={isFetchingPreviousMsgs}
              isRecordsEnded={isRecordsEnded}
            />
          )}
         {!chatChunks && <ChatSkeleton />}
        </View>
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
    </>
  );
};

export default SingleChat;
