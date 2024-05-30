import {View, Text, TouchableOpacity, ViewComponent} from 'react-native';
import {useState, FC, useRef, useEffect} from 'react';
import styles from '../styles/FriendsStyles';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
//Components
import MainLayout from '../components/MainLayout';

const Friends: FC = props => {
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
    <MainLayout isDrawerOpen={isDrawerOpen} activeScreen="Friends">
      <View style={styles.container}>
        {/* Title */}
      </View>
    </MainLayout>
  );
};

export default Friends;
