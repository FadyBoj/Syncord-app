import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/MainStyles';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//Components
import ShrinkButton from '../components/Buttons/ShrinkButton';
import AuthLayout from '../components/LoadingLayout/AuthLayout';

//Assets
import hero from '../assets/RegisterHero.png';
import logo from '../assets/Logo2.png';

const Main = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const navigateToRegister = () => {
    navigation.navigate('Register', {screen: 'RegisterFirstTab'});
  };

  const navigateToRLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <AuthLayout onFailNav="AppStack" screen="Home">
      <View style={styles.container}>
        <View style={styles.sec1}>
          <Image style={styles.logo} source={logo} />
          <Image style={styles.hero} source={hero} />
        </View>
        <View style={styles.sec2}>
          <Text style={styles.mainText}>Welcome to Syncord</Text>
          <Text style={styles.secText}>
            Join our community for smooth and engaging real-time communication.
            Let's get chatting!
          </Text>
        </View>
        <View style={styles.authBtnsContainer}>
          <ShrinkButton
            bgColor="#5865f2"
            label="Register"
            action={navigateToRegister}
          />
          <ShrinkButton
            bgColor="#373a43"
            label="Login"
            action={navigateToRLogin}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default Main;
