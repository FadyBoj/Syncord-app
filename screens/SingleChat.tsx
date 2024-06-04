import {View, Text, FlatList} from 'react-native';
import {FC, useContext, useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import styles from '../styles/SingleChatStyles';
import Header from '../components/Header/SingleChatHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//Components
import MessageChunk from '../components/MessageChunk/MessageChunk';

//Utils
import convertDate from '../utils/convertDate';
import getMonth from '../utils/getMonth';

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
}

const SingleChat: FC<Props> = ({route}) => {
  const friend = route?.params.friend;

  const [chatChunks, setChatChunks] = useState<Chunk[] | null>(null);

  //Fetch messgaes
  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response: {data: Message[]} = await axios.get(
          `https://syncord.runasp.net/chat/${friend?.friendShipId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const messages = response.data;
        let tempChunks: Chunk[] = [];
        messages.map(message => {
          const lastMessage =
            tempChunks.length > 0 &&
            tempChunks[tempChunks.length - 1].messages[
              tempChunks[tempChunks.length - 1].messages.length - 1
            ];
          //If the chunk empty
          if (tempChunks.length == 0) {
            const newChunk: Chunk = {
              userId: message.senderId.toString(),
              messages: [
                {
                  id: message.id,
                  text: message.text,
                  createdAt: message.createdAt.toString(),
                },
              ],
              timestampSpace: false,
            };
            tempChunks.push(newChunk);
          } else if (
            lastMessage &&
            !(
              getMonth(message.createdAt.toString()).month ===
                getMonth(lastMessage.createdAt.toString()).month &&
              getMonth(message.createdAt.toString()).year ===
                getMonth(lastMessage.createdAt.toString()).year &&
              getMonth(message.createdAt.toString()).day ===
                getMonth(lastMessage.createdAt.toString()).day
            )
          ) {
            const newChunk: Chunk = {
              userId: message.senderId,
              messages: [
                {
                  id: message.id,
                  text: message.text,
                  createdAt: message.createdAt.toString(),
                },
              ],
              timestampSpace: message.createdAt.toString(),
            };
            tempChunks.push(newChunk);
          } else {
            // Adding message to an existing chunk
            const lastIndex = tempChunks.length - 1;
            if (tempChunks[lastIndex].userId === message.senderId) {
              tempChunks[lastIndex] = {
                ...tempChunks[lastIndex],
                messages: [
                  tempChunks[lastIndex].messages.flat(),
                  {
                    id: message.id,
                    text: message.text,
                    createdAt: message.createdAt.toString(),
                  },
                ].flat(),
              };
              //Adding new chunk beside the previous chunks
            } else {
              const newChunk: Chunk = {
                userId: message.senderId,
                messages: [
                  {
                    id: message.id,
                    text: message.text,
                    createdAt: message.createdAt.toString(),
                  },
                ],
                timestampSpace: false,
              };
              tempChunks.push(newChunk);
            }
          }
        });
        setChatChunks(tempChunks);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [0]);

  const renderItem = ({item,index}: {item: Chunk,index:number}) => (
    <MessageChunk
      friendPfp={friend?.image}
      friendId={friend?.userId}
      chunk={item}
      friend={friend}
      index={index}
    />
  );

  return (
    <>
      <Header friendName={friend?.firstname} />
      <View style={styles.container}>
        {chatChunks && (
          <FlatList
            data={chatChunks}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
            contentContainerStyle={styles.messagesList}
          />
        )}
      </View>
    </>
  );
};

export default SingleChat;
