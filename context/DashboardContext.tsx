import {View, Text} from 'react-native';
import {Children, FC, createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SignalR from '@microsoft/signalr';

interface Message {
  id: string;
  isSent: boolean;
  text: string;
  createdAt: Date;
  senderId: string;
}

interface IRequest {
  id: number;
  userId: string;
  email: string;
  outGoing: boolean;
  firstname: string;
  lastname: string;
  image: string;
  createdAt: string;
}
interface IFriend {
  id: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
}

interface Friendship {
  friendShipId: string;
  userId: string;
  latesMessageDate: string;
  messages: Message[];
}

interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  requests: IRequest[];
  friends: IFriend[];
  messages: Friendship[];
}

interface Props {
  children: JSX.Element;
}

interface IContext {
  user: IUser | null;
  isFetchingDashboard: boolean;
  getDashboard: () => Promise<any>;
  connection: SignalR.HubConnection | null;
  isLoading: boolean;
}

export const DashboardContext = createContext<IContext | null>(null);

const DashboardContextProvider: FC<Props> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isFetchingDashboard, setIsFetchingDashboard] = useState(true);
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  //Fetching dashboard
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(
          'https://syncord.runasp.net/user/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const messages: {data: Friendship[]} = await axios.get(
          'https://syncord.runasp.net/chat/all-messages',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser({...response.data, messages: messages.data});
        setIsFetchingDashboard(false);
        //Establishing stream
        const secConnection = new SignalR.HubConnectionBuilder()
          .withUrl('https://syncord.runasp.net/chat', {
            skipNegotiation: true,
            transport: SignalR.HttpTransportType.WebSockets,
            accessTokenFactory: () => token,
          })
          .withAutomaticReconnect()
          .build();
        secConnection.start().then(() => {
          console.log('Connection started');
        });
        secConnection.onreconnected(() => {
          console.log('Reconnected');
        });
        setConnection(secConnection);
        setIsLoading(false);
      } catch (error) {}
    };
    getDashboard();
  }, [0]);
  const getDashboard = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const response = await axios.get(
      'https://syncord.runasp.net/user/dashboard',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  return (
    <DashboardContext.Provider
      value={{user, isFetchingDashboard, getDashboard, connection, isLoading}}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
