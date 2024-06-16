import {View, Text, StyleSheet} from 'react-native';
import {FC,memo} from 'react';

//Components
import ImagePlaceHolder from '../ImagePlaceHolder/ImagePlaceHolder';
import ChoiceButton from '../ChoiceButton/ChoiceButton';

//Utils
import getRelativeTime from '../../utils/getRelativeTime';

//Assets
import tickIcon from '../../assets/tick.png';
import closeIcon from '../../assets/close.png';

interface IFriendRequest {
  id: number;
  userId: string;
  email: string;
  outGoing: boolean;
  firstname: string;
  lastname: string;
  image: string;
  createdAt: string;
}

interface Props {
  item: IFriendRequest;
}


const NotificationItem: FC<Props> = ({item}) => {
  console.log("Rerendred")

  return (
    <View style={styles.container}>
      {!item.outGoing ? (
        <>
          <View style={styles.col1}>
            <ImagePlaceHolder
              size={50}
              fontSize={14}
              firstname={item.firstname}
              lastname={item.lastname}
              image={item.image}
            />
            <View style={styles.content}>
              <View style={styles.nameContainer}>
                <Text  style={styles.name}>
                  {item.firstname}  Sent you a friend request
                </Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
              <View style={styles.choiceContainer}>
                <ChoiceButton
                  icon={tickIcon}
                  width={30}
                  height={30}
                  radius={100}
                  bgColor="#2d2e33"
                  action={() => {
                  }}
                  iconSize={15}
                />
                <ChoiceButton
                  icon={closeIcon}
                  width={30}
                  height={30}
                  radius={100}
                  bgColor="#2d2e33"
                  action={() => {
                  }}
                  iconSize={11}
                />
              </View>
            </View>
          </View>
          <View></View>
        </>
      ) : (
        <View><Text>Hiiiii</Text></View>
      )}
      <View style={styles.time}>
        <Text style={styles.timeText}>{getRelativeTime(item.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(118, 118, 118, 0.129)',
    position: 'relative',
    width:'100%',
  },
  col1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width:'100%',
    paddingBottom:10

  },
  nameContainer: {
    flexDirection: 'column',
    gap: 5,
    maxWidth:200
  },
  name: {
    color: '#babfc0',
    fontSize: 13,
    fontFamily: 'Roboto',
  },
  email: {
    color: '#818491',
    fontSize: 13,
  },

  time: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
  timeText: {
    color: '#818491',
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow:1,
    flexShrink:1

  },
  choiceContainer: {
    flexDirection: 'column',
    gap: 15,
  },
});

export default memo(NotificationItem);
