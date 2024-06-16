import { View, Text, VirtualizedList } from 'react-native';
import { useState, FC, useContext, useEffect } from 'react';
import styles from '../styles/NotificationStyles';

//Components
import Header from '../components/Header/Header';
import { DashboardContext } from '../context/DashboardContext';
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

const Notifications: FC = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Handling real-time functions
  const dashboard = useContext(DashboardContext);
  const connection = dashboard?.connection;
  const isDashboardLoading = dashboard?.isLoading;

  useEffect(() => {
    connection?.on('SentRequest', (user) => {
      console.log(user);
    });
  }, [0]);

  const newItems: IFriendRequest[] = [];
  for (let i = 0; i < 20; i++) {
    const item = dashboard?.user?.requests[0];
    if (!item) return;
    newItems.push({ ...item, id: item.id + i });
  }

  // Function to get item by index
  const getItem = (data: IFriendRequest[], index: number): IFriendRequest => {
    return data[index];
  };

  // Function to get total item count
  const getItemCount = (data: IFriendRequest[]): number => {
    return data.length;
  };

  return (
    <>
      <Header title="Notifications" />
      <View style={styles.container}>
        {isDashboardLoading && <NotificationSkeleton />}
        {dashboard && (
          <VirtualizedList
            contentContainerStyle={{}}
            data={newItems}
            initialNumToRender={5}
     
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            getItem={getItem}
            getItemCount={getItemCount}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          />
        )}
      </View>
    </>
  );
};

export default Notifications;
