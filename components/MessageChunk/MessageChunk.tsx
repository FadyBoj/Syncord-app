import {View, Text, StyleSheet, Image,} from 'react-native';
import {FC, useContext, memo} from 'react';
import FastImage from 'react-native-fast-image';
import {DashboardContext} from '../../context/DashboardContext';

//Components
import Message from './Message';

//Utils
import convertDate from '../../utils/convertDate';
import getMonthYear from '../../utils/getMonthYear';
import getMonth from '../../utils/getMonth';

interface Chunk {
  userId: string;
  messages: {id: string; text: string; createdAt: string}[];
  timestampSpace: string | boolean;
  id:string
  isLoading?:boolean
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
  friend?: IFriend;
  index: number;
  length:number
}

const MessageChunk: FC<Props> = ({
  chunk,
  friendPfp,
  friendId,
  friend,
  index,
  length,
  
}) => {
  const user = useContext(DashboardContext)?.user;

  return (
    <View style={styles.wrapper}>
      {(chunk.timestampSpace || index === length - 1) && (
        <View style={styles.timestampSpace}>
          <View style={styles.timestampLine}></View>
          <View style={styles.timeStampTextContainer}>
            <Text style={styles.timeStampText}>
              {getMonthYear(chunk.messages[0].createdAt)}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.pfpContainer}>
            {chunk.userId === user?.id ? (
              user.image ? (
                <Image style={styles.pfp} source={{uri: user.image}} />
              ) : (
                // Place Holder
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
          {chunk.userId === user?.id ? (
            <View style={styles.nameDateContainer}>
              <Text style={styles.chunkDate}>
                {convertDate(chunk.messages[0].createdAt)}
              </Text>
              <Text style={styles.userNameText}>{user.firstname}</Text>
            </View>
          ) : (
            <View style={styles.nameDateContainer}>
              <Text style={styles.chunkDate}>
                {convertDate(chunk.messages[0].createdAt)}
              </Text>
              <Text style={styles.userNameText}>{friend?.firstname}</Text>
            </View>
          )}
          {
            <View style={styles.messagesContainer}>
              {chunk.messages.map(item => {
                return <Message isLoading={chunk.isLoading} key={item.id} message={item} />;
              })}
            </View>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
    paddingTop: 10,
  },
  timestampSpace: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
    justifyContent: 'center',
  },
  timestampLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    position: 'relative',
    zIndex: 9,
  },
  timeStampTextContainer: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#111216',
    paddingLeft: 10,
    paddingRight: 10,
  },
  timeStampText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color:'white'
  },
  mainContainer: {
    borderColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15,
    paddingLeft: 20,
  },
  pfpContainer: {},
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
  messagesColumn: {
    paddingTop: 6,
    gap: 10,
  },
  userNameText: {
    fontFamily: 'Roboot',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  messagesContainer: {
    flexDirection: 'column',
    gap: 3,
  },
  nameDateContainer: {
    flexDirection:'row-reverse',
    justifyContent:'flex-end',
    alignItems:'center',
    gap:10
  },
  chunkDate:{
    fontSize:12,
    color:'grey',
  },
});

export default memo(MessageChunk);
