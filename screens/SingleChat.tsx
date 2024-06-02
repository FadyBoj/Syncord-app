import {View, Text, FlatList} from 'react-native';
import {FC, useContext, useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import styles from '../styles/SingleChatStyles';
import Header from '../components/Header/SingleChatHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//Components
import MessageChunk from '../components/MessageChunk/MessageChunk';

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
  messages: {id: string; text: string}[];
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
          //If the chunk empty
          if (tempChunks.length == 0) {
            const newChunk = {
              userId: message.senderId.toString(),
              messages: [{id: message.id, text: message.text}],
            };
            tempChunks.push(newChunk);
            // Adding message to an existing chunk
          } else {
            const lastIndex = tempChunks.length - 1;
            if (tempChunks[lastIndex].userId === message.senderId) {
              tempChunks[lastIndex] = {
                ...tempChunks[lastIndex],
                messages: [
                  tempChunks[lastIndex].messages.flat(),
                  {id: message.id, text: message.text},
                ].flat(),
              };
              //Adding new chunk beside the previous chunks
            } else {
              const newChunk: Chunk = {
                userId: message.senderId,
                messages: [{id: message.id, text: message.text}],
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

  const renderItem = ({item}: {item: Chunk}) => (
    <MessageChunk
      friendPfp={friend?.image}
      friendId={friend?.userId}
      chunk={item}
      friend={friend}
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
            ItemSeparatorComponent={() => <View style={{height:20}}></View>}
          />
        )}
      </View>
    </>
  );
};

export default SingleChat;
