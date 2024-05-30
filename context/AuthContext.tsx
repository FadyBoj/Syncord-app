import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, FC, useState, useEffect} from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

interface IRequest {
  id: number;
  userId: string;
  email: string;
  outGoing: boolean;
}

interface IFriend {
  id: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  requests: IRequest[];
  friends: IFriend[];
}

interface Props {
  children: JSX.Element;
}

interface IContext {
  getToken: () => Promise<string | null>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}

export const AuthContext = createContext<IContext | null>(null);

const AuthProvider: FC<Props> = ({children}) => {
  //Configure real time connection
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState({
    value: true,
  });
  const [timeThreshold, setTimeThreshold] = useState(false);

  const getToken = async () => {
    const tokenValue = await AsyncStorage.getItem('token');
    if (tokenValue === null) return tokenValue;
    //Validating token
    try {
      await axios.get('https://www.syncord.somee.com/user/requests', {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      return tokenValue;
    } catch (error) {}
    return null;
  };

  //Time threshold
  useEffect(() => {
    setTimeout(() => {
      setTimeThreshold(true);
    }, 2000);
  }, [0]);

  useEffect(() => {
    if (timeThreshold && user !== null) setIsLoading({value: false});
  }, [user, timeThreshold]);

  //Getting user dashboard
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setTimeThreshold(true);
          setTimeout(() => {
            setIsLoading({value: false});
          }, 2000);
          return;
        }

        const response = await axios.get(
          'https://syncord.runasp.net/user/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser(response.data);
        setConnection(
          new signalR.HubConnectionBuilder()
            .withUrl('https://syncord.runasp.net/chat', {
              skipNegotiation: true,
              transport: signalR.HttpTransportType.WebSockets,
            })
            .build(),
        );
      } catch (error) {
        console.log(error);
        setIsLoading({value: false});
      }
    };
    getDashboard();
  }, [0]);

  connection?.start()
  .then(() =>{
    console.log("Connected")
  })

 
  return (
    <View style={styles.appContainer}>
      <AuthContext.Provider value={{getToken, user, setUser}}>
        {children}
      </AuthContext.Provider>
      {isLoading.value && (
        <View style={styles.container}>
          <ActivityIndicator size={40} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#111216',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  appContainer: {
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'cyan',
  },
});

export default AuthProvider;
