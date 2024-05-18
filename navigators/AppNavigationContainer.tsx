import React,{FC} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

interface Props
{
  children : JSX.Element;
}

const Stack = createNativeStackNavigator();


const AppNavigationContainer:FC<Props> = ({children}) => {
  return (
    <Stack.Navigator>
      {children}
    </Stack.Navigator>
  )
}

export default AppNavigationContainer