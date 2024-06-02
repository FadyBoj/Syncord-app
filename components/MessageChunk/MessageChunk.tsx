import {View, Text, StyleSheet, Image} from 'react-native';
import {FC, useContext, useId} from 'react';
import FastImage from 'react-native-fast-image';
import {DashboardContext} from '../../context/DashboardContext';

//Components 
import Message from './Message';

interface Chunk {
  userId: string;
  messages: {id: string; text: string}[];
}

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
  chunk: Chunk;
  friendPfp?: string;
  friendId?: string;
  friend?:IFriend
}



const MessageChunk: FC<Props> = ({chunk, friendPfp, friendId,friend}) => {
  const user = useContext(DashboardContext)?.user;

  return (
    <View style={styles.container}>
        <View>
        <View style={styles.pfpContainer}>
        {chunk.userId === user?.id ? (
          user.image ? (
            <Image style={styles.pfp} source={{uri: user.image}} />
          ) : (
            // Place Holder
            <View></View>
          )
        ) : friendPfp ? (
          <Image style={styles.pfp} source={{uri: friendPfp}} />
        ) : (
          <View style={styles.profilePicContainer}>
            <View style={styles.imagePlaceHolder}>
              <Text style={styles.pfpText}>
                {user?.firstname[0].toLocaleUpperCase()}
              </Text>
              <Text style={styles.pfpText}>
                {user?.lastname[0].toLocaleUpperCase()}
              </Text>
            </View>
          </View>
        )}
      </View>
        </View>
        <View style={styles.messagesColumn}>
            {
                chunk.userId === user?.id ?
                <Text style={styles.userNameText}>{user.firstname}</Text>
                :
                <Text style={styles.userNameText}>{friend?.firstname}</Text>

            }
            {
                <View style={styles.messagesContainer}>
                    {chunk.messages.map((item) =>{
                    return <Message
                    key={useId()}
                    message={item.text}
                    />
                })}
                </View>
            }
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'cyan',
    width: 200,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    gap:15
  },
  pfpContainer: {
  },
  pfp: {
    width: 45,
    height: 45,
    objectFit: 'cover',
    borderRadius: 100,
  },
  profilePicContainer: {
    position: 'relative',
    width: 45,
  },
  imagePlaceHolder: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: '#6441A5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 20,
  },
  messagesColumn:{
    paddingTop:6,
    gap:10
  },
  userNameText:{
    fontFamily:'Roboot',
    color:'white',
    fontSize:16,
    fontWeight:'700'
  }
  ,
  messagesContainer:{
    flexDirection:'column',
    gap:3
  }
});

export default MessageChunk;
