import {View, Text, TouchableOpacity, ViewComponent} from 'react-native';
import {useState, FC, useRef, useEffect} from 'react';
import styles from '../styles/HomeStyles';
//Components
import MainLayout from '../components/MainLayout';
import LoadingLayout from '../components/LoadingLayout/LoadingLayout';

const Chats: FC = props => {
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
      <MainLayout isDrawerOpen={isDrawerOpen} activeScreen="Chats">
        <View style={styles.container}>
          <TouchableOpacity style={styles.btn} onPress={openDrawer}>
            <Text>open Drawer</Text>
          </TouchableOpacity>
        </View>
      </MainLayout>
  );
};

export default Chats;
