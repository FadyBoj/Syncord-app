import { View, Text,StyleSheet } from 'react-native'
import {FC} from 'react'

interface Props {
    message:string
}

const Message:FC<Props> = ({message}) => {
  return (
    <View>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    messageText:{
        color:'#c6c7cc',
        fontFamily:'Roboto'
    }
})

export default Message