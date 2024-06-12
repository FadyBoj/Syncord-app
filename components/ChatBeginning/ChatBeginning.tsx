import {View, Text, StyleSheet, Image} from 'react-native';
import {FC} from 'react';

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
  friend?: IFriend;
}

const ChatBeginning: FC<Props> = ({friend}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profilePicContainer}>
          {friend && friend.image ? (
            <Image source={{uri: friend?.image.replace('http','https')}} style={styles.profilePic} />
          ) : (
            <View style={styles.imagePlaceHolder}>
              <Text style={styles.pfpText}>
                {friend?.firstname[0].toLocaleUpperCase()}
              </Text>
              <Text style={styles.pfpText}>
                {friend?.lastname[0].toLocaleUpperCase()}
              </Text>
            </View>
          )}

        </View>
      </View>
      <View style={styles.textsContainer}>
        <View>
          <Text
            style={
              styles.nameText
            }>{`${friend?.firstname} ${friend?.lastname}`}</Text>
          {/* <Text style={styles.idText}>{friend?.userId}</Text> */}
        </View>
        <View>
          <Text style={styles.description}>
            This is the very beginning of your awesome chat with {friend?.firstname}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    gap:20,
    paddingBottom:20,
    paddingTop:20

  },
  pfp: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  nameText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 40,
    fontWeight: 'bold',
  },
  idText: {
    color: '#777781',
  },
  description: {
    color: 'gray',
    fontFamily: 'Roboto',
    fontSize: 14,
    width: '80%',
    lineHeight:24,
  },
  textsContainer: {
    gap: 6,
  },
  profilePicContainer: {
    position: 'relative',
    width: 100,
  },
  profilePic: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 100,
  },
  imagePlaceHolder:{
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor:'#6441A5',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  pfpText:{
    fontFamily:'Roboto',
    color:'white',
    fontSize:30
  },
});

export default ChatBeginning;
