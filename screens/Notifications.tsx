import {View, Text, VirtualizedList} from 'react-native';
import {useState, FC, useContext, useEffect} from 'react';
import styles from '../styles/NotificationStyles';
import Toast from 'react-native-toast-message';

//Components
import Header from '../components/Header/Header';
import {DashboardContext} from '../context/DashboardContext';
import NotificationSkeleton from '../components/Skeletons/NotificationSkeleton';
import NotificationItem from '../components/Notifications/NotificationItem';

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

const Notifications: FC = props => {
  //States
  const [isLoading, setIsLoading] = useState(false);

  // Handling real-time functions
  const dashboard = useContext(DashboardContext);
  const connection = dashboard?.connection;
  const isDashboardLoading = dashboard?.isLoading;
  const setDashboard = dashboard?.setUser;

  useEffect(() => {
    connection?.on('SentRequest', user => {
      console.log(user);
    });
  }, [0]);

  // Function to get item by index
  const getItem = (data: IFriendRequest[], index: number): IFriendRequest => {
    return data[index];
  };

  // Function to get total item count
  const getItemCount = (data: IFriendRequest[]): number => {
    return data.length;
  };

  const acceptRequest = (id: string) => {
    try {
      setIsLoading(true);
      if (!setDashboard) return;
      //Start
      setDashboard((prevData) =>{
        if(!prevData) return null;
        return {...prevData,requests:prevData.requests.map((req) =>{
          return req.id.toString() !== id ? req : null;
        }).filter(r => r !== null)}
      })
      setIsLoading(false)
      Toast.show({
        type: 'success',
        text1: 'Request accepted 🎉',
        topOffset: 20,
      });

    } catch (error:any) {
      console.log(error.response.data);
      Toast.show({
        type: 'error',
        text1: 'Couldn\'t accept the request, please try again later',
        topOffset: 20,
      });
    }
  };

  const rejectRequest = () => {
    console.log('Rejecting from parent');
  };

  return (
    <>
      <Header title="Notifications" />
      <View style={styles.container}>
        {isDashboardLoading && <NotificationSkeleton />}
        {dashboard && (
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
            keyExtractor={item => item.id.toString()}
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
