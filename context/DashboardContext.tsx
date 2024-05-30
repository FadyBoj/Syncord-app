import {View, Text} from 'react-native';
import {Children, FC, createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SignalR from '@microsoft/signalr';

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
  isOnline: boolean;
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
  user: IUser | null;
  isFetchingDashboard: boolean;
  getDashboard: () => Promise<any>
  connection:SignalR.HubConnection | null
}

export const DashboardContext = createContext<IContext | null>(null);

const DashboardContextProvider: FC<Props> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isFetchingDashboard, setIsFetchingDashboard] = useState(true);
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(
    null,
  );
  //Fetching dashboard
  useEffect(() => {
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
      setUser(response.data);
      setIsFetchingDashboard(false);
      //Establishing stream
      const secConnection = new SignalR.HubConnectionBuilder()
        .withUrl('https://syncord.runasp.net/chat', {
          skipNegotiation: true,
          transport: SignalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => token,
        })
        .build();
      secConnection.start().then(() => {
        console.log('Connection started');
      });
      setConnection(secConnection);
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
    return response.data
  };


  return (
    <DashboardContext.Provider value={{user, isFetchingDashboard,getDashboard,connection}}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
