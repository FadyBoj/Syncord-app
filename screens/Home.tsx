import {View, Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import styles from '../styles/HomeStyles';

//Components
import MainLayout from '../components/MainLayout';

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(true);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 3000);
  };

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
