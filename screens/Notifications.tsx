import {View, Text, VirtualizedList} from 'react-native';
import {useState, FC, useContext, useEffect} from 'react';
import styles from '../styles/NotificationStyles';
import Toast from 'react-native-toast-message';
import globals from '../globals';

//Components
import Header from '../components/Header/Header';
import {DashboardContext} from '../context/DashboardContext';
import NotificationSkeleton from '../components/Skeletons/NotificationSkeleton';
import NotificationItem from '../components/Notifications/NotificationItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface userPayload {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  isOnline: boolean;
  friendShipId: string;
}

const Notifications: FC = props => {
  //States
  const [isLoading, setIsLoading] = useState(false);

  // Handling real-time functions
  const dashboard = useContext(DashboardContext);
  const isDashboardLoading = dashboard?.isLoading;
  const setDashboard = dashboard?.setUser;

  // Function to get item by index
  const getItem = (data: IFriendRequest[], index: number): IFriendRequest => {
    return data[index];
  };

  // Function to get total item count
  const getItemCount = (data: IFriendRequest[]): number => {
    return data.length;
  };

  const acceptRequest = async (id: string) => {
    try {
      setIsLoading(true);
      if (!setDashboard) return;
      //Start
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const response: {data: userPayload} = await axios.post(
        `${globals.baseUrl}/friendship/accept-request`,
        {
          requestId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDashboard(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          requests: prevData.requests
            .map(req => {
              return req.id.toString() !== id ? req : null;
            })
            .filter(r => r !== null),
          friends: [
            ...prevData.friends,
            {
              friendShipId: response.data.friendShipId,
              userId: response.data.id,
              email: response.data.email,
              firstname: response.data.firstname,
              lastname: response.data.lastname,
              isOnline: response.data.isOnline,
              image: response.data.image,
            },
          ],
        };
      });
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Request accepted 🎉',
        topOffset: 20,
      });
    } catch (error: any) {
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        text1: "Couldn't accept the request, please try again later",
        topOffset: 20,
      });
    }
  };

  const rejectRequest = async(id:string) => {
    try {
      setIsLoading(true);
      if (!setDashboard) return;
      //Start
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const response: {data: userPayload} = await axios.post(
        `${globals.baseUrl}/friendship/reject-request`,
        {
          requestId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDashboard(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          requests: prevData.requests
            .map(req => {
              return req.id.toString() !== id ? req : null;
            })
            .filter(r => r !== null),
        };
      });
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Request rejected',
        topOffset: 20,
      });
    } catch (error: any) {
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        text1: "Couldn't reject the request, please try again later",
        topOffset: 20,
      });
    }{}
  };

  console.log(dashboard?.user?.requests,dashboard?.user?.email)

  return (
    <>
      <Header title="Notifications" />
      <View style={styles.container}>
        {isDashboardLoading && <NotificationSkeleton />}
        {dashboard?.user?.requests && dashboard.user.requests.length > 0 && (
          <VirtualizedList
            contentContainerStyle={{}}
            data={dashboard.user?.requests}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={11}
            updateCellsBatchingPeriod={100}
            removeClippedSubviews
            renderItem={({item}) => (
              <NotificationItem
                item={item}
                acceptRequest={acceptRequest}
                rejectRequest={rejectRequest}
                disabled={isLoading}
              />
            )}
            keyExtractor={item => item?.id?.toString()}
            getItem={getItem}
            getItemCount={getItemCount}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
          />
        )}
      </View>
    </>
  );
};

export default Notifications;
