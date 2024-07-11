import {FC, createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SignalR from '@microsoft/signalr';
import globals from '../globals';

//Services
import onHopOnline from '../Services/RealTimeUtils/onHopOnline';
import onGoOffline from '../Services/RealTimeUtils/onGoOffline';
import onAcceptRequest from '../Services/RealTimeUtils/onAcceptRequest';
import onRecieveRequest from '../Services/RealTimeUtils/onRecieveRequest';
import onRequestRejected from '../Services/RealTimeUtils/onRequestRejected';
import onFriendRemoved from '../Services/RealTimeUtils/onFriendRemoved';
import onFriendUpdatedPfp from '../Services/RealTimeUtils/onFriendUpdatedPfp';

export interface Message {
  id: string;
  isSent: boolean;
  text: string;
  createdAt: Date;
  senderId: string;
}

export interface IRequest {
  id: number;
  userId: string;
  email: string;
  outGoing: boolean;
  firstname: string;
  lastname: string;
  image: string;
  createdAt: string;
}
export interface IFriend {
  friendShipId: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
  image: string;
  createdAt: Date;
}

export interface Friendship {
  friendShipId: string;
  userId: string;
  latesMessageDate: string;
  messages: Message[];
}

export interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  createdAt: Date;
  requests: IRequest[];
  friends: IFriend[];
  messages: Friendship[];
}

interface Props {
  children: JSX.Element;
}

export interface IContext {
  user: IUser | null;
  isFetchingDashboard: boolean;
  getDashboard: () => Promise<any>;
  connection: SignalR.HubConnection | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  startConnection: () => Promise<void>;
  getMainDashboard: () => Promise<void>;
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
  const getMainDashboard = async () => {
    try {
      await startConnection();

      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      console.log('Starting dashboard');
      const response = await axios.get(`${globals.baseUrl}/user/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messages: {data: Friendship[]} = await axios.get(
        `${globals.baseUrl}/chat/all-messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser({...response.data, messages: messages.data});
      setIsFetchingDashboard(false);
      setIsLoading(false);
      console.log('Finished');
    } catch (error: any) {
      console.log(error, 'Dashboard');
      console.log('Not Authenticated');
    }
  };

  const getDashboard = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const response = await axios.get(`${globals.baseUrl}/user/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const startConnection = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    //Establishing stream
    const secConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`${globals.baseUrl}/chat`, {
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    await secConnection.start().then(() => {
      console.log('Connection started');
    });
    secConnection.onreconnected(() => {
      console.log('Reconnected');
    });
    setConnection(secConnection);
  };

  //Handle real time functions

  useEffect(() => {
    connection?.on('hoppedOnline', userId => onHopOnline(setUser, userId));
    connection?.on('wentOffline', userId => onGoOffline(setUser, userId));
    connection?.on('RequestAccepted', user => onAcceptRequest(setUser, user));
    connection?.on('SentRequest', request =>
      onRecieveRequest(setUser, request),
    );
    connection?.on('RequestRejected', requestId =>
      onRequestRejected(setUser, requestId),
    );
    connection?.on('friendshipDeleted', friendshipId =>
      onFriendRemoved(setUser, friendshipId),
    );
    connection?.on("FriendImageUpdated",(data) => onFriendUpdatedPfp(setUser,data))
  }, [connection]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        isFetchingDashboard,
        getDashboard,
        connection,
        isLoading,
        setUser,
        setIsLoading,
        startConnection,
        getMainDashboard,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
