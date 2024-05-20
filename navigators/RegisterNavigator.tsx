import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
//pages
import RegisterFirstTab from '../screens/AuthScreens/Register/RegisterFirstTab';
import RegisterSecondTab from '../screens/AuthScreens/Register/RegisterSecondTab';
import RegisgerThirdTab from '../screens/AuthScreens/Register/RegisgerThirdTab';

//Components
import Modal from '../components/Modal/Modal';
import NavHeader from '../components/NavHeader/NavHeader';
import ShrinkButton from '../components/Buttons/ShrinkButton';

//Assets

const RegisterNavigator = ({navigation}: {navigation: any}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      {/* Custom header  */}
      <NavHeader backAction={goBack} title="Create account" />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: false,
          swipeEnabled: false,
        }}
        backBehavior="history"
        tabBar={() => null}>
        <Tab.Screen
          name="RegisterFirstTab"
        >
          {(props) => <RegisterFirstTab {...props} openModal={openModal} />}
          </Tab.Screen>
        <Tab.Screen name="RegisterSecondTab" component={RegisterSecondTab} />
        <Tab.Screen name="RegisterThirdTab" component={RegisgerThirdTab} />
      </Tab.Navigator>
      {/* Global modal */}
      {modalVisible && (
        <Modal closeModal={closeModal}>
          <View style={styles.container}>
            <View style={styles.sec1}>
              <Text style={styles.mainText}>
                This email is already connected to an account
              </Text>
              <Text style={styles.secText}>Do you wanna login instead ? </Text>
            </View>
            <View style={styles.sec2}>
              <ShrinkButton
                action={() => {}}
                label="Login"
                bgColor="#5865f2"
                width={100}
              />
              <ShrinkButton
                action={closeModal}
                label="Close"
                bgColor="#373a43"
                width={100}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    gap: 40,
  },
  mainText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  sec1: {
    alignItems: 'center',
    gap: 18,
  },
  sec2: {
    alignItems: 'center',
    gap: 18,
  },
  secText: {
    color: 'white',
  },
});

export default RegisterNavigator;
