import {View, Text, StyleSheet, Image} from 'react-native';
import {FC, memo} from 'react';
import FastImage from 'react-native-fast-image';
//Assets
import chatIcon from '../../assets/friendChat.png';

//Components
import StatusBadge from '../StatusBadge/StatusBadge';

interface IFriend {
  id: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
  image: string;
}

interface Props {
  friend: IFriend;
  length: number;
  index: number;
  status: string;
}

const Friend: FC<Props> = ({friend, length, index, status}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.sec1}>
        <View style={styles.profilePicContainer}>
          {friend && friend.image ? (
            <Image
              source={{
                uri: friend?.image.replace('http', 'https'),
              }}
              style={styles.profilePic}
            />
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
          <StatusBadge
            status="online"
            right={13}
            bgColor="#23232a"
            size={11}
            ballBgColor={
              status.toLocaleLowerCase() === 'online' ? 'green' : 'gray'
            }
          />
        </View>
        <View>
          <Text
            style={
              styles.friendName
            }>{`${friend.firstname} ${friend.lastname}`}</Text>
        </View>
      </View>
      {/* Section 2  */}
      <View>
        <Image source={chatIcon} style={styles.chatIcon} />
      </View>
      {index !== length - 1 && <View style={styles.space}></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    paddingLeft: 30,
    paddingRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2f2f39',
    position: 'relative',
    justifyContent: 'center',
  },
  profilePicContainer: {
    position: 'relative',
    width: 60,
  },
  profilePic: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 100,
  },
  imagePlaceHolder: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#6441A5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 15,
  },
  sec1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    width: '100%',
  },
  friendName: {
    fontFamily: 'Roboto',
    color: '#e4e5e9',
    fontSize: 14,
  },
  space: {
    position: 'absolute',
    backgroundColor: '#2f2f39',
    bottom: 0,
    width: '100%',
    height: 1,
    transformOrigin: 'center',
    transform: [{scaleX: 0.5}],
  },
  chatIcon: {
    width: 22,
    height: 22,
    objectFit: 'contain',
  },
});

export default memo(Friend);
