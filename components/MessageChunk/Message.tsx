import {View, Text, StyleSheet} from 'react-native';
import {FC} from 'react';

interface Props {
  message: {
    id: string;
    text: string;
    createdAt: string;
  };
  isLoading?: boolean;
}

const Message: FC<Props> = ({message, isLoading = false}) => {
  return (
    <View style={styles.container}>
      <Text
      lineBreakMode='tail'
        style={[
          styles.messageText,
          {
            color: isLoading ? 'gray' : 'white',
            opacity:isLoading ? 0.7 : 1
          },
        ]}>
        {message.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageText: {
    fontFamily: 'Roboto',
  },
  container:{
    width:'90%',
    paddingRight:10
  }
});

export default Message;
