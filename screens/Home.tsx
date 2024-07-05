import {View, Text, TouchableOpacity} from 'react-native';
import {useState, FC, useRef, useEffect} from 'react';
import styles from '../styles/HomeStyles';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
//Components
import MainLayout from '../components/MainLayout';
import LoadingLayout from '../components/LoadingLayout/LoadingLayout';
import SoundPlayer from 'react-native-sound-player'


const Home: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(prev => {
      return !prev;
    });
  };

 

  return (
    <LoadingLayout onFailNav="AuthStack">
        <View style={styles.container}>
        
        </View>
    </LoadingLayout>
  );
};

export default Home;
