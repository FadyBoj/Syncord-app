import {View, Text, TouchableOpacity, ViewComponent} from 'react-native';
import {useState  ,FC, useRef, useEffect} from 'react';
import styles from '../styles/HomeStyles';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
//Components
import MainLayout from '../components/MainLayout';



const Notifications:FC = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen((prev) =>{
      return !prev
    })
  };

  
  return (
      <View  style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={openDrawer}>
          <Text>Notifications</Text>
        </TouchableOpacity>
      </View>
  );
};

export default Notifications;
