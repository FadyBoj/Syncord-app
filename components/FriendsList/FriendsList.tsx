import {View, Text, StyleSheet, VirtualizedList} from 'react-native';
import {FC, useEffect, useId, memo, useState} from 'react';

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

  const getItem = (data: IFriend[], index: number): IFriend => data[index]

  const getItemCount = (data:IFriend[]) => data.length

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{`${status}- ${friends.length}`}</Text>
      <View style={[styles.secondContent,]}>
        {/* {newFriends.map((item, index) => {
          return (
            <Friend
              friend={item}
              key={useId()}
              length={newFriends.length}
              index={index}
            />
          );
        })} */}
        <VirtualizedList
         removeClippedSubviews={true}
         onEndReached={() => {console.log("Ended")}}
         onEndReachedThreshold={20}
         updateCellsBatchingPeriod={2000}
         windowSize={21}
          data={friends}
          renderItem={({item,index}) => (
            <Friend
            friend={item}
              length={friends.length}
              index={index}
            />
          )}
          keyExtractor={item => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: '100%',
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

export default memo(FriendsList);
