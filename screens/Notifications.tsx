import {View, Text} from 'react-native';
import {useState, FC, useContext, useEffect} from 'react';
import styles from '../styles/NotificationStyles';

//Components
import Header from '../components/Header/Header';
import {DashboardContext} from '../context/DashboardContext';
import NotificationSkeleton from '../components/Skeletons/NotificationSkeleton';
import NotificationItem from '../components/Notifications/NotificationItem';


const Notifications: FC = props => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(prev => {
      return !prev;
    });
  };

  //Handling real time functions
  const dashboard = useContext(DashboardContext);
  const connection = dashboard?.connection;
  const isDashboardLoading = dashboard?.isLoading;

  useEffect(() => {
    connection?.on('SentRequest', user => {
      console.log(user);
    });
  }, [0]);


  return (
    <>
      <Header title="Notifications" />
      <View style={styles.container}>
        {isDashboardLoading && <NotificationSkeleton />}
        {
          dashboard?.user?.requests.map((item,index:number) =>{
            return <NotificationItem item={item} key={index}/>
          })
        }
      </View>
    </>
  );
};

export default Notifications;
