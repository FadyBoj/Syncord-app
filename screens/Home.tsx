import {View, Text, TouchableOpacity} from 'react-native';
import {useState,FC} from 'react';
import styles from '../styles/HomeStyles';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
//Components
import MainLayout from '../components/MainLayout';

interface Porps{
  gestureStyles :object
}

const Home:FC<Porps> = ({gestureStyles}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(true);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    // setTimeout(() => {
    //   setIsDrawerOpen(false);
    // }, 3000);
  };

 console.log(gestureStyles)

  return (
    <MainLayout closeDrawer={closeDrawer} isDrawerOpen={isDrawerOpen}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={openDrawer}>
          <Text>open Drawer</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default Home;
