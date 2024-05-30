import {View, Text, StyleSheet} from 'react-native';
import {FC, useEffect, useId} from 'react';

//Components
import Friend from './Friend';

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
  status: string;
  friends: IFriend[];
}

const FriendsList: FC<Props> = ({status, friends}) => {
  const newFriends = [friends[0], friends[0]];
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{`${status}- ${friends.length}`}</Text>
      <View style={styles.secondContent}>
        {newFriends.map((item, index) => {
          return (
            <Friend
              friend={item}
              key={useId()}
              length={newFriends.length}
              index={index}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width:'100%'
  },
  secondContent: {
    width: '100%',
    backgroundColor: '#23232a',
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Roboto',
    color: 'gray',
    fontSize: 11,
    transform: [{translateX: 10}],
  },
});

export default FriendsList;
